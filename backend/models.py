# backend/models.py
from pydantic import BaseModel

class Message(BaseModel):
    user_id: str  # unique identifier for the user
    message: str  # the actual message from the user
