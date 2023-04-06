const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

router.post('/cart/add', async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex !== -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    // If the product is not in the cart, add it as a new item
    cart.items.push({ product: productId, quantity });
  }

  // Save the updated cart to the database
  await cart.save();

  res.redirect('/cart');
});

module.exports = router;
