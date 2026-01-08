# This is for MongoDB chat retrieval & save functions

from .db import messages_collection
from datetime import datetime

def save_message(user_id, thread_id, role, message):
    messages_collection.insert_one({
        "user_id": user_id,
        "thread_id": thread_id,
        "role": role,
        "message": message,
        "timestamp": datetime.now()
    })

def fetch_messages(user_id, thread_id):
    docs = messages_collection.find({"user_id": user_id, "thread_id": thread_id}).sort("timestamp",1)
    return [{"role": d["role"], "message": d["message"]} for d in docs]
