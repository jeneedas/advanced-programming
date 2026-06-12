# Create a list to store products
products = [
    {"name": "Pen", "stock": 25},
    {"name": "Notebook", "stock": 8},
    {"name": "Pencil", "stock": 5},
    {"name": "Eraser", "stock": 12},
    {"name": "Marker", "stock": 3}
]

print("Products with stock less than 10:\n")

# Check each product
for product in products:
    if product["stock"] < 10:
        print("Product:", product["name"], "- Stock:", product["stock"])