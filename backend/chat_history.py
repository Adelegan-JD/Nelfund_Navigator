# This is for MongoDB chat retrieval & save functions

from db import messages_collection
from datetime import datetime

def save_message(user_id: str, thread_id: str, role: str, message: str):
    """Save a single message to MongoDB."""
    messages_collection.insert_one({
        "user_id": user_id,
        "thread_id": thread_id,
        "role": role,
        "message": message,
        "timestamp": datetime.utcnow()  # Use UTC for consistency
    })


def fetch_messages(user_id: str, thread_id: str = None):
    """
    Fetch all messages for a user (or a specific thread) from MongoDB.
    
    Args:
        user_id: The ID of the user whose messages we want.
        thread_id: Optional. If provided, fetch only messages from that thread.
    
    Returns:
        List of messages sorted by timestamp ascending.
    """
    query = {"user_id": user_id}
    if thread_id:
        query["thread_id"] = thread_id

    docs = messages_collection.find(query).sort("timestamp", 1)

    # Convert MongoDB documents to a clean list
    messages = [{"role": d["role"], "message": d["message"]} for d in docs]
    return messages


def fetch_threads(user_id: str):
    """
    Fetch unique threads for a user, including the last message and timestamp.
    """
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$sort": {"timestamp": -1}},
        {
            "$group": {
                "_id": "$thread_id",
                "last_message": {"$first": "$message"},
                "timestamp": {"$first": "$timestamp"}
            }
        },
        {"$sort": {"timestamp": -1}}
    ]
    
    threads = []
    for doc in messages_collection.aggregate(pipeline):
        threads.append({
            "id": doc["_id"],
            "title": doc["last_message"][:30] + ("..." if len(doc["last_message"]) > 30 else ""),
            "createdAt": doc["timestamp"].isoformat()
        })
    return threads
