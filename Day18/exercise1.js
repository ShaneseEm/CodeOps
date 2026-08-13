const prices = [250, 600, 180, 900, 750];

const pricesWithVat = prices.map(price => price * 1.15);

const under1000 = pricesWithVat.filter(price => price < 1000);

const grandTotal = under1000.reduce((total, price) => total + price, 0);

console.log("Original prices:", prices);
console.log("Prices with 15% VAT:", pricesWithVat);
console.log("Prices under 1000 ETB:", under1000);
console.log("Grand total:", grandTotal, "ETB");