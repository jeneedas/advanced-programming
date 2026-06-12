# ============================================================
#   E-COMMERCE ORDER PROCESSING SYSTEM
#   SOLID Principles Demonstration
# ============================================================

from abc import ABC, abstractmethod # For defining abstract base classes


# ============================================================
# INTERFACES (Abstract Base Classes)
# ISP: Small, role-specific interfaces — each has ONE method
# ============================================================

# Payment Interface
class PaymentMethod(ABC): # Each payment method class will implement this interface, ensuring they all have a 'pay' method. no direct objects
    @abstractmethod #decorator to indicate that this method must be implemented by any subclass
    def pay(self, amount: float) -> str:
        pass # The 'pass' statement is a placeholder indicating that the method has no implementation in the base class. Subclasses must provide their own implementation of this method.


# Notification Interface
class NotificationChannel(ABC):
    @abstractmethod
    def send(self, message: str) -> str:
        pass


# Storage Interface
class StorageMechanism(ABC):
    @abstractmethod
    def save(self, order_details: dict) -> str:
        pass


# ============================================================
# ORDER BASE CLASS (Abstract)
# SRP: Handles only order data and amount calculation
# ============================================================

class Order(ABC):
    def __init__(self, order_name: str, base_amount: float): # The constructor initializes the order with a name and a base amount. This is common data that all types of orders will have.
        self.order_name = order_name
        self.base_amount = base_amount

    @abstractmethod #decorator to indicate that this method must be implemented by any subclass. This enforces that every specific order type must provide its own logic for calculating the final amount.
    def calculate_final_amount(self) -> float:
        pass

    def get_order_type(self) -> str:
        return self.__class__.__name__


# ============================================================
# ORDER TYPES
# OCP: New order types added by creating new classes
# LSP: Each subclass correctly replaces base Order
# ============================================================

class RegularOrder(Order): #inherits from Order, so it must implement the calculate_final_amount method. This class represents a standard order with no discounts or extra charges.
    """Regular order — no price change."""
    def calculate_final_amount(self) -> float:
        return self.base_amount


class DiscountedOrder(Order):
    """Discounted order — 20% off."""
    DISCOUNT_RATE = 0.20

    def calculate_final_amount(self) -> float:
        discount = self.base_amount * self.DISCOUNT_RATE
        return self.base_amount - discount


class PriorityOrder(Order):
    """Priority order — 15% extra charge for fast processing."""
    PRIORITY_CHARGE_RATE = 0.15

    def calculate_final_amount(self) -> float:
        extra_charge = self.base_amount * self.PRIORITY_CHARGE_RATE
        return self.base_amount + extra_charge


# ============================================================
# PAYMENT METHODS
# OCP: Add new methods without touching existing code
# LSP: All payment classes work through PaymentMethod interface
# SRP: Each class only processes one type of payment
# ============================================================

class CreditCardPayment(PaymentMethod):
    def pay(self, amount: float) -> str: #override the abstract method from PaymentMethod. This class simulates processing a payment through a credit card and returns a success message.
        return f"  [Credit Card] Payment of ₹{amount:.2f} processed successfully."


class UPIPayment(PaymentMethod):
    def pay(self, amount: float) -> str:
        return f"  [UPI]         Payment of ₹{amount:.2f} processed successfully."


class WalletPayment(PaymentMethod):
    def pay(self, amount: float) -> str:
        return f"  [Wallet]      Payment of ₹{amount:.2f} processed successfully."


# ============================================================
# NOTIFICATION CHANNELS
# OCP: Add new channels without modifying existing ones
# LSP: All channels work through NotificationChannel interface
# SRP: Each class only handles one notification type
# ============================================================

class EmailNotification(NotificationChannel):
    def send(self, message: str) -> str:
        return f"  [Email]       Notification sent → {message}"


class SMSNotification(NotificationChannel):
    def send(self, message: str) -> str:
        return f"  [SMS]         Notification sent → {message}"


class PushNotification(NotificationChannel):
    def send(self, message: str) -> str:
        return f"  [Push]        Notification sent → {message}"


# ============================================================
# STORAGE MECHANISMS
# OCP: Add new storage types without changing existing ones
# LSP: All storage classes work through StorageMechanism interface
# SRP: Each class only handles one way of saving data
# ============================================================

class DatabaseStorage(StorageMechanism):
    def save(self, order_details: dict) -> str:
        return f"  [Database]    Order '{order_details['order_name']}' saved to Database."


class FileStorage(StorageMechanism):
    def save(self, order_details: dict) -> str:
        return f"  [File]        Order '{order_details['order_name']}' saved to File."


# ============================================================
# ORDER SERVICE — High-level orchestrator
# DIP: Depends on ABSTRACTIONS (interfaces), not concrete classes
# SRP: Only responsible for orchestrating the order flow
# Dependency Injection: Receives dependencies from outside
# ============================================================

class OrderService:
    def __init__(
        self,
        payment_method: PaymentMethod,       # Abstraction, not concrete class
        notification_channel: NotificationChannel,  # Abstraction
        storage_mechanism: StorageMechanism         # Abstraction
    ):
        # DIP: Store abstractions, not concrete implementations
        self.payment_method = payment_method
        self.notification_channel = notification_channel
        self.storage_mechanism = storage_mechanism

    def process_order(self, order: Order):
        """
        Main flow:
        1. Calculate final amount
        2. Process payment
        3. Send notification
        4. Save order
        """
        print("\n" + "=" * 55)
        print(f"  ORDER PROCESSING STARTED")
        print("=" * 55)

        # Step 1: Display order info
        final_amount = order.calculate_final_amount()
        print(f"  Order Name   : {order.order_name}")
        print(f"  Order Type   : {order.get_order_type()}")
        print(f"  Base Amount  : ₹{order.base_amount:.2f}")
        print(f"  Final Amount : ₹{final_amount:.2f}")
        print("-" * 55)

        # Step 2: Process payment
        print("  PAYMENT:")
        payment_result = self.payment_method.pay(final_amount)
        print(payment_result)

        # Step 3: Send notification
        print("  NOTIFICATION:")
        notification_message = (
            f"Your order '{order.order_name}' of ₹{final_amount:.2f} is confirmed!"
        )
        notification_result = self.notification_channel.send(notification_message)
        print(notification_result)

        # Step 4: Save order
        print("  STORAGE:")
        order_details = {
            "order_name": order.order_name,
            "order_type": order.get_order_type(),
            "base_amount": order.base_amount,
            "final_amount": final_amount,
        }
        storage_result = self.storage_mechanism.save(order_details)
        print(storage_result)

        print("=" * 55)
        print("  ORDER PROCESSING COMPLETE ✓")
        print("=" * 55)


# ============================================================
# MAIN — Test Scenarios
# Demonstrates 3 different combinations as required
# ============================================================

if __name__ == "__main__":

    print("\n" + "#" * 55)
    print("#   E-COMMERCE ORDER PROCESSING SYSTEM               #")
    print("#   SOLID Principles Demonstration                   #")
    print("#" * 55)

    # ─────────────────────────────────────────────────────────
    # SCENARIO 1: Regular Order + Credit Card + Email + Database
    # ─────────────────────────────────────────────────────────
    print("\n\n>>> SCENARIO 1: Regular Order")

    order1 = RegularOrder(order_name="Laptop Stand", base_amount=1500.00)

    service1 = OrderService(
        payment_method=CreditCardPayment(),
        notification_channel=EmailNotification(),
        storage_mechanism=DatabaseStorage()
    )

    service1.process_order(order1)

    # ─────────────────────────────────────────────────────────
    # SCENARIO 2: Discounted Order + UPI + SMS + File
    # ─────────────────────────────────────────────────────────
    print("\n\n>>> SCENARIO 2: Discounted Order (20% off)")

    order2 = DiscountedOrder(order_name="Wireless Mouse", base_amount=800.00)

    service2 = OrderService(
        payment_method=UPIPayment(),
        notification_channel=SMSNotification(),
        storage_mechanism=FileStorage()
    )

    service2.process_order(order2)

    # ─────────────────────────────────────────────────────────
    # SCENARIO 3: Priority Order + Wallet + Push + Database
    # ─────────────────────────────────────────────────────────
    print("\n\n>>> SCENARIO 3: Priority Order (15% extra charge)")

    order3 = PriorityOrder(order_name="Mechanical Keyboard", base_amount=3000.00)

    service3 = OrderService(
        payment_method=WalletPayment(),
        notification_channel=PushNotification(),
        storage_mechanism=DatabaseStorage()
    )

    service3.process_order(order3)

    print("\n\n" + "#" * 55)
    print("#   ALL SCENARIOS COMPLETED SUCCESSFULLY             #")
    print("#" * 55 + "\n")



    #srp: sinngle responsibility principle - each class has one reason to change: payment classes only change if payment logic changes, notification classes only change if notification logic changes, etc. order service only changes if the overall flow changes, not individual steps. This keeps code modular and easier to maintain.
    #ocp: open-closed principle - we can add new order types, payment methods, notification channels, and storage mechanisms by creating new classes that implement the existing interfaces, without modifying existing code. This allows the system to grow without risking bugs in existing functionality.
    #lsp: liskov substitution principle - all subclasses of Order can be used interchangeably without affecting the correctness of the program. For example, we can use RegularOrder, DiscountedOrder, or PriorityOrder wherever an Order is expected, and the system will work correctly.
    #isp: interface segregation principle - we have defined small, specific interfaces for payment, notification, and storage. This allows classes to implement only the interfaces they need, rather than being forced to implement methods they don't use. For example, a payment class only implements the PaymentMethod interface and doesn't have to worry about notification or storage methods.
    #dip: dependency inversion principle - the OrderService depends on abstractions (interfaces) rather than concrete implementations. This allows us to easily swap out different payment methods, notification channels, and storage mechanisms without changing the OrderService code. For example, we can switch from CreditCardPayment to UPIPayment without modifying the OrderService class. 