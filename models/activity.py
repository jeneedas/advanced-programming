from typing import TypedDict

class ActivityLog(TypedDict):
    user: str
    action: str
    duration: float