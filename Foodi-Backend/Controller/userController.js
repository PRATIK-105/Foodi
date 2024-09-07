const mongoose = require('mongoose');
const User = require('../Models/userModel');

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(201).json({
      status: 'Success',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const oldUser = await User.findOne(query);
    if (oldUser) {
      return res.status(302).json({
        status: 'Error',
        message: 'User Already Existed !',
      });
    }
    const newUser = await User.create(user);

    res.status(201).json({
      status: 'Success',
      data: newUser,
      message: 'User Created Successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({
        status: 'Error',
        message: 'User Not Found',
      });
    }
    res.status(201).json({
      status: 'Success',
      data: deleteUser,
      message: 'User Deleted Successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.getAdmin = async (req, res) => {
  const email = req.params.email;

  try {
    // Access email from req.user, not req.decoded
    const user = await User.findOne({ email: req.user.email });

    if (email !== req.user.email) {
      return res.status(403).json({
        status: 'Error',
        message: 'Forbidden Access',
      });
    }

    let admin = false;

    if (user) {
      admin = user.role === 'admin';
    }

    res.status(200).json({
      status: 'Success',
      data: admin,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

// make admin to user

exports.makeAdmin = async (req, res) => {
  const userId = req.params.id;
  // const {name , email, photoURL , role} = req.body;
  try {
    const updateduser = await User.findByIdAndUpdate(
      userId,
      { role: 'admin' },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'Success',
      data: updateduser,
    });

    if (!updateduser) {
      return res.status(404).json({
        status: 'Error',
        message: 'User Not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};
