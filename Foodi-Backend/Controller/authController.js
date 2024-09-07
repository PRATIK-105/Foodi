const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../Models/userModel');

exports.createToken = async (req, res) => {
  const user = req.body;
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.send({ token });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // console.log('token = ', token);
    res.status(200).json({
      status: 'Success',
      token,
      data: {
        user: newUser,
      },
      message: 'User Created Successfully',
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log('pass : ', req.body.password);
  // console.log(req.body.email);

  try {
    if (!email || !password) {
      return res.status(404).json({
        status: 'Error',
        message: 'Please provide email and password',
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: 'Error',
        message: 'Incorrect email or password',
      });
    }

    // Since you're not storing passwords, we'll skip password verification.

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    console.log(token);
    res.status(200).json({
      status: 'Success',
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }

  try {
    // Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Optional: Attach user data to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

exports.verifyAdmin = async (req, res, next) => {
  try {
    // Access email from req.user, not req.decoded
    const email = req.user.email;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user's role is admin
    const isAdmin = user?.role === 'admin';

    if (!isAdmin) {
      return res.status(403).json({
        status: 'Error',
        message: 'Forbidden Access',
      });
    }

    next(); // User is an admin, proceed to the next middleware
  } catch (err) {
    return res.status(401).json({
      status: 'Error',
      message: 'Invalid Token',
    });
  }
};
