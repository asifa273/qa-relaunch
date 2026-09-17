//if statement with example
let temperature = 75;
if (temperature > 80) {
    console.log("It's hot outside!");
} else if (temperature < 60) {
    console.log("It's cold outside!");
} else {
    console.log("The weather is moderate.");
}

// break statement with company problem example explaining the temperature amplitude 
//amplitude is the difference between the highest and lowest temperatures recorded in a given period.
// break statement is used to exit a loop or switch statement prematurely, based on a certain condition. 
// In the context of the company problem, we can use a break statement to stop processing temperatures 
// once we encounter a sensor error.

//break statement example
const temperatures = [-30, -20, -10, -5, 'error', 60, 70, 80, 90, 100];
let maxTemp = -5;
let minTemp = 100;

// Loop through the temperatures array to find the max and min temperatures
for (let i = 0; i < temperatures.length; i++) {
    // Check for sensor error
    const currentTemperature = temperatures[i];
    if (currentTemperature === 'error') {
        console.log("Sensor error encountered. Stopping the processing.");
        break; // Exit the loop if a sensor error is found
    }// Update max and min temperatures
    if (typeof currentTemperature !== 'number') {
        continue; // Ignore any unexpected non-number values
    }
    if (currentTemperature > maxTemp) {
        maxTemp = currentTemperature;
    }
    if (currentTemperature < minTemp) {
        minTemp = currentTemperature;
    }

}
// After the loop, we can calculate the amplitude if we have valid max and min temperatures
if (maxTemp !== 100 || minTemp !== -5) {
    const amplitude = maxTemp - minTemp;
    console.log("Temperature Amplitude:", amplitude);
} else {
    console.log("No valid temperature data to calculate amplitude.");
}


//while loop with interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all even numbers in the array using a while loop.

function sumofEvenNumbers(arr: number[]): number {
    let sum = 0;
    let i = 0;
    while (i < arr.length) {
        const currentNumber = arr[i];
        if (currentNumber !== undefined && currentNumber % 2 === 0) {
            sum += currentNumber;
        }
        i++;
    }
    return sum;
}
console.log("Sum of even numbers:", sumofEvenNumbers([1, 2, 3, 4, 5, 6])); // Output: 12

//while loop with interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all odd numbers in the array using a while loop.

function sumofOddNumbers(arr: number[]): number {
    let sum = 0;
    let i = 0;
    while (i < arr.length) {
        const currentNumber = arr[i];
        if (currentNumber !== undefined && currentNumber % 2 !== 0) {
            sum += currentNumber;
        }
        i++;
    }
    return sum;
}
console.log("Sum of odd numbers:", sumofOddNumbers([1, 2, 3, 4, 5, 6]));

//for loop with interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all numbers in the array using a for loop.

function sumofNumbers(arr: number[]): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i] ?? 0;
    }
    return sum;
}
console.log("Sum of numbers:", sumofNumbers([1, 2])); // Output: 21

//for loop with interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all positive numbers in the array using a for loop.

function sumofPositiveNumbers(arr: number[]): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        const number = arr[i] ?? 0;
        if (number > 0) {
            sum += number;
        }
    }
    return sum;
}
console.log("Sum of positive numbers:", sumofPositiveNumbers([-1, 2, -3, 4, -5, 0])); // Output: 12 

//do while loop interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all negative numbers in the array using a do-while loop.

function sumofNegativeNumbers(arr: number[]): number {
    let sum = 0;
    let i = 0;
    // Using a do-while loop to iterate through the array
    // The do-while loop ensures that the code block is executed at least once, even if the array is empty
    do {
        // Check if the current number is negative
        if (arr[i] < 0) {
            // If it is negative, add it to the sum
            sum += arr[i];
        }
        // Increment the index to move to the next element
        i++;
        // The loop will continue until we have processed all elements in the array
    } while (i < arr.length);
    // Return the final sum of negative numbers
    return sum;
}
console.log("Sum of negative numbers:", sumofNegativeNumbers([-1, 2, -3, 4, -5, 0])); // Output: -9

//do while loop interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all numbers greater than 10 in the array using a do-while loop.

function sumofNumbersGreaterThanTen(arr: number[]): number {
    let sum = 0;
    let i = 0;
    // Using a do-while loop to iterate through the array
    // The do-while loop ensures that the code block is executed at least once, even if the array is empty
    do {
        // Check if the current number is greater than 10
        if (arr[i] > 10) {
            // If it is, add it to the sum
            sum += arr[i];
        }
        // Increment the index to move to the next element
        i++;
        // The loop will continue until we have processed all elements in the arr m ay
    } while (i < arr.length);
    // Return the final sum of numbers greater than 10
    return sum;
}
console.log("Sum of numbers greater than ten:", sumofNumbersGreaterThanTen([5, 15, 25, 35])); // Output: 75 

//for of loops means iterating over the values of an array directly
//for of loop with interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all even numbers in the array using a for-of loop.

function sumofEvenNumbersForOf(arr: number[]): number {
    let sum = 0;
    // Using a for-of loop to iterate through the array
    // The for-of loop allows us to access each number in the array directly without needing an index
    // Check if the current number is even and add it to the sum if it is
    // The for-of loop is particularly useful for arrays and other iterable objects, making the code cleaner and easier to read
    for (const num of arr) {
        if (num % 2 === 0) {
            sum += num;
        }
    }
    return sum;
}
console.log("Sum of even numbers (for-of):", sumofEvenNumbersForOf([1, 2, 3, 4, 5, 6])); // Output: 12

//for loop with interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all even numbers in the array using a for loop.

function sumofEvenNumbersFor(arr: number[]): number {
    let sum = 0;
    // Using a for loop to iterate through the array
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sum += arr[i];
        }
    }
    return sum;
}
console.log("Sum of even numbers (for):", sumofEvenNumbersFor([1, 2, 3, 4, 5, 6])); // Output: 12

//print even numbers with filter method
//filter method means
// Interview Question: Write a function that takes an array of numbers and 
// returns a new array containing only the even numbers from the original array using the filter method.

function filterEvenNumbers(arr: number[]): number[] {
    // Using the filter method to create a new array with only even numbers
    // The filter method takes a callback function that is called for each element in the array
    // The callback function checks if the number is even (i.e., divisible by 2 with no remainder)
    // If the condition is true, the number is included in the new array; otherwise, it is excluded
    // This approach is concise and leverages the built-in capabilities of JavaScript to handle array transformations efficiently
    // The filter method is a powerful tool for creating subsets of data based on specific criteria, making it ideal for this task
    //typeScript's type system ensures that the input array is of type number[], providing additional safety and clarity in the code
    return arr.filter(num => num % 2 === 0);
}
console.log("Filtered even numbers:", filterEvenNumbers([1, 2, 3, 4, 5, 6])); // Output: [2, 4, 6]

//print odd numbers with filter method
// Interview Question: Write a function that takes an array of numbers and 
// returns a new array containing only the odd numbers from the original array using the filter method.

function filterOddNumbers(arr: number[]): number[] {
    // Using the filter method to create a new array with only odd numbers
    // This approach is concise and leverages the built-in capabilities of JavaScript to handle array transformations efficiently
    // The filter method is a powerful tool for creating subsets of data based on specific criteria, making it ideal for this task
    // TypeScript's type system ensures that the input array is of type number[], providing additional safety and clarity in the code
    return arr.filter(num => num % 2 !== 0);
}
console.log("Filtered odd numbers:", filterOddNumbers([1, 2, 3, 4, 5, 6])); // Output: [1, 3, 5]

//print positive numbers with filter method
// Interview Question: Write a function that takes an array of numbers and 
// returns a new array containing only the positive numbers from the original array using the filter method.

function filterPositiveNumbers(arr: number[]): number[] {
    // Using the filter method to create a new array with only positive numbers
    // This approach is concise and leverages the built-in capabilities of JavaScript to handle array transformations efficiently
    // The filter method is a powerful tool for creating subsets of data based on specific criteria, making it ideal for this task
    // TypeScript's type system ensures that the input array is of type number[], providing additional safety and clarity in the code
    return arr.filter(num => num > 0);
}
console.log("Filtered positive numbers:", filterPositiveNumbers([-1, 2, -3, 4, -5, 0])); // Output: [2, 4]    

//print negative numbers with filter method
// Interview Question: Write a function that takes an array of numbers and 
// returns a new array containing only the negative numbers from the original array using the filter method.

function filterNegativeNumbers(arr: number[]): number[] {
    // Using the filter method to create a new array with only negative numbers

    return arr.filter(num => num < 0);
}
console.log("Filtered negative numbers:", filterNegativeNumbers([-1, 2, -3, 4, -5, 0])); // Output: [-1, -3, -5]


//print numbers greater than 10 with filter method
// Interview Question: Write a function that takes an array of numbers and 
// returns a new array containing only the numbers greater than 10 from the original array using the filter method.

function filterNumbersGreaterThanTen(arr: number[]): number[] {
    // Using the filter method to create a new array with only numbers greater than 10
    return arr.filter(num => num > 10);
}
// Example usage of the filterNumbersGreaterThanTen function
console.log("Filtered numbers greater than ten:", filterNumbersGreaterThanTen([5, 15, 25, 35])); // Output: [15, 25, 35]


//reduce method with interview question example
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all numbers in the array using the reduce method.
//reduce method is used to reduce an array to a single value by applying a function to each element in the array, accumulating the result.
function sumofNumbersReduce(arr: number[]): number {
    // Using the reduce method to calculate the sum of all numbers in the array
    // The reduce method takes a callback function and an initial value (0 in this case)
    // The callback function takes two arguments: the accumulator (sum) and the current value (num)
    // For each element in the array, the callback function adds the current value to the accumulator
    // The final result is the total sum of all numbers in the array
    return arr.reduce((sum, num) => sum + num, 0);
}
console.log("Sum of numbers (reduce):", sumofNumbersReduce([1, 2, 3, 4, 5])); // Output: 15

//reduce Vs filter method with interview question example
// Interview Question: Explain the difference between the reduce and filter methods in JavaScript/TypeScript.
// The reduce method is used to reduce an array to a single value by applying a function to each element in the array, accumulating the result.
// The filter method is used to create a new array containing only the elements that pass a certain condition specified in a callback function.
// In summary, reduce transforms an array into a single value, while filter creates a new array based on a condition.   


//find largest number with reduce method
// Interview Question: Write a function that takes an array of numbers and 
// returns the largest number in the array using the reduce method.
function findLargestNumber(arr: number[]): number {
    // Using the reduce method to find the largest number in the array
    // The reduce method takes a callback function and an initial value (the first element of the array in this case)
    // The callback function compares the current largest number (largest) with the current value (num)
    // Guard against empty arrays and undefined initial values to satisfy TypeScript's strict null checks.
    const initialValue = arr[0] ?? Number.NEGATIVE_INFINITY;
    return arr.reduce<number>((largest, num) => num > largest ? num : largest, initialValue);
}
console.log("Largest number (reduce):", findLargestNumber([1, 2, 3, 4, 5])); // Output: 5


//create new array with even numbers and multiply each valye by 3 and sum them up with reduce method, filter method and map method
// Interview Question: Write a function that takes an array of numbers and 
// returns the sum of all even numbers multiplied by 3 using the filter, map, and reduce methods.

function sumOfEvenNumbersMultipliedByThree(score: number[]): number {

    let sumval = score.filter(num => num % 2 === 0).map(num => num * 3).reduce((score, num) => score + num, 0);
    return sumval;
}
console.log("Sum of even numbers multiplied by three:", sumOfEvenNumbersMultipliedByThree([1001, 2001, 3, 4, 5, 6])); 

//Step 1: .filter() (Keep only Even numbers)
// Input: [1001, 2001, 3, 4, 5, 6]
// Action: It drops 1001, 2001, and 3 because they are odd.
// Output Array: [4, 5, 6] are left? Wait, 5 is odd too! 
// Let's check carefully: 4 and 6 are the only even numbers.
// Actual Output Array: [4, 6]


//Step 2: .map() (Multiply by 3)
// Input: [4, 6]
// Action: It triples each number (4 * 3 = 12 and 6 * 3 = 18).
// Output Array: [12, 18]


//Step 3: .reduce() (Sum them up)
// Input: [12, 18]
// Action: It adds the remaining numbers together (12 + 18).
// Final Output Total: 30