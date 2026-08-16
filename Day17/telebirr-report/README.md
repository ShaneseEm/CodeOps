# TeleBirr Transaction Report

A small JavaScript transaction report generator for a TeleBirr shop in Addis Ababa.

The project demonstrates:

- filter
- map
- reduce
- destructuring
- spread syntax
- template literals
- JavaScript modules

## Project Structure

### transactions.js

This module contains the transaction data.

Each transaction has:

- id
- customer
- amount
- type

It exports the transactions array.

### report.js

This module contains the report logic.

It provides functions to:

- separate credit transactions
- separate debit transactions
- calculate transaction totals
- create formatted receipt strings

The functions use filter, reduce and map.

### app.js

This is the main application file.

It:

1. Imports the transactions.
2. Imports the report functions.
3. Separates credits and debits.
4. Calculates totals.
5. Creates receipt strings.
6. Demonstrates the spread operator.
7. Prints the final report.

## Array Methods

### filter

filter is used to separate credits from debits.

```js
transactions.filter(({ type }) => type === "credit");