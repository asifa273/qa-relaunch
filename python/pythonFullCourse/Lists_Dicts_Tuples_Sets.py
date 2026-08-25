# Lists Program -  built-in, mutable, and ordered collection of elements wrapped in square brackets [].
# It is a sequence data type that allows you to store multiple items—even of different data types—in a single variable.
#The fundamental difference between a list and a set is how they store and manage data:
# Lists are ordered collections that allow duplicate elements,
# while sets are unordered collections of unique elements.

#Create Tasks
to_buy_list = ["milk", "eggs", "bread"]
grocery_number = [1, 33, 555]
to_buy_list.insert(1, "fish")
to_buy_list.append("butter")
to_buy_list.remove("butter")
last_item = to_buy_list.pop()
print(last_item)
print(to_buy_list)

grocery_number.sort()
print(grocery_number)
grocery_number.reverse()
print(grocery_number)

print(to_buy_list.index("eggs"))
print(to_buy_list.count("eggs"))
print(to_buy_list.insert(0, "butter"))
print(to_buy_list)
print(to_buy_list[2])


#Tuples - immutable - cant be changed or modified or added or erase. what u see is what u get.
# Syntax: Defined with parentheses ()
coordinates = (4,5)
print(coordinates[0])
lat_long = (1234, -9870)
print("The count:" + str(lat_long.count(1234)))
print(lat_long.count(1234))
print("The index: " + str(lat_long.index(-9870)))
print(lat_long.index(-9870))
print("The index: " + str(lat_long.index(1234)))
print(lat_long.index(1234))

# Dictionaries - is  mutable, unordered collection of data stored as key:value pairs, wrapped in curly braces {}.
# Keys must always be unique and immutable data types (like strings or integers).
inventory = { 'apples': 430, 'bananas': 312, 'oranges': 525, 'pears': 21}
print(inventory)
print(inventory.keys())
print(inventory.values())
print("Count of Oranges: " + str(inventory.get('oranges')))
inventory.pop('oranges')
print(inventory)
# Update an existing value
inventory['oranges'] = 520
print(inventory)
#Add a new key-value pair
inventory['kiwi'] = 999
print(inventory)
#Delete a key-value pair
del inventory['kiwi']
print(inventory)

#Sets -  is an unordered collection of unique elements wrapped in curly braces {}.
# Sets are mutable,
# but they cannot contain duplicate values or mutable elements (like lists or dictionaries).
#The fundamental difference between a list and a set is how they store and manage data:
# Lists are ordered collections that allow duplicate elements,
# while sets are unordered collections of unique elements.

#creating set
colors = {'red', 'green', 'blue', 'yellow', 'orange','orange' }
print(colors)
colors.add('pink')
colors.remove('pink')
print(colors)

user_ids = [111, 222, 333, 4444, 111, 222, 333, 4444]
unique_ids = set(user_ids)
print(unique_ids)
sorted_ids = sorted(set(user_ids))
print(sorted_ids)

math_people = {'ali', 'khan', 'Begum'}
science_people = {'siddiq', 'mohammad', 'fathima'}
both = math_people.intersection(science_people)
Only = math_people.difference(science_people)
unique = math_people.union(science_people)
print(both)
print(Only)
print(unique)



