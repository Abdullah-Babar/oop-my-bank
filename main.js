#! /usr/bin/env node
import inquirer from "inquirer";
// class of bank account
class BankAccount {
    accountNumber;
    balance;
    constructor(b, acc) {
        this.accountNumber = acc;
        this.balance = b;
    }
    // withdraw function
    withDraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance is $${this.balance}`);
        }
        else {
            console.log("Insufficient balance!");
        }
    }
    // deposit function
    deposit(amount) {
        if (amount >= 100) {
            amount -= 1; // $1 detucted if deposit amount more than $100
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance is $${this.balance}`);
        // else {
        //     amount += this.balance
        //     console.log(`Deposit of $${amount} successful. Remaining balance is $${this.balance}`);
        // }
    }
    // check balance function
    checkBalance() {
        console.log(`Your current balance is $${this.balance}`);
    }
}
class Customer {
    firstName;
    lastName;
    age;
    gender;
    account;
    constructor(fn, ln, a, g, acc) {
        this.firstName = fn;
        this.lastName = ln;
        this.age = a;
        this.gender = g;
        this.account = acc;
    }
}
// create array of bank accounts
const accounts = [
    new BankAccount(1000, 2021),
    new BankAccount(1500, 2022),
    new BankAccount(500, 2023)
];
// create array of customers
const customers = [
    new Customer("Abdullah", "Babar", 16, "Male", accounts[0]),
    new Customer("Hafiz", "Nabeel", 17, "Male", accounts[1]),
    new Customer("Maria", "Karim", 35, "Female", accounts[2]),
];
async function userInput() {
    do {
        const input = await inquirer.prompt({ message: "Enter Your Account Number", name: "accNumber", type: "number" });
        const customer = customers.find(customer => customer.account.accountNumber === input.accNumber);
        if (customer) {
            console.log(`\nWelcome ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt({
                name: 'select',
                type: "list",
                message: "Please select one of the following operation",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            });
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "deposit",
                        type: "number",
                        message: "Enter the amount to Deposit:"
                    });
                    customer.account.deposit(depositAmount.deposit);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "withDraw",
                        type: "number",
                        message: "Enter the amount to Withdraw:"
                    });
                    customer.account.withDraw(withdrawAmount.withDraw);
                    break;
                case "Check Balance":
                    {
                        customer.account.checkBalance();
                    }
                    break;
                case "Exit":
                    console.log("\nExiting bank program...\n");
                    console.log("Thanks for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
userInput();
