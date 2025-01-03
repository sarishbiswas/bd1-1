const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

// Server-side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  res.send(
    (
      parseFloat(req.query.newItemPrice) + parseFloat(req.query.cartTotal)
    ).toString()
  );
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  if (isMember === 'true') {
    cartTotal = cartTotal - cartTotal / 10;
  }
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = (cartTotal * 5) / 100;
  res.send(result.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  if (shippingMethod === 'Standard') {
    res.send((distance / 50).toString());
  } else {
    res.send((distance / 100).toString());
  }
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send((distance * weight * 0.1).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send((purchaseAmount * loyaltyRate).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
