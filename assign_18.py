# ============================================
# SCORE PROCESSOR SYSTEM
# Demonstrates:
# - File Handling
# - Exception Handling
# - try-except-else-finally
# - Input Validation
# - Basic Unit Testing
# ============================================

import pytest


# ============================================
# SCORE PROCESSOR CLASS
# ============================================

class ScoreProcessor:

    # Method to process score from file
    def process_score_file(self, file_path: str) -> int:

        try:
            # Open file in read mode
            file = open(file_path, "r")

            # Read file content
            data = file.read().strip()

            # Convert text into integer
            score = int(data)

            # Multiply score by 10
            result = score * 10

        # Handle missing file
        except FileNotFoundError:
            print("Error: File not found.")
            raise

        # Handle invalid data format
        except ValueError:
            print("Error: Invalid data format. File must contain a number.")
            raise

        # Executes if no error occurs
        else:
            print("Data processed successfully")
            return result

        # Always executes
        finally:
            print("File cleanup completed")


# ============================================
# PYTEST TEST FUNCTIONS
# ============================================

# Test valid file calculation
def test_valid_score_file(tmp_path):

    # Create temporary test file
    test_file = tmp_path / "score.txt"

    # Write valid number into file
    test_file.write_text("5")

    processor = ScoreProcessor()

    result = processor.process_score_file(str(test_file))

    assert result == 51


# Test missing file exception
def test_missing_file():

    processor = ScoreProcessor()

    with pytest.raises(FileNotFoundError):
        processor.process_score_file("missing_file.txt")


# ============================================
# MAIN PROGRAM
# ============================================

if __name__ == "__main__":

    processor = ScoreProcessor()

    print("======================================")
    print("      SCORE PROCESSOR SYSTEM")
    print("======================================")

    file_name = input("Enter file name: ")

    try:
        final_score = processor.process_score_file(file_name)

        print("\n======================================")
        print("          PROCESS RESULT")
        print("======================================")
        print(f"Final Processed Score : {final_score}")
        print("======================================")

    except Exception:
        print("\nProgram ended due to an error.")