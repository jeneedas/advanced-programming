import java.util.ArrayList;
import java.util.Scanner;

public class BookSearch {
    public static void main(String[] args) {

        // Create ArrayList to store book titles
        ArrayList<String> books = new ArrayList<String>();

        // Add at least 5 books
        books.add("Harry Potter and the Sorcerer's Stone");
        books.add("The Alchemist");
        books.add("Rich Dad Poor Dad");
        books.add("Think and Grow Rich");
        books.add("The Power of Habit");

        // Take input from user
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a word to search in book titles: ");
        String word = sc.nextLine();

        System.out.println("\nBooks containing \"" + word + "\":");

        // Search for the word in each book title
        for (String title : books) {
            if (title.toLowerCase().contains(word.toLowerCase())) {
                System.out.println(title);
            }
        }

        sc.close();
    }
}