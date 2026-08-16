# TeleBirr Loyalty Points Module

A JavaScript loyalty-points module for a TeleBirr shop.

## Features

- Earn loyalty points from ETB spending.
- Redeem points.
- Check the current balance.
- Keep the points balance private using a closure.
- Use different earning rules without changing the module.
- Support multiple independent loyalty cards.

## Default Earn Rule

The default rule gives:

1 point for every 10 ETB spent.

For example:

100 ETB = 10 points

250 ETB = 25 points

## Private Balance

The points balance is stored inside the `createLoyaltyCard()` function:

```js
function createLoyaltyCard() {
  let points = 0;
}