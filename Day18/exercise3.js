const customer = {
    name: "Bethelhem",
    city: "Addis Ababa",
    balance: 1500
};

const { name, city } = customer;

console.log("Name:", name);
console.log("City:", city);

function greet({ name }) {
    return `Selam ${name}!`;
}

console.log(greet(customer));