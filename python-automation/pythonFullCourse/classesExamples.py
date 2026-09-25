import csv
import os

# Class
class Item:
    all = []
    # Class Attribute
    pay_rate = 0.8 # The pay rate after 20% discount
    # Constructor
    def __init__(self, name: str, price:float, version:str = None, quantity=0):

        # Run validations to the received arguments
        assert price>=0, f"Price {price} is not greater than or equal to zero!"
        assert quantity>=0, f"Quantity {quantity} is not greater than or equal to zero!"

        # Assign to self object
        self.name = name
        self.version = version
        self.price = price
        self.quantity = quantity

        # Actions to execute
        Item.all.append(self)
    
    # Instance Method
    def cal_total_price(self):
        return self.price * self.quantity
    # Instance Method 
    def apply_discount(self):
        self.price = self.price * self.pay_rate

    @classmethod
    def instantiate_from_csv(cls):
        # Construct a path to items.csv relative to the current file
        # This makes the script runnable from any directory
        script_dir = os.path.dirname(__file__)
        file_path = os.path.join(script_dir, 'items.csv')
        try:
            with open(file_path, 'r') as file:
                reader = csv.DictReader(file)
                # Sanitize headers by stripping whitespace
                reader.fieldnames = [header.strip() for header in reader.fieldnames]
                items = list(reader)
        except FileNotFoundError:
            print(f"Warning: The file '{file_path}' was not found. No items were instantiated.")
            return

        for item in items:
            # Skip any blank rows that might be in the CSV file
            if not item or not item.get('name'):
                continue

            cls(
                name=item.get('name'),
                price=float(item.get('price')),
                quantity=int(item.get('quantity')),
                version=item.get('version'),
            )

    @staticmethod
    def is_integer(num):
        if isinstance(num, float):
            return num.is_integer()
        elif isinstance(num, int):
            return True
        else:
            return False


    def __repr__(self):
        return f"{self.__class__.__name__}('{self.name}', {self.price}, {self.quantity}, '{self.version}')"
for instance in Item.all:
    print(instance.name )
Item.instantiate_from_csv()


print(Item.is_integer(7.8))
# item1.apply_discount()
# print(item1.price) # Should print the discounted price
# print(item1.cal_total_price())
#
#
# item2.pay_rate = 0.5 # This sets an instance-specific pay_rate
# item2.apply_discount()
# print(item2.price) # Should print the discounted price
# print(item2.cal_total_price())


# print(Item.__dict__)
# print(item1.__dict__)
# print(item2.__dict__)
# print(Item.pay_rate)
# print(item1.pay_rate)
# print(item2.pay_rate)

print(Item.all)
