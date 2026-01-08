from fastapi import FastAPI
from backend.models import Message
from backend.chat_history import save_message, fetch_messages
from agent.source.router import query_agent
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI(title="NELFUND Navigator API")


app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.post("/message")
def send_message(msg: Message):
    """
    Receive a user message, get assistant response, and save both in MongoDB.
    Automatically generates user_id if not provided.
    """
    # Generate user_id if first message
    user_id = msg.user_id or str(uuid.uuid4())
    thread_id = user_id  # use user_id as thread_id for simplicity

    # Save user message
    save_message(user_id, thread_id, "user", msg.message)

    # Get assistant response
    answer, used_retrieval = query_agent(msg.message, thread_id)
    save_message(user_id, thread_id, "assistant", answer)

    # Return assistant response + user_id for frontend to continue session
    return {
        "user_id": user_id,
        "answer": answer,
        "retrieval_used": used_retrieval
    }

@app.get("/messages/{user_id}")
def get_messages(user_id: str):
    """
    Fetch all chat messages for a given user_id (thread).
    """
    return fetch_messages(user_id, thread_id=None)


@app.get("/health")
def health_check():
    """
    Simple health check to see if the API is running.
    """
    return {"status": "ok", "message": "NELFUND Navigator API is running"}
