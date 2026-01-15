# agent.py
from langgraph.graph import START, END, StateGraph, MessagesState
from langgraph.prebuilt import ToolNode
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, ToolMessage

from agent.source.prompts import NELFUND_SYSTEM_PROMPT
from agent.source.retriever import create_vectorstore
from agent.source.ingest import load_documents, split_documents

# Load & prepare documents (run once at startup)
pages = load_documents()
chunks = split_documents(pages)
vectorstore = create_vectorstore(chunks)

# LLM + Tools
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)


@tool
def retrieve_nelfund_docs(query: str) -> str:
    """
    Retrieve official NELFUND documents for factual questions
    about student loans, eligibility, and applications.
    """
    retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 3},
    )
    docs = retriever.invoke(query)
    if not docs:
        return "No relevant NELFUND documents found."
    return "\n\n".join(doc.page_content for doc in docs)


tools = [retrieve_nelfund_docs]
llm_with_tools = llm.bind_tools(tools)

tool_node = ToolNode(tools)

# Agent Nodes
def assistant(state: MessagesState):
    """
    Main assistant node.
    """
    # Prepend system prompt ONCE
    messages = [NELFUND_SYSTEM_PROMPT] + state["messages"]
    
    response = llm_with_tools.invoke(messages)

    return {"messages": [response]}


# Graph Definition
builder = StateGraph(MessagesState)

builder.add_node("assistant", assistant)
builder.add_node("tools", tool_node)

builder.add_edge(START, "assistant")
builder.add_conditional_edges(
    "assistant",
    lambda state: "tools" if state["messages"][-1].tool_calls else END,
)
builder.add_edge("tools", "assistant")

agent = builder.compile()