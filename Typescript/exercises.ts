//can a javascript/typescript hold a function as a property ? explain with example
//Yes, in JavaScript and TypeScript, you can hold a function as a property of an object. 
// This is a common practice and allows you to define methods that can be called on the object.

//birth object with a function as a property
//year is a property of the object, 
// place is another property, 
// and greet is a method (function) that can be called on the object.
const birth: {
    year: number;
    place: string;
    bcountry?: string;
    greet: () => void;
    getAge: (currentYear: number) => number;
} = {
    year: 1980,
    place: 'chicago',
    bcountry: '',
    //function does not have a name, it is an anonymous function
    greet: function () {
        console.log(`Hi, my birth year is ${this.year} and my birth place is ${this.place}.`);
    },
    getAge: function (currentYear: number): number {
        return currentYear - this.year;
    }
}
birth.greet(); // Output: Hi, my birth year is 1980 and my birth place is chicago.

//1. Adding new property to the object
birth.bcountry = 'USA';
console.log(birth.bcountry); // Output: USA
delete birth.bcountry;
console.log(birth.bcountry);

//2. Calling the object's method
console.log(birth.getAge(2024)); // Output: 44  

//what are anonymous functions in javascript/typescript ? explain with example with syntax and implementation

//anonymous function example
//In this example, we create an object `anonymousFunctionExample` that has a property `showMessage` which holds an anonymous function.
//anonymous functions are functions that do not have a name and are often used as values for properties or passed as arguments to other functions.
//When we call `showMessage`, it accesses the `message` property of the object and logs it to the console.
//anonymousFunctionExample is object that holds a property `showMessage` which is an anonymous function.
const anonymousFunctionExample = {
    message: 'Hello, World!',
    showMessage: function () {
        console.log(this.message);
    }
};

anonymousFunctionExample.showMessage(); // Output: Hello, World!

//In this example, the object `anonymousFunctionExample` has a property `showMessage` that holds an anonymous function. 
//When we call `showMessage`, it accesses the `message` property of the object and logs it to the console.

//anonymous function can also be assigned to a variable
//In this example, we assign an anonymous function to a variable `greet`. 
//This function takes a name as an argument and logs a greeting message to the console.
//greet is a variable that holds a function, and we can call it just like any other function.
const greet = function (say: string) {
    console.log(`Hello, ${say}!`);
};

greet('Alice'); // Output: Hello, Alice!

//In this example, we assign an anonymous function to a variable `greet`. 
//When we call `greet` with the argument 'Alice', it logs the greeting message to the console.


//more simple example of anonymous function
console.log("*****simple example of anonymous function*****")
function add(o: any, p: any) {
    return o + p
}
let sumt = add(2, 4)
console.log(sumt)

let sumtInt = function (q: any, r: any) {
    return q + r
}
console.log(sumtInt(2, 4))

//simplest way for anonymous functions
let sumtIntNumbs = (w: any, e: any) => w + e
console.log(sumtIntNumbs(2, 4))

console.log("*****simple example of anonymous function*****")

//interview question: Where are the push, pop, shift, unshift, splice, slice methods used in javascript/typescript ? explain with example with syntax and implementation

let arr: number[] = [10, 22, 46, 78, 90];

//push method adds one or more elements to the end of an array and returns the new length of the array.
arr.push(100);
console.log(arr); // Output: [10, 22, 46, 78, 90, 100]

//pop method removes the last element from an array and returns that element. This method changes the length of the array.
let lastElement = arr.pop();
console.log(lastElement); // Output: 100
console.log(arr); // Output: [10, 22, 46, 78, 90]

//slice method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included). The original array will not be modified.
let slicedArray = arr.slice(1, 4);
console.log(slicedArray); // Output: [22, 46, 78]
console.log(arr); // Output: [10, 22, 46, 78, 90]

//shift method removes the first element from an array and returns that removed element. This method changes the length of the array.
let firstElement = arr.shift();
console.log(firstElement); // Output: 10
console.log(arr); // Output: [22, 46, 78, 90]

//unshift method adds one or more elements to the beginning of an array and returns the new length of the array.
arr.unshift(5);
console.log(arr); // Output: [5, 22, 46, 78, 90]

//splice method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
arr.splice(2, 1, 50); // Removes 1 element at index 2 and adds 50
console.log(arr); // Output: [5, 22, 50, 78, 90]    

//indexOf method returns the first index at which a given element can be found in the array, or -1 if it is not present.
let index = arr.indexOf(78);
console.log(index); // Output: 3

//remove element from an given index in an array using splice method
arr.splice(index, 1); // Removes 1 element at index 3
console.log(arr); // Output: [5, 22, 50, 90]

//iterate over an array using forEach method
arr.forEach((value, index) => {
    console.log(`Index: ${index}, Value: ${value}`);
});
// Output:
// Index: 0, Value: 5
// Index: 1, Value: 22
// Index: 2, Value: 50
// Index: 3, Value: 90

//Is JavaScript/Typescript Asynchronous or Synchronous ? explain with example with syntax and implementation
//JavaScript and TypeScript are single-threaded, synchronous languages, meaning that they execute code in a sequential manner. 
// However, they also support asynchronous programming through callbacks, promises, and async/await syntax. 
// This allows for non-blocking operations, such as making network requests or reading files, without freezing the main thread.

//Example of synchronous code with interview question: What is the difference between synchronous and asynchronous programming in JavaScript/TypeScript ? explain with example with syntax and implementation
//Synchronous programming means that code is executed line by line, and each operation must complete before the next one starts. 
// Asynchronous programming allows for operations to be executed without blocking the main thread, enabling other code to run while waiting for time-consuming tasks to complete.

//Example of synchronous code
console.log('Start');
function synchronousFunction() {
    console.log('Inside synchronous function');
}
synchronousFunction(); // This will execute immediately

console.log('End');
// Output:
// Start
// Inside synchronous function
// End

//1. Synchronous (No independent waiting — everything freezes)
// const data = fetchfromAPI(); // Assume this is a synchronous function that fetches data from an API
// console.log(data); // This line will not execute until the data is fetched, causing a delay in execution

//2. Asynchronous (Independent waiting — other code can run while waiting)
// fetchfromAPIAsync().then(data => {
//     console.log(data); // This line will execute once the data is fetched, without blocking other code
// });
// console.log('This will log before the data is fetched'); // This line executes immediately, demonstrating non-blocking behavior 



//Example of asynchronous code using setTimeout
console.log('Start');
function asynchronousFunction() {
    setTimeout(() => {
        console.log('Inside asynchronous function');
    }, 2000); // Delay of 2 seconds
}
asynchronousFunction(); // This will execute after 2 seconds

console.log('End');
// Output:
// Start
// End
// Inside asynchronous function (after 2 seconds)

//In this example, the `asynchronousFunction` uses `setTimeout` to simulate an asynchronous operation. 
// The main thread continues executing the code, and the message inside the asynchronous function is logged after a delay, demonstrating non-blocking behavior. 
//why asynchronous programming is important in JavaScript/TypeScript ? explain with example with syntax and implementation
//Asynchronous programming is important in JavaScript and TypeScript because it allows for non-blocking operations, 
// which means that the main thread can continue executing other code while waiting for time-consuming tasks (like network requests, file I/O, or timers) to complete. 
// This leads to better performance and responsiveness in applications, especially in web development where user experience is crucial.

//Example of asynchronous programming using Promises
//promises are a way to handle asynchronous operations in JavaScript and TypeScript.
// In this example, we create a function `fetchData` that returns a Promise.
// The Promise simulates a network request that resolves after 2 seconds. 
// We use the `then` method to handle the resolved value and log it to the console.
function fetchData(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data fetched from API');
        }, 2000); // Simulate a 2-second delay
    });
}
console.log('Start');

function fetchfromAPIAsync(): Promise<string> {
    return Promise.resolve('API data');
}
function fetchfromAPI() {
    throw new Error("Function not implemented.");
}


//Create an array called expenses that contains at least 5 different expense amounts. 
// Calculate the total expenses by summing all the elements of the array. 
// Find the highest and lowest individual expenses within the array.

// 1. Create an array with 5 different expense amounts (explicitly typed as a number array)
const expenses = [100.2, 101.2, 103.2, 104.2, 105.2];

// 2. Calculate the total expenses using reduce()
const totalexpenses = expenses.reduce((sum, num) => sum + num, 0);

// 3. Find the highest and lowest individual expenses using Math.max/min and the spread ... operator
const highestexpense = Math.max(...expenses);
const lowestexpense = Math.min(...expenses);

//output the results
console.log("total expenses: ", expenses);
console.log(`total expenses: $${totalexpenses}`);
console.log(`Highest expenses: $${highestexpense}`);
console.log(`lowest expenses: $${lowestexpense}`);


//Manipulate an array of strings (add, remove, sort)
//Create an array named studentNames with the names of your students.
//Add a new student name to the beginning of the array.
//Remove the last student name from the array.
//Alphabetize the student names within the array.

let studentNames: string[] = ["Alice", "wonder", "land", "bunny"];
studentNames.unshift("first");
console.log(`New added student name is : `, studentNames);
const removedStudentName = studentNames.pop();
console.log(`Removed student name is: ${removedStudentName} and now final studentNames are ${studentNames}`);
studentNames.sort();
console.log(`Alphabetized all student names:`, studentNames);

let capitalizedNames = studentNames.map(name => name.charAt(0).toUpperCase() + name.slice(1));
console.log(`all first letter is capitalized: ${capitalizedNames} `);

//Apply transformations and calculations to array elements, and filter elements based on a condition
//You have an array called productPrices with various product prices.

//Apply a 10% discount to all prices using the map method and store the results in a new array called discountedPrices.

//Use the filter method to create a new array called affordableProducts containing only products priced below $50

//Calculate the total cost of all items in the affordableProducts array using the reduce method.

let productPrices = [10, 20, 30, 80, 100];
let dicountedPrices = productPrices.map(price => price * 0.9);
console.log("dicountedPrices are ", dicountedPrices);
let affordableProducts = dicountedPrices.filter(price => price < 50);
console.log("affordableProducts are prices <$50: ", affordableProducts);

let totalCost = affordableProducts.reduce((sum, num) => sum + num, 0);
console.log("total cost of all items", totalCost);

//in Typescript one line method of above
let prodPrices = [10, 20, 30, 80, 100];
let ultimateTotal = prodPrices.map(price=>price *0.9).filter(price => price <50).reduce((sum, num)=>sum + num, 0);
console.log("total cost of all items", ultimateTotal);