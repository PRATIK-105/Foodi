const express = require('express');

const cartController = require('../Controller/cartController');
const authController = require('../Controller/authController');

const router = express.Router();

router.get('/', authController.protect, cartController.getCartItems);
router.post('/', cartController.addToCart);

router.delete('/:id', cartController.deleteCartItem);
router.get('/:id', cartController.getSingleItem);
router.put('/:id', cartController.updateCartItem);

module.exports = router;
