from fastapi import FastAPI
from backend.models import Message
from backend.chat_history import save_message, fetch_messages
from agent.source.router import query_agent
import uuid

app = FastAPI(title="NELFUND Navigator API")

@app.post("/message")
def send_message(msg: Message):
    # Create or fetch thread
    thread_id = str(uuid.uuid4())  # could also link to user
    save_message(msg.user_id, thread_id, "user", msg.message)
    
    answer, used_retrieval = query_agent(msg.message, thread_id)
    save_message(msg.user_id, thread_id, "assistant", answer)
    
    return {"answer": answer, "retrieval_used": used_retrieval}

@app.get("/messages/{user_id}")
def get_messages(user_id: str):
    # Could fetch all threads for user if needed
    return fetch_messages(user_id, thread_id=None)
