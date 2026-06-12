import java.util.*;

class Account {
    private String accountNumber;
    private String ownerName;
    private double balance;

    public Account(String accNo, String name, double balance) {
        this.accountNumber = accNo;
        this.ownerName = name;
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Invalid deposit");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
        balance -= amount;
    }

    public void display() {
        System.out.printf("%-10s | %-10s | $ %-8.2f\n",
                accountNumber, ownerName, balance);
    }
}

// ---------------- Savings ----------------
class SavingsAccount extends Account {
    private double interestRate;

    public SavingsAccount(String accNo, String name, double balance, double rate) {
        super(accNo, name, balance);
        this.interestRate = rate;
    }

    public void addInterest() {
        double interest = getBalance() * interestRate / 100;
        setBalance(getBalance() + interest);
        System.out.printf("Interest credited: $%.2f\n", interest);
    }

    @Override
    public void display() {
        System.out.printf("%-10s | %-10s | $ %-8.2f | %.2f%%\n",
                getAccountNumber(), getOwnerName(), getBalance(), interestRate);
    }
}

// ---------------- Current ----------------
class CurrentAccount extends Account {
    private double overdraftLimit;

    public CurrentAccount(String accNo, String name, double balance, double limit) {
        super(accNo, name, balance);
        this.overdraftLimit = limit;
    }

    @Override
    public void withdraw(double amount) {
        if (amount > getBalance() + overdraftLimit)
            throw new IllegalArgumentException("Overdraft exceeded");

        setBalance(getBalance() - amount);
    }

    @Override
    public void display() {
        System.out.printf("%-10s | %-10s | $ %-8.2f | %.2f\n",
                getAccountNumber(), getOwnerName(), getBalance(), overdraftLimit);
    }
}

// ---------------- MAIN ----------------
public class Main {
    public static void main(String[] args) {

        SavingsAccount s = new SavingsAccount("SA1001", "Aarav", 5000, 4.5);
        CurrentAccount c = new CurrentAccount("CA2001", "Ishita", 2000, 1500);

        System.out.println("INITIAL ACCOUNT DETAILS");
        System.out.println("Acc No    | Name       | Balance   | Interest");
        s.display();

        System.out.println("\nAcc No    | Name       | Balance   | Overdraft");
        c.display();

        System.out.println("\nSAVINGS ACCOUNT OPERATIONS");
        s.addInterest();
        s.display();

        System.out.println("\nCURRENT ACCOUNT OPERATIONS");
        c.withdraw(3000);
        c.display();

        System.out.println("\nEXCEPTION HANDLING DEMO");
        try {
            s.withdraw(10000);
        } catch (Exception e) {
            System.out.println("Savings withdrawal error: " + e.getMessage());
        }

        try {
            c.withdraw(5000);
        } catch (Exception e) {
            System.out.println("Current withdrawal error: " + e.getMessage());
        }

        System.out.println("\nFINAL ACCOUNT SNAPSHOT");
        System.out.println("Savings:");
        s.display();

        System.out.println("Current:");
        c.display();
    }
}
   