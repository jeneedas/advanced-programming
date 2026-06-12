package main;

import model.Student;
import service.StudentAnalyzer;
import util.DataGenerator;

import java.util.List;
import java.util.Map;
import java.util.Set;

public class Main {

    public static void main(String[] args) {

        List<Student> students = DataGenerator.generateStudents();
        StudentAnalyzer analyzer = new StudentAnalyzer();

        // --------------------------
        // 1. TOP N STUDENTS
        // --------------------------
        System.out.println("\nTOP 2 STUDENTS");

        List<Student> topStudents = analyzer.getTopNStudents(students, 2);

        for (Student s : topStudents) {
            System.out.println(
                    "ID: " + s.getId() +
                    " | Name: " + s.getName() +
                    " | Avg: " + s.getAverageScore()
            );
        }

        // --------------------------
        // 2. COURSE AVERAGES
        // --------------------------
        System.out.println("\nAVERAGE SCORE PER COURSE");

        Map<String, Double> avgScores =
                analyzer.getAverageScorePerCourse(students);

        for (String course : avgScores.keySet()) {
            System.out.println(course + " -> " + avgScores.get(course));
        }

        // --------------------------
        // 3. UNIQUE COURSES
        // --------------------------
        System.out.println("\nUNIQUE COURSES");

        Set<String> courses = analyzer.getAllUniqueCourses(students);

        for (String c : courses) {
            System.out.println(c);
        }

        // --------------------------
        // COMPLEXITY
        // --------------------------
        System.out.println("\nCOMPLEXITY:");
        System.out.println("Top N sorting: O(n log n)");
        System.out.println("Course averages: O(n * k)");
    }
}