# This is the agentic RAG logic

from langgraph.graph import START, END, StateGraph, MessagesState
from langgraph.prebuilt import ToolNode
from langchain_core.messages import HumanMessage, AIMessage
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from source.prompts import NELFUND_SYSTEM_PROMPT
from source.retriever import create_vectorstore
from source.ingest import load_documents, split_documents

# 1️⃣ Load & split docs
pages = load_documents()
chunks = split_documents(pages)

# 2️⃣ Setup vectorstore
vectorstore = create_vectorstore(chunks)

# 3️⃣ LLM + tools
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

@tool
def retrieve_nelfund_docs(query: str) -> str:
    retriever = vectorstore.as_retriever(search_type="mmr", search_kwargs={"k":3})
    results = retriever.invoke(query)
    if not results:
        return "No relevant NELFUND documents found."
    return "\n\n".join(f"{doc.page_content}" for doc in results)

tools = [retrieve_nelfund_docs]
llm_with_tools = llm.bind_tools(tools)

# 4️⃣ Agent nodes
def assistant(state: MessagesState):
    messages = [NELFUND_SYSTEM_PROMPT] + state["messages"]
    return {"messages": [llm_with_tools.invoke(messages)]}

def should_continue(state: dict):
    last_message = state["messages"][-1]
    if getattr(last_message, "tool_calls", False):
        if state.get("retrieval_done", False):
            return "__end__"
        state["retrieval_done"] = True
        return "tools"
    return "__end__"

builder = StateGraph(dict)
builder.add_node("assistant", assistant)
builder.add_node("tools", ToolNode(tools))
builder.add_edge(START, "assistant")
builder.add_conditional_edges("assistant", should_continue, {"tools":"tools", "__end__":END})
builder.add_edge("tools", "assistant")

agent = builder.compile()
