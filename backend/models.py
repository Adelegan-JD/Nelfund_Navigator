from pydantic import BaseModel

class Message(BaseModel):
    user_id: str
    role: str
    message: str
