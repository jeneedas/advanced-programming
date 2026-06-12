from typing import List
from models.activity import ActivityLog

def generate_logs() -> List[ActivityLog]:
    return [
        {"user": "101", "action": "YouTube", "duration": 30.5},
        {"user": "102", "action": "Instagram", "duration": 20.0},
        {"user": "101", "action": "WhatsApp", "duration": 15.0},
        {"user": "103", "action": "YouTube", "duration": 40.0},
        {"user": "102", "action": "YouTube", "duration": 25.5},
        {"user": "101", "action": "Instagram", "duration": 10.0},
    ]