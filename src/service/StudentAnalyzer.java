package service;

import model.Student;

import java.util.*;
import java.util.stream.Collectors;

public class StudentAnalyzer {

    // 1. TOP N STUDENTS
    public List<Student> getTopNStudents(List<Student> students, int n) {

        return students.stream()
                .sorted((s1, s2) ->
                        Double.compare(s2.getAverageScore(), s1.getAverageScore()))
                .limit(n)
                .collect(Collectors.toList());
    }

    // 2. AVERAGE SCORE PER COURSE
    public Map<String, Double> getAverageScorePerCourse(List<Student> students) {

        Map<String, List<Integer>> temp = new HashMap<>();

        for (Student s : students) {
            for (String course : s.getCourses()) {

                int score = s.getScores().getOrDefault(course, 0);

                temp.computeIfAbsent(course, k -> new ArrayList<>())
                        .add(score);
            }
        }

        Map<String, Double> result = new HashMap<>();

        for (String course : temp.keySet()) {

            double avg = temp.get(course)
                    .stream()
                    .mapToInt(Integer::intValue)
                    .average()
                    .orElse(0);

            result.put(course, avg);
        }

        return result;
    }

    // 3. UNIQUE COURSES
    public Set<String> getAllUniqueCourses(List<Student> students) {

        return students.stream()
                .flatMap(s -> s.getCourses().stream())
                .collect(Collectors.toSet());
    }
}