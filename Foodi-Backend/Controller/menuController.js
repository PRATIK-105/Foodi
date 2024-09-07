const mongoose = require('mongoose');
const Menu = require('../Models/menuModel');

exports.getMenu = async (req, res) => {
  try {
    const result = await Menu.find();
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const newMenu = await Menu.create(req.body);

    res.status(201).json({
      status: 'sucess',
      data: {
        menu: newMenu,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteMenuItem = async (req, res) => {
  const menuId = req.params.id;
  // console.log(menuId)
  try {
    const deletedItem = await Menu.findByIdAndDelete(menuId);

    // console.log(deletedItem);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.status(200).json({ message: 'Menu Item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.singleMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await Menu.findById(menuId);
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  const { name, recipe, image, category, price } = req.body;
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { name, recipe, image, category, price },
      { new: true, runValidator: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
