# ----------- Address Class -----------
class Address:
    def __init__(self, street, city, zipCode):
        self.street = street
        self.city = city
        self.zipCode = zipCode


# ----------- Student Class -----------
class Student: 
    def __init__(self, name, age, address):
        self.name = name
        self._age = age   # protected attribute no access ourtsthe class unless getter setteride 
        self.address = address   # Composition (Has-A relationship)
        self.courses = []   # list (mutable)

    # Property for age (with validation)
    @property  #decorator to make age a property, allowing us to use it like an attribute while still providing getter and setter functionality
    def age(self): #getter for age encapsulating the _age attribute
        return self._age

    @age.setter
    def age(self, value):
       if not isinstance(value, int):
          raise ValueError("Age must be an integer")
       if value <= 0:
          raise ValueError("Age must be positive")
       self._age = value

    # Add course
    def add_course(self, course):
        self.courses.append(course)

    # Display details
    def display(self):
        print("Name:", self.name)
        print("Age:", self.age)
        print("Address:", self.address.street, ",", self.address.city, "-", self.address.zipCode)
        print("Courses:", self.courses)


# ----------- Scholarship Student -----------
class ScholarshipStudent(Student): #inherit from Student (IS-A relationship)
    def __init__(self, name, age, address, scholarshipAmount):
        super().__init__(name, age, address) 
        self.scholarshipAmount = scholarshipAmount

    # Override display
    def display(self):
        super().display() #parent display to show common details
        print("Scholarship Amount:", self.scholarshipAmount)


# ----------- Main Program -----------
if __name__ == "__main__":

    # Create Address
    addr = Address("MG Road", "Guwahati", "781001")

    # Create Student
    s1 = Student("Jenny", 20, addr)
    s1.add_course("Math")
    s1.add_course("Physics")

    # Create Scholarship Student
    s2 = ScholarshipStudent("Alex", 22, addr, 5000)
    s2.add_course("Computer Science")

    # Show details
    print("Student Details:")
    s1.display()

    print("\nScholarship Student Details:")
    s2.display()

    # Validation example
    print("\nTrying invalid age:")
    try:
        s1.age = -5
    except ValueError as e:
        print(e)