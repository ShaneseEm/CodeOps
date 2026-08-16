// demo.js

const {
  createLoyaltyCard,
  normalEarnRule,
} = require("./loyaltyPoints");

// Create a normal TeleBirr loyalty card
const card = createLoyaltyCard(normalEarnRule);

console.log("=== Normal Loyalty Card ===");

console.log("Earned:", card.earn(100), "points");
console.log("Earned:", card.earn(250), "points");

console.log("Current balance:", card.balance());

console.log("Redeem 15 points:", card.redeem(15));
console.log("Current balance:", card.balance());

console.log("Redeem 100 points:", card.redeem(100));
console.log("Current balance:", card.balance());


// Holiday rule: double the normal points
const holidayEarnRule = (amount) => {
  return Math.floor(amount / 10) * 2;
};


// Create a new card using the holiday rule
const holidayCard = createLoyaltyCard(holidayEarnRule);

console.log("\n=== Holiday Loyalty Card ===");

console.log("Earned:", holidayCard.earn(100), "points");
console.log("Earned:", holidayCard.earn(250), "points");

console.log("Holiday balance:", holidayCard.balance());


// Demonstrate that each card has independent private state
console.log("\n=== Independent Balances ===");

console.log("Normal card:", card.balance());
console.log("Holiday card:", holidayCard.balance());


// Try to redeem more than the available balance
console.log("\n=== Prevent Negative Balance ===");

console.log("Redeem 1000 points:", card.redeem(1000));
console.log("Balance after failed redemption:", card.balance());