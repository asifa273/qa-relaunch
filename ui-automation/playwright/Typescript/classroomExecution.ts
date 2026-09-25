import { SchoolGroup, GraduatingClass } from './classroomManagementSystem.js';

console.log("--- Testing School Group ---");
const stud = new SchoolGroup(["firstname", "secondname", "thirdname", "fourthname", "fifthname"]);
stud.students("'frontName'");
console.log("Current Size of schoolgroup", stud.getCurrentSize());

console.log("\n--- Testing Graduating Class Limits ---");
const grad = new GraduatingClass(["Stud1", "Stud2", "Stud3", "Stud4"]);
grad.students("stud5");
console.log("Current Size of graduating Class is ", grad.getCurrentSize());


grad.students("stud6");


/*
import { GraduatingClass } from './classroomManagementSystem.js';

console.log("=== 🎓 TESTING GETTERS AND SETTERS ===");

// 1. Instantiate the class with 4 starting students
const grad = new GraduatingClass(["Stud1", "Stud2", "Stud3", "Stud4"]);

// 2. Read the size using the GETTER (No parentheses '()' needed!)
console.log(`Starting Count: ${grad.studentCount}`); // Output: 4

// 3. Add a student using the SETTER (Looks like plain property assignment)
grad.enrollStudent = "Stud5"; // Output: Added new Student Name at front of list: Stud5
console.log(`Updated Count: ${grad.studentCount}`); // Output: 5

// 4. Try to add a 6th student (Triggers the guard clause inside your overridden setter)
grad.enrollStudent = "Stud6"; // Output: ❌ Rejection: reached max limit of adding students 5

*/
