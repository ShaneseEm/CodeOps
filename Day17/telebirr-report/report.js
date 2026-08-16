// report.js

// Separate credit transactions
function getCredits(transactions) {
  return transactions.filter(({ type }) => type === "credit");
}

// Separate debit transactions
function getDebits(transactions) {
  return transactions.filter(({ type }) => type === "debit");
}

// Calculate total amount
function getTotal(transactions) {
  return transactions.reduce(
    (total, { amount }) => total + amount,
    0
  );
}

// Create formatted receipt strings
function createReceipts(transactions) {
  return transactions.map(
    ({ customer, amount }) => `${customer} - ${amount} ETB`
  );
}

module.exports = {
  getCredits,
  getDebits,
  getTotal,
  createReceipts,
};