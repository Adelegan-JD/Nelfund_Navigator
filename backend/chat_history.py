from fastapi import FastAPI
from datetime import datetime
import uuid

from db import messages_collection, threads_collection
from models import MessageIn

app = FastAPI(title="NELFUND AI Navigator")

# Create new thread
@app.post("/threads")
def create_thread(user_id: str):
    thread_id = f"thread_{uuid.uuid4().hex[:8]}"
    threads_collection.insert_one({
        "user_id": user_id,
        "thread_id": thread_id,
        "created_at": datetime.utcnow()
    })
    return {"thread_id": thread_id}

# Save message
@app.post("/messages")
def save_message(msg: MessageIn):
    doc = msg.dict()
    doc["timestamp"] = datetime.utcnow()
    messages_collection.insert_one(doc)
    return {"status": "saved"}

# Retrieve conversation
@app.get("/messages")
def get_messages(user_id: str, thread_id: str):
    docs = messages_collection.find(
        {"user_id": user_id, "thread_id": thread_id}
    ).sort("timestamp", 1)

    return [
        {
            "role": d["role"],
            "message": d["message"],
            "timestamp": d["timestamp"]
        }
        for d in docs
    ]
