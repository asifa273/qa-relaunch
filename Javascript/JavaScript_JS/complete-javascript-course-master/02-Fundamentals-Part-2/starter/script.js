    //Below is Fundatmentals of Functions in JavaScript


function logger(){
    console.log("My name is Asifa");
}

logger(); // Calling / Running / Invoking the function

// Function Declaration
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Asifa"));

function canputanywordhere(){
    console.log("This function can have anything as its name");

}
canputanywordhere();

function fruitsbox(countofapples, countoforanges, countofpears){
    console.log(countofapples, countoforanges, countofpears);
    const fruits = `I have ${countofapples} apples, ${countoforanges} oranges and ${countofpears} pears.`;
    return fruits;
}
const fruitssummary = fruitsbox(5, 10, 15);
console.log(fruitssummary);

const addanotherfunction = fruitsbox(20, 30, 40);
console.log(addanotherfunction);    


// Function Expression
function agecalculator(birthYear){
    const age = 2026 - birthYear;
    return age;
}

const age = agecalculator(1987);
console.log(age);