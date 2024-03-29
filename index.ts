#! /usr/bin/env node

import inquirer from "inquirer";

let userBalance = 200000;
let myPin = 9876;

// PinCode Verification
let pinCode = await inquirer.prompt(
    {
        name: "code",
        type: "number",
        message: "Enter your account PIN Code."
    });

if (pinCode.code === myPin) {
    console.log("Login Successfully. \nGreetings! You've entered your account.");

    let atmServices = await inquirer.prompt(
        {
            name: "action",
            message: "Select an option",
            type: "list",
            choices: ["CheckBalance", "Deposit", "Withdraw", "FastCashout"]
        }
    );

    // Checking User Balance
    if (atmServices.action === "CheckBalance") {
        console.log(`Your Current balance is: ${userBalance}`);
    }

    // ATM Deposit Services
    else if (atmServices.action === "Deposit") {
        let depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Please specify the amount you'd like to deposit?"
        });

        userBalance += depositAmount.amount;
        console.log("Transaction completed successfully!");
        console.log(`Your Updated Balance is: ${userBalance}`);
    }

    // ATM Withdraw Services
    else if (atmServices.action === "Withdraw") {
        let withDrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Please specify the withdrawal amount you'd like to request?"
        });

        if (withDrawAmount.amount <= userBalance) {
            userBalance -= withDrawAmount.amount;
            console.log("Transaction completed successfully!");
            console.log(`Your Remaining Amount is: ${userBalance}`);
        } else {
            console.log("Apologies, the transaction cannot proceed at this time. Insufficient funds.");
            console.log(`Your current balance stands at: ${userBalance}`);
        }
    }
    
    // Fast Cash Out Services
    else if (atmServices.action === "FastCashout") {
        let cashAmount = await inquirer.prompt({
            name: "cash",
            type: "list",
            message: "Choose your Amount!",
            choices: ["10000", "40000", "60000", "70000", "80000"]
        });

        if (cashAmount.cash <= userBalance) {
            userBalance -= cashAmount.cash;
            console.log("Transaction completed successfully!");
            console.log(`Your Remaining Amount is: ${userBalance}`);
        } else {
            console.log("Apologies, the transaction cannot proceed at this time. Insufficient funds.");
            console.log(`Your current balance stands at: ${userBalance}`);
        }
    }
} else {
    console.log("Invalid PIN entered! Please attempt again.");
}
