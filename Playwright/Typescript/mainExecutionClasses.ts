// Import the BankAccount class so this file can create a regular bank account.
import { BankAccount, SavingsAccount } from './classesoops.js';


// Create a bank account with an opening balance of 500.
const myAcc = new BankAccount(500);

// Deposit 200 into the account, increasing the balance to 700.
myAcc.deposit(1000);
// Attempt to withdraw 1000; the withdrawal is rejected because the balance is too small.
myAcc.withdraw(1000);
// Withdraw 50 from the account, reducing the balance to 650.
myAcc.withdraw(50);

// Read and print the account's final balance.
console.log("FinalBalance:", myAcc.getBalance());


// Create a savings account with 1000 as the opening balance and 5% interest.

// Tier 1: Basic Savings Account (Limit: $200)
const basicSavings = new SavingsAccount(1000, 0.02, 200);
basicSavings.withdraw(300);
// Output: ❌ Rejection: Cannot withdraw more than $200 from this Savings Account.

// Tier 2: Premium Savings Account (Limit: $5000)
const premiumSavings = new SavingsAccount(50000, 0.05, 5000);
premiumSavings.withdraw(3000);
// Output: withdrawal $3000
