const express = require('express');

const userController = require('../Controller/userController');
const authController = require('../Controller/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/jwt', authController.createToken);

// router.get(
//   '/',
//   authController.protect,
//   authController.verifyAdmin,
//   userController.getAllUser
// );
router.get('/', userController.getAllUser);

router.post('/', userController.createUser);
router.delete(
  '/:id',
  authController.protect,
  authController.verifyAdmin,
  userController.deleteUser
);
router.get('/admin/:email', authController.protect, userController.getAdmin);
router.patch(
  '/admin/:id',
  authController.protect,
  authController.verifyAdmin,
  userController.makeAdmin
);

module.exports = router;
