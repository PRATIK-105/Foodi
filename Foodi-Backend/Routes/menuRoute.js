const express = require('express');
const menuController = require('../Controller/menuController');

const router = express.Router();

router.get('/', menuController.getMenu);
router.post('/', menuController.createMenu);

// delete a menu item
router.delete('/:id', menuController.deleteMenuItem);

// get single menu item
router.get('/:id', menuController.singleMenuItem);

// update single menu item
router.patch('/:id', menuController.updateMenuItem);

module.exports = router;
