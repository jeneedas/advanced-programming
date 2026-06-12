# ============================================
# USER ONBOARDING VALIDATION SYSTEM
# Demonstrates:
# - Custom Exceptions
# - Regex Validation
# - Assertions
# - Exception Handling
# - Pytest Testing
# ============================================

import re
import pytest


# ============================================
# CUSTOM EXCEPTIONS
# ============================================

# Custom exception for invalid email
class InvalidEmailError(ValueError):
    pass


# Custom exception for underage users
class UnderageError():
    pass


# ============================================
# REGISTRATION SERVICE CLASS
# ============================================

class RegistrationService:

    # Method to validate and register user
    def register_user(self, email: str, age: int) -> bool:

        # Internal assertion for system invariants
        assert email is not None, "Email cannot be None"

        # Check if email is empty
        if email.strip() == "":
            raise InvalidEmailError("Email cannot be empty")

        # Email regex pattern
        pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

        # Validate email format
        if not re.match(pattern, email):
            raise InvalidEmailError(
                f"Invalid email format: {email}"
            )

        # Age restriction check
        if age < 18:
            raise UnderageError(
                f"User age {age} is below minimum age requirement of 18"
            )

        # Successful registration
        print("\n======================================")
        print("     REGISTRATION SUCCESSFUL")
        print("======================================")
        print(f"Email : {email}")
        print(f"Age   : {age}")
        print("Status: Account Created")
        print("======================================")

        return True


# ============================================
# PYTEST FIXTURE
# ============================================

@pytest.fixture
def service():
    return RegistrationService()


# ============================================
# TEST FUNCTIONS
# ============================================

# Test successful registration
def test_successful_registration(service):

    result = service.register_user(
        "jenny@example.com",
        20
    )

    assert result is True


# Test invalid email
def test_invalid_email(service):

    with pytest.raises(InvalidEmailError):

        service.register_user(
            "invalid-email",
            20
        )


# Test underage user
def test_underage_user(service):

    with pytest.raises(UnderageError):

        service.register_user(
            "user@example.com",
            15
        )


# ============================================
# MAIN PROGRAM
# ============================================

if __name__ == "__main__":

    service = RegistrationService()

    print("======================================")
    print("   USER ONBOARDING VALIDATION SYSTEM")
    print("======================================")

    email = input("Enter Email : ")
    age = int(input("Enter Age   : "))

    try:

        service.register_user(email, age)

    except InvalidEmailError as e:

        print("\n======================================")
        print("        EMAIL VALIDATION ERROR")
        print("======================================")
        print(e)
        print("======================================")

    except UnderageError as e:

        print("\n======================================")
        print("        AGE VALIDATION ERROR")
        print("======================================")
        print(e)
        print("======================================")

    except AssertionError as e:

        print("\n======================================")
        print("         ASSERTION ERROR")
        print("======================================")
        print(e)
        print("======================================")