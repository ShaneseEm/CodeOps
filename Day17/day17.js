// ================================
// DAY 17 - JavaScript Exercises
// ================================

// 1. Default parameter + arrow function

function vat(amount, rate = 0.15) {
  return amount * rate;
}

console.log("1. VAT:", vat(1000));

const vatArrow = (amount, rate = 0.15) => amount * rate;

console.log("VAT Arrow:", vatArrow(1000));


// 2. Closure

function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();

console.log("\n2. Counter:");
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());

// count stays private because it is declared inside makeCounter.
// Only the returned function can access it through the closure.


// 3. Discount factory

function discountBy(rate) {
  return function (price) {
    return price - price * rate;
  };
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log("\n3. Discounts:");
console.log("Member price:", memberPrice(1000), "ETB");
console.log("Sale price:", salePrice(1000), "ETB");


// 4. Higher-order function

function applyToAll(list, fn) {
  return list.map(fn);
}

const prices = [100, 200, 500, 1000];

const pricesWithVAT = applyToAll(prices, (price) => vat(price));

console.log("\n4. VAT prices:");
console.log(pricesWithVAT);


// 5. forEach callback

const cities = [
  "Addis Ababa",
  "Dire Dawa",
  "Bahir Dar",
  "Hawassa",
  "Mekelle"
];

console.log("\n5. Ethiopian Cities:");

cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});