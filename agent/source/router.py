# This contains the question routing codebase

from langchain_core.messages import HumanMessage, AIMessage
from source.agent import agent

GREETINGS = {"hi","hello","hey","good morning","good afternoon","good evening",
             "thanks","thank you","who are you","can you help me"}

def greeting_intent(query: str) -> bool:
    return query.lower().strip() in GREETINGS

def query_agent(user_input: str, thread_id: str, state=None):
    if greeting_intent(user_input):
        return "Hi, How can I help you today?", False
    
    # Build state with placeholder AIMessage to prevent ToolNode error
    if state is None:
        state = {"messages":[HumanMessage(content=user_input), AIMessage(content="")]}
    
    result = agent.invoke(state, config={"configurable":{"thread_id":thread_id}})
    
    final_answer = None
    used_retrieval = False
    for message in result["messages"]:
        if getattr(message, "tool_calls", None):
            used_retrieval = True
        if getattr(message, "content", None):
            final_answer = message.content
    return final_answer, used_retrieval
