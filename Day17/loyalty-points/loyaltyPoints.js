// loyaltyPoints.js

function calculatePoints(amount, earnRule) {
  return earnRule(amount);
}

const normalEarnRule = (amount) => Math.floor(amount / 10);

function createLoyaltyCard(earnRule = normalEarnRule) {
  let points = 0;

  function earn(amount) {
    const earnedPoints = calculatePoints(amount, earnRule);
    points += earnedPoints;
    return earnedPoints;
  }

  function redeem(amount) {
    if (amount > points) {
      return false;
    }

    points -= amount;
    return true;
  }

  function balance() {
    return points;
  }

  return {
    earn,
    redeem,
    balance,
  };
}

module.exports = {
  createLoyaltyCard,
  calculatePoints,
  normalEarnRule,
};