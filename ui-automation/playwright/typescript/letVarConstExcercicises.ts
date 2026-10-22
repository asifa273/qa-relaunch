//Idiomatic Typescript (Type Inference)

let Tcountry = "USA";
let Tcontinent = "North America";
let Tpopulation = 331000000;
let TisIsland = false;
let Tlanguage = "English";

console.log(Tcountry);
console.log(Tcontinent);
console.log(Tpopulation);
console.log(TisIsland);
console.log(Tlanguage);

// If you intended to reassign the existing variable 
// rather than redeclare it:

let currentLanguage = "Spanish";
console.log(currentLanguage);

// Reassignment (allowed with let, forbidden with const)
let newchangedLanguage = "Arabic";
console.log(newchangedLanguage);

let required = "";
//Typescript:when u dont define the type of variable, 
//it will be inferred as string

let newrequired: string | null = null;
//explicitly defined as string or null
newrequired = "Hello, World!"; // Now it's a string
newrequired = null; // Now it's null

console.log("The type of Tcountry is: " + typeof Tcountry);
console.log("The type of Tcountry is: " + typeof TisIsland);
console.log("The type of Tcountry is: " + typeof Tpopulation);

console.log("The Type of required is: " + typeof required);

// Initialized as undefined (or uninitialized)
let uninitializedVar: string | undefined;
uninitializedVar = "Now I have a value!";
uninitializedVar = undefined; // Now it's undefined again

console.log("The Type of newrequired is: " + typeof newrequired);
console.log("The Type of uninitializedVar is: " + typeof uninitializedVar);


//VAR Vs LET
//var is function-scoped, while let is block-scoped. 
//This means that a variable declared with var is accessible throughout the entire function in which it is declared, 
//while a variable declared with let is only accessible within the block (e.g., a loop or an if statement) in which it is declared.

let x = 10; // Block-scoped variable
if (true) {
    let x = 20; // This x is only accessible within this block
    console.log("let Inside block, x =", x); // Output: Inside block, x = 20
}
console.log("let Outside block, x =", x); // Output: Outside block, x = 10

var y = 10; // Function-scoped variable
if (true) {
    var y = 20; // This y is accessible throughout the function
    console.log("var Inside block, y =", y); // Output: Inside block, y = 20
}
console.log("var Outside block, y =", y); // Output: Outside block, y = 20

function testVar() {
    var x = 1;
    if (true) {
        var x = 2; // same variable!
        console.log("var Inside block, x =", x); // 2
    }
    console.log("var Outside block, x =", x); // 2
}

function testLet() {
    let y = 1;
    if (true) {
        let y = 2; // different variable
        console.log("let Inside block, y =", y); // 2
    }
    console.log("let Outside block, y =", y); // 1
}

//let is generally preferred over var in modern JavaScript and TypeScript development 
    //  due to its block-scoping behavior, which helps prevent unintended variable shadowing 
    //  and makes the code easier to reason about.
//let - reassign acceptable, redeclaration not allowed
//var - reassign and redeclaration both allowed
//const - reassign and redeclaration both not allowed

//let - reassignment explain with example
let b = 5;
console.log("Initial value of b:", b); // Output: Initial value of b: 5

b = 15; // Reassignment is allowed
console.log("Reassigned value of b:", b); // Output: Reassigned value of b: 15

//let - redeclaration explain with example
let a = 10;
console.log("Initial value of a:", a); // Output: Initial value of a: 10

// Uncommenting the next line will cause an error because 'a' is already declared in the same scope
//let a = 20; // Error: Cannot redeclare block-scoped variable 'a'

a = 20; // Reassignment is allowed
console.log("Reassigned value of a:", a); // Output: Reassigned value of a: 20

//var - reassignment explain with example
var c = 30;
console.log("Initial value of c:", c); // Output: Initial value of c: 30

c = 40; // Reassignment is allowed
console.log("Reassigned value of c:", c); // Output: Reassigned value of c: 40

//var - redeclaration explain with example
var d = 50;
console.log("Initial value of d:", d); // Output: Initial value of d: 50

var d = 60; // Redeclaration is allowed
console.log("Redeclared value of d:", d); // Output: Redeclared value of d: 60


//const - reassignment explain with example but not redeclaration
const e = 70;
console.log("Initial value of e:", e); // Output: Initial value of e: 70

// Uncommenting the next line will cause an error because 'e' is a constant and cannot be reassigned
//e = 80; // Error: Cannot assign to 'e' because it is a constant

// Uncommenting the next line will cause an error because 'e' is already declared in the same scope
//const e = 90; // Error: Cannot redeclare block-scoped variable 'e'
