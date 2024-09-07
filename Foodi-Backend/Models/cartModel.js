const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    menuId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required : [true,'Item must Have a Unique id']
    },
    name: {
        type: String,
        required: [true, 'Food Item Must Have a name']
    },
    image: {
        type: String,
        required: [true, 'Food Item Must Have an Image']
    },
    quantity: {
        type: Number,
        default: 1
    },
    recipe: String,
    price: {
        type: Number,
        required: [true, 'Food Item Must Have a price']
    },
    email: {
        type: String,
        required: true,
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
