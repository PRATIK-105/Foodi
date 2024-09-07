const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  _id: String,

  name: {
    type: String,
    required: [true, 'Food Item must Have name'],
    maxlength: [30, 'A food item name should have less than 30 characters '],
  },

  recipe: {
    type: String,
    required: [true, 'Food Item must Have recipe'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Food item must have image'],
  },
  category: {
    type: String,
    required: [true, 'Food itm must have category'],
  },
  price: {
    type: Number,
    required: [true, 'Food item must have price'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
