import java.util.*;
import java.util.stream.*;

class Student {

    private int id;
    private String name;
    private List<String> courses;
    private Map<String, Integer> scores;

    public Student(int id, String name,
                   List<String> courses,
                   Map<String, Integer> scores) {

        this.id = id;
        this.name = name;

        // Ensure no external mutation
        this.courses = new ArrayList<>(courses);
        this.scores = new HashMap<>(scores);
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public List<String> getCourses() { return courses; }
    public Map<String, Integer> getScores() { return scores; }

    /*
     * Computes average score per student.
     *
     * Time Complexity: O(m)
     * m = number of courses taken by student
     */
    public double getAverageScore() {
        return courses.stream()
                .mapToInt(course ->
                        scores.getOrDefault(course, 0))
                .average()
                .orElse(0.0);
    }

    @Override
    public String toString() {
        return name + " (Average: " + getAverageScore() + ")";
    }
}

public class StudentPerformanceAnalyzer {

    /*
     * Returns top N students sorted by average score (descending).
     *
     * Time Complexity:
     * Sorting takes O(n log n)
     * Total: O(n log n)
     */
    public static List<Student> getTopNStudents(List<Student> students, int n) {

        return students.stream()
                .sorted(Comparator.comparingDouble(Student::getAverageScore)
                        .reversed())
                .limit(n)
                .collect(Collectors.toList());
    }

    /*
     * Computes average score per course.
     *
     * Time Complexity:
     * O(n * m)
     * n = number of students
     * m = average number of courses per student
     */
    public static Map<String, Double> getAverageScorePerCourse(List<Student> students) {

        Map<String, List<Integer>> courseScores = new HashMap<>();

        for (Student student : students) {
            for (String course : student.getCourses()) {

                int score = student.getScores().getOrDefault(course, 0);

                courseScores
                        .computeIfAbsent(course, k -> new ArrayList<>())
                        .add(score);
            }
        }

        return courseScores.entrySet()
                .stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue()
                                .stream()
                                .mapToInt(Integer::intValue)
                                .average()
                                .orElse(0.0)
                ));
    }

    /*
     * Returns all unique courses.
     *
     * Time Complexity: O(n * m)
     */
    public static Set<String> getAllUniqueCourses(List<Student> students) {

        return students.stream()
                .flatMap(student -> student.getCourses().stream())
                .collect(Collectors.toCollection(HashSet::new));
    }

    // ------------------ MAIN METHOD ------------------

    public static void main(String[] args) {

        List<Student> students = new ArrayList<>();

        Map<String, Integer> scores1 = new HashMap<>();
        scores1.put("Math", 90);
        scores1.put("Physics", 85);

        students.add(new Student(
                1,
                "Jenny",
                Arrays.asList("Math", "Physics"),
                scores1
        ));

        Map<String, Integer> scores2 = new HashMap<>();
        scores2.put("Math", 75);
        scores2.put("Chemistry", 88);

        students.add(new Student(
                2,
                "Rahul",
                Arrays.asList("Math", "Chemistry"),
                scores2
        ));

        System.out.println("----- Student Performance Analyzer -----\n");

        System.out.println("Top 1 Student:");
        System.out.println(getTopNStudents(students, 1));

        System.out.println("\nAverage Score Per Course:");
        System.out.println(getAverageScorePerCourse(students));

        System.out.println("\nAll Unique Courses:");
        System.out.println(getAllUniqueCourses(students));

        System.out.println("\n----- Complexity Analysis -----");
        System.out.println("1. Computing course averages: O(n * m)");
        System.out.println("   n = number of students");
        System.out.println("   m = average courses per student");

        System.out.println("\n2. Sorting Top N Students: O(n log n)");
    }
}
