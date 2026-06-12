from services.analyzer import total_time_per_user, most_active_users, unique_actions
from utils.data_generator import generate_logs

def main():
    logs = generate_logs()

    # 1. TOTAL TIME
    print("\n==============================")
    print(" 1. TOTAL TIME PER USER")
    print("==============================")

    totals = total_time_per_user(logs)

    for user, time in totals.items():
        print(f"User: {user:<5} | Total Time: {time:.2f}")

    print("\nTime Complexity: O(n)")
    print("Space Complexity: O(n)")

    print("\n------------------------------")

    # 2. TOP USERS
    print("\n==============================")
    print(" 2. TOP K ACTIVE USERS")
    print("==============================")

    k = 2
    top_users = most_active_users(logs, k)

    for i, user in enumerate(top_users, start=1):
        print(f"Rank {i}: User {user}")

    print("\nTime Complexity: O(n log n)")
    print("Space Complexity: O(n)")

    print("\n------------------------------")

    # 3. UNIQUE ACTIONS
    print("\n==============================")
    print(" 3. UNIQUE ACTIONS")
    print("==============================")

    actions = unique_actions(logs)

    for action in actions:
        print(f"Action: {action}")

    print("\nTime Complexity: O(n)")
    print("Space Complexity: O(n)")

    print("\n------------------------------")

if __name__ == "__main__":
    main()