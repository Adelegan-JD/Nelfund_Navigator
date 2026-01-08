# This contains the question routing codebase

from agent.source.agent import agent
from backend.chat_history import fetch_messages

def query_agent(user_input: str, thread_id: str):
    """
    Query the agent with the latest user message and full chat history.
    Automatically includes all previous messages for the thread.
    """
    # Fetch all previous messages for this thread
    history = fetch_messages(user_id=thread_id, thread_id=thread_id)

    # Include the new user message
    state_messages = [{"role": m["role"], "content": m["message"]} for m in history]
    state_messages.append({"role": "user", "content": user_input})

    # Build agent state
    state = {"messages": state_messages}

    # Invoke the agent
    result = agent.invoke(
        state,
        config={"configurable": {"thread_id": thread_id}},
    )

    # Extract assistant's last message
    final_message = result["messages"][-1].content

    # Check if any tool (retriever) was used
    used_retrieval = any(getattr(m, "type", None) == "tool" for m in result["messages"])

    return final_message, used_retrieval
