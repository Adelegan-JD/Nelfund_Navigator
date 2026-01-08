
import urllib.request
import urllib.parse
import json
import uuid

BASE_URL = "http://localhost:8000"

def test_user_history():
    user_id = f"test-user-{uuid.uuid4()}"
    print(f"Testing with User ID: {user_id}")
    
    # 1. Send a message
    msg_data = json.dumps({"user_id": user_id, "message": "Hello from test user!"}).encode('utf-8')
    req = urllib.request.Request(f"{BASE_URL}/message", data=msg_data, headers={'Content-Type': 'application/json'})
    
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode())
        print(f"Send Message Response: {response.status}")
        print(res_data)
    
    # 2. Fetch history
    with urllib.request.urlopen(f"{BASE_URL}/messages/{user_id}") as response:
        history = json.loads(response.read().decode())
        print(f"Fetch History Response: {response.status}")
        print(f"History Length: {len(history)}")
        for msg in history:
            print(f"  {msg['role']}: {msg['message']}")
    
    if len(history) >= 2:
        print("Verification Successful!")
    else:
        print("Verification Failed: History too short")

if __name__ == "__main__":
    try:
        test_user_history()
    except Exception as e:
        print(f"Verification Failed: {e}")
