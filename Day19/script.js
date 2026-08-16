// ========================================
// DAY 19 - DOM EXERCISES
// ========================================


// ========================================
// 1. textContent + classList.toggle
// ========================================

const title = document.querySelector("#title");

title.textContent = "Day 19 DOM Exercises";

title.classList.toggle("highlight");


// ========================================
// 2. createElement + append
// ========================================

const cities = [
    "Addis Ababa",
    "Bahir Dar",
    "Hawassa"
];

const cityList = document.querySelector("#city-list");

cities.forEach((city) => {
    const li = document.createElement("li");

    li.textContent = city;

    cityList.append(li);
});


// ========================================
// 3. Click event + bubbling
// ========================================

const buttonContainer = document.querySelector("#button-container");
const button = document.querySelector("#my-button");

button.addEventListener("click", (event) => {
    console.log("Button listener:");
    console.log(event.target);
});

buttonContainer.addEventListener("click", (event) => {
    console.log("Container listener:");
    console.log(event.target);
});


// ========================================
// 4. Event delegation for delete
// ========================================

const itemList = document.querySelector("#item-list");

itemList.addEventListener("click", (event) => {

    if (event.target.classList.contains("delete-btn")) {
        const item = event.target.parentElement;

        item.remove();
    }

});


// ========================================
// 5. Form submit
// ========================================

const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const formList = document.querySelector("#form-list");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const value = input.value.trim();

    if (value === "") {
        return;
    }

    const li = document.createElement("li");

    li.textContent = value;

    formList.append(li);

    input.value = "";

});