public class PrimeCounter {

    // ✅ You also need this helper method — isPrime() must be defined!
    static boolean isPrime(int n) { // Check if n is a prime number
        if (n < 2) return false; // 0 and 1 are not prime numbers
        for (int j = 2; j <= Math.sqrt(n); j++) { // Check for factors from 2 to the square root of n
            if (n % j == 0) return false; // If n is divisible by any number other than 1 and itself, it's not prime
        }
        return true;
    }

    public static void main(String[] args) {
        int count = 0;

        for (int i = 1; i <= 50; i++) {
            if (isPrime(i)) {
                System.out.println("number: " + i + " is prime number");
                count++;
            }
        }  // ✅ for loop closes here

        System.out.println("Total prime numbers: " + count);
    }
}