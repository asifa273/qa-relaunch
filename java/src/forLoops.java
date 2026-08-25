void main() {
    // This line uses the ternary operator: (condition) ? (value if true) : (value if false)
    // If isPrime(0) returns true, it returns "" (empty string), so it prints "0 is  a prime number"
    // If isPrime(0) returns false, it returns "not", so it prints "0 is not a prime number"
    System.out.println("0 is " + ((isPrime(0) ? "" : "not")) + " a prime number");
    System.out.println("1 is " + ((isPrime(1) ? "" : "not")) + " a prime number");
    System.out.println("2 is " + ((isPrime(2) ? "" : "not")) + " a prime number");
    System.out.println("3 is " + ((isPrime(3) ? "" : "not")) + " a prime number");
    System.out.println("4 is " + ((isPrime(4) ? "" : "not")) + " a prime number");
    System.out.println("17 is " + ((isPrime(17) ? "" : "not")) + " a prime number");
    System.out.println("49 is " + ((isPrime(49) ? "" : "not")) + " a prime number");
    System.out.println("59 is " + ((isPrime(59) ? "" : "not")) + " a prime number");
    System.out.println("61 is " + ((isPrime(61) ? "" : "not")) + " a prime number");
    System.out.println("97 is " + ((isPrime(97) ? "" : "not")) + " a prime number");

    int count = 0;
    for (int i = 10; i <= 50; i++) {
        if (isPrime(i)) {
            System.out.println("number: " + i + " is prime number");
            count++;
        }

    }System.out.println("Total prime numbers are : " + count);
}

//1. Check if a number is prime
// numbers must be greater than 1.
//If the number is 1, 0, or negative, it immediately returns false.
boolean isPrime(int wholeNumber) {
    if (wholeNumber <= 1) {
        return false;
    }
    //2. Loop through potential divisors
    //The loop starts checking from 2 (the first prime number).
    //It stops at wholeNumber / 2.
    //Why? Because no number can be evenly divided by anything larger than half of itself (except for the number itself).
    // This makes the code run faster.
    for (int divisor = 2; divisor <= wholeNumber / 2; divisor++) {
        if (wholeNumber % divisor == 0) {
            return false;
        }
    }

    return true;
  //If the loop finishes without finding any divisors, it means the number is only divisible by 1 and itself.
    //Therefore, it is a prime number, and the method returns true.
}
