from pydantic import BaseModel
from datetime import datetime

class MessageIn(BaseModel):
    user_id: str
    thread_id: str
    role: str
    message: str

class MessageOut(BaseModel):
    role: str
    message: str
    timestamp: datetime
