from typing import List, Dict, Set
from functools import reduce


# 1️⃣ Total screen time per user
def total_time_per_user(logs: List[Dict[str, object]]) -> Dict[str, float]:
    """
    Computes total activity duration per user using reduce().
    Time Complexity: O(n)
    Space Complexity: O(u)
    """

    def reducer(acc: Dict[str, float], log: Dict[str, object]) -> Dict[str, float]:
        user: str = str(log["user"])
        duration: float = float(log["duration"])
        acc[user] = acc.get(user, 0.0) + duration
        return acc

    return reduce(reducer, logs, {})


# 2️⃣ Top K most active users
def most_active_users(logs: List[Dict[str, object]], k: int) -> List[str]:
    """
    Returns top K users sorted by total activity duration (descending).
    Time Complexity: O(n + u log u)
    """

    totals: Dict[str, float] = total_time_per_user(logs)

    sorted_users = sorted(
        totals.items(),
        key=lambda item: item[1],
        reverse=True
    )

    return [user for user, _ in sorted_users[:k]]


# 3️⃣ Unique actions across all logs
def unique_actions(logs: List[Dict[str, object]]) -> Set[str]:
    """
    Returns a set of unique actions.
    Time Complexity: O(n)
    Space Complexity: O(a)
    """

    return {str(log["action"]) for log in logs}


# ---------------------------------------------------
# Example Usage + Complexity Display
# ---------------------------------------------------
if __name__ == "__main__":

    logs: List[Dict[str, object]] = [
        {"user": "101", "action": "YouTube", "duration": 1.5},
        {"user": "102", "action": "Instagram", "duration": 2.0},
        {"user": "101", "action": "LeetCode", "duration": 1.0},
        {"user": "103", "action": "YouTube", "duration": 3.0},
        {"user": "102", "action": "WhatsApp", "duration": 0.5},
    ]

    print("----- Activity Log Analysis -----\n")

    print("Total Time Per User:")
    print(total_time_per_user(logs))

    print("\nTop 2 Most Active Users:")
    print(most_active_users(logs, 2))

    print("\nUnique Actions:")
    print(unique_actions(logs))

    print("\n----- Complexity Analysis -----")
    print("Time Complexity for total_time_per_user: O(n)")
    print("Time Complexity for most_active_users: O(n + u log u)")
    print("Time Complexity for unique_actions: O(n)")
    print("Space Complexity (overall intermediate storage): O(u + a)")

    print("\nWhere:")
    print("n = number of logs")
    print("u = number of unique users")
    print("a = number of unique actions")