
    
package util;

import model.Student;

import java.util.*;

public class DataGenerator {

    public static List<Student> generateStudents() {

        List<Student> students = new ArrayList<>();

        students.add(new Student(
                1,
                "Amit",
                Arrays.asList("Java", "DSA", "DBMS"),
                Map.of("Java", 85, "DSA", 90, "DBMS", 80)
        ));

        students.add(new Student(
                2,
                "Riya",
                Arrays.asList("Java", "DSA", "AI"),
                Map.of("Java", 75, "DSA", 88, "AI", 92)
        ));

        students.add(new Student(
                3,
                "Karan",
                Arrays.asList("Java", "DBMS", "AI"),
                Map.of("Java", 95, "DBMS", 70, "AI", 85)
        ));

        return students;
    }
}