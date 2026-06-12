# ----------- Abstract Base Class -----------
from abc import ABC, abstractmethod

class LibraryItem(ABC): #common base class for Book and DVD (abstraction)
    count = 0   # static counter to count total items

    def __init__(self, title, year): #constructor to initialize title and year
        self.title = title
        self.year = year
        LibraryItem.count += 1

    @abstractmethod
    def displayInfo(self): #every subclass must implement this method
        pass


# ----------- Book Class -----------
class Book(LibraryItem): #inherit from LibraryItem
    def __init__(self, title, year, author):
        super().__init__(title, year) #parent constructor to initialize title and year
        self.author = author

    def displayInfo(self):
        print("Book:", self.title)
        print("Year:", self.year)
        print("Author:", self.author)


# ----------- DVD Class -----------
class DVD(LibraryItem):
    def __init__(self, title, year, duration, genre):
        super().__init__(title, year)
        self.duration = duration
        self.genre = genre

    def displayInfo(self):
        print("DVD:", self.title)
        print("Year:", self.year)
        print("Duration:", self.duration, "minutes")
        print("Genre:", self.genre)


# ----------- Main Program -----------
if __name__ == "__main__":

    # Polymorphism: storing different objects in same list
    items = [
        Book("Harry Potter", 2001, "J.K. Rowling"),
        DVD("Inception", 2010, 148, "Sci-Fi")
    ]

    print("Library Items:\n")

    for item in items:
        item.displayInfo() # dynamic method dispatch (polymorphism)
        print()

    # Static counter demonstration
    print("Total Library Items:", LibraryItem.count)