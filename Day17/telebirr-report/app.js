// app.js

const transactions = require("./transactions");

const {
  getCredits,
  getDebits,
  getTotal,
  createReceipts,
} = require("./report");


// Separate credits and debits
const credits = getCredits(transactions);
const debits = getDebits(transactions);


// Calculate totals
const totalCredits = getTotal(credits);
const totalDebits = getTotal(debits);


// Create formatted receipts
const receipts = createReceipts(transactions);


// Spread operator:
// Create a new transaction with a corrected amount
const originalTransaction = transactions[0];

const updatedTransaction = {
  ...originalTransaction,
  amount: 600,
};


// Print report
console.log("=================================");
console.log("     TELEBIRR TRANSACTION REPORT");
console.log("=================================");

console.log("\nCredits:");
console.log(credits);

console.log("\nDebits:");
console.log(debits);

console.log("\nTotal Credits:", totalCredits, "ETB");
console.log("Total Debits:", totalDebits, "ETB");

console.log("\nReceipts:");

receipts.forEach((receipt) => {
  console.log(receipt);
});

console.log("\nOriginal Transaction:");
console.log(originalTransaction);

console.log("\nUpdated Transaction:");
console.log(updatedTransaction);

console.log("\nOriginal unchanged:", originalTransaction.amount);