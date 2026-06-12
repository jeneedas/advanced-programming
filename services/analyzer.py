from typing import List, Dict, Set
from functools import reduce
from models.activity import ActivityLog

# 1. Total time per user
def total_time_per_user(logs: List[ActivityLog]) -> Dict[str, float]:
    return reduce(
        lambda acc, log: {
            **acc,
            log["user"]: acc.get(log["user"], 0) + log["duration"]
        },
        logs,
        {}
    )

# 2. Top K users
def most_active_users(logs: List[ActivityLog], k: int) -> List[str]:
    totals = total_time_per_user(logs)

    sorted_users = sorted(
        totals.items(),
        key=lambda x: x[1],
        reverse=True
    )

    return [user for user, _ in sorted_users[:k]]

# 3. Unique actions
def unique_actions(logs: List[ActivityLog]) -> Set[str]:
    return {log["action"] for log in logs}