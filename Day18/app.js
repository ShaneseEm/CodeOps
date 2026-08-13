import { addVat, VAT } from "./money.js";

const price = 500;

console.log("VAT rate:", VAT);
console.log("Original price:", price, "ETB");
console.log("Price with VAT:", addVat(price), "ETB");