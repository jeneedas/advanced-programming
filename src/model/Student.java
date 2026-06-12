package model;

import java.util.List;
import java.util.Map;

public class Student {

    private int id;
    private String name;
    private List<String> courses;
    private Map<String, Integer> scores;

    public Student(int id, String name, List<String> courses, Map<String, Integer> scores) {
        this.id = id;
        this.name = name;
        this.courses = courses;
        this.scores = scores;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getCourses() {
        return courses;
    }

    public Map<String, Integer> getScores() {
        return scores;
    }

    // calculate average score of student
    public double getAverageScore() {
        if (scores.isEmpty()) return 0;

        return scores.values()
                .stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0);
    }
}