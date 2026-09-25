// This file demonstrates TypeScript classes with practical interview-style examples.
// The first example tracks items in a shopping cart and calculates the total price.
// The second example models bank accounts, transactions, and account inheritance.
// CommonJS export removed; this file does not require Node's `module` type.

// Define the shape of one item that can be added to the shopping cart.
export interface Item {
    // Store the product's display name.
    name: string;
    // Store the product's price as a number.
    price: number;
}

// Define the blueprint for a shopping cart.
export class ShoppingCart {
    // Keep cart items private so callers must use the class methods to change them.
    private items: Item[];

    // Create an empty cart when a ShoppingCart object is constructed.
    constructor() {
        this.items = [];
    }

    // Add one item to the cart and return nothing.
    public addItem(item: Item): void {
        // Append the supplied item to the private items array.
        this.items.push(item);
        // Tell the user which item was added.
        console.log(`Added: ${item.name}`);
    }

    // Calculate and return the combined price of every item in the cart.
    public calculateTotal(): number {
        // Start at zero and add each item's price to the running total.
        return this.items.reduce((total, item) => total + item.price, 0);
    }

}

// Create a new shopping cart object.
const userCart = new ShoppingCart();

// Add a laptop priced at 1200 to the cart.
userCart.addItem({ name: "laptop", price: 1200 });
// Add a phone priced at 100 to the cart.
userCart.addItem({ name: "phone", price: 100 });

// Calculate and print the cart's total bill.
console.log("Total Bill: $", userCart.calculateTotal());


//Design Bank Account System long hand way

// export interface Transaction {
//     type: 'DEPOSIT' | 'WITHDRAWAL';
//     amount: number;
// }

//define blueprint how it looks like
// class BankAcc {
//     private balance: number;
//     private transactionHistory: Transaction[];

//     constructor(initialDeposit: number) {
//         this.balance = initialDeposit;
//         this.transactionHistory = [
//             { type: 'DEPOSIT', amount: initialDeposit }
//         ];
//     }


//Design Bank Account System shorthand constructors(parameter properties) way

interface Transaction {
    // Identify whether money was deposited or withdrawn.
    type: 'DEPOSIT' | 'WITHDRAWAL';
    // Store the amount involved in the transaction.
    amount: number;
}

// Define a bank account that protects its state and records transactions.
export class BankAccount {
    // Keep the transaction history private so it cannot be changed externally.
    private transHistory: Transaction[];

    // Accept the starting balance through a parameter property.
    constructor(private balance: number) {
        // Record the initial balance as the first deposit transaction.
        this.transHistory = [{
            type: 'DEPOSIT', amount: balance
        }
        ];
    }

    // Add money to the account.
    public deposit(amount: number): void {
        // Reject zero or negative deposits because deposits must increase the balance.
        if (amount <= 0) {
            // Explain why the invalid deposit was rejected.
            console.log("Error: deposit must be positive")
            // Stop before changing the balance or transaction history.
            return;
        }
        // Increase the current balance by the deposited amount.
        this.balance += amount;
        // Record the successful deposit in the transaction history.
        this.transHistory.push({ type: 'DEPOSIT', amount });
        // Report the successful deposit.
        console.log(`deposited $${amount}`);
    }

    // Remove money from the account.
    public withdraw(amount: number): void {
        // Reject a withdrawal that is larger than the available balance.
        if (amount > this.balance) {
            // Explain why the withdrawal was rejected.
            console.log(`Transaction Rejection for $${amount} due to insufficient balance`);
            // Stop before changing the balance or transaction history.
            return;
        }
        // Reduce the current balance by the withdrawal amount.
        this.balance -= amount;
        // Record the successful withdrawal in the transaction history.
        this.transHistory.push({ type: 'WITHDRAWAL', amount });
        // Report the successful withdrawal.
        console.log(`withdrawal $${amount}`);
    }

    // Return the account's current balance without changing it.
    public getBalance(): number {
        // Expose the balance through a controlled public method.
        return this.balance
    }
}

// Extend BankAccount so a savings account reuses its balance behavior.
export class SavingsAccount extends BankAccount {
    // BankAccount is the "Parent" or "Superclass"
    // SavingsAccount is the "Child" or "Subclass"


    // Accept the opening deposit and the interest rate for this savings account.
    // 1. Add a brand new property unique to savings accounts
    constructor(
        initialDeposit: number,
        private interestRate: number,
        private maxWithdrawLimit: number
    ) {
        // Initialize the inherited BankAccount balance and transaction history.
        super(initialDeposit);
        // 2. super() calls the parent constructor to initialize 'balance'
    }

    // Calculate and add interest based on the current balance.
    // 3. Add a brand new behavior unique to savings accounts
    public addInterest(): void {
        // Multiply the current balance by the configured interest rate.
        // We use getBalance() because 'balance' is private in the parent class
        const interestEarned = this.getBalance() * this.interestRate;
        // Deposit the earned interest so it updates the balance and history.
        this.deposit(interestEarned);
        // Report the amount of interest that was added.
        console.log(`Interest Added: $${interestEarned}`)

    }
    public override withdraw(amount: number): void {
        if (amount > this.maxWithdrawLimit) {
            console.log(`rejection: cannot withdraw more than maxWithdrawLimit from savings account`);
            return;
        }

        super.withdraw(amount);

    }

}





