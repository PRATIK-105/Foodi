const mongoose = require('mongoose');
const Cart = require('../Models/cartModel');

exports.addToCart = async (req, res) => {
  try {
    const oldItem = await Cart.findOne({ menuId: req.body.menuId });
    if (oldItem) {
     return res.status(400).json({
        status: 'Error',
        message: 'Item Already Exists',
      });
    }

    const newItem = await Cart.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: newItem,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Cart.find(query).exec();

    res.status(201).json({
      status: 'Success',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};
exports.deleteCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Cart.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        status: 'Error',
        message: 'Item Not found',
      });
    }

    res.status(200).json({
      status: 'Success',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.getSingleItem = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Cart.findOne({ menuId: id });
    res.status(200).json({
      status: 'Success',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const updatedItem = await Cart.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        status: 'Error',
        message: 'Item not found',
      });
    }

    res.status(200).json({
      status: 'Success',
      data: updatedItem,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};
