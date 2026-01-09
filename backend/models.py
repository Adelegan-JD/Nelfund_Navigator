# backend/models.py
from pydantic import BaseModel
from typing import Optional

class Message(BaseModel):
    user_id: Optional[str] = None  # unique identifier for the user
    message: str  # the actual message from the user
