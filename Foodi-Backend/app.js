const express = require('express');
const app = express();
const cors = require('cors');
const menuRouter = require('./Routes/menuRoute');
const cartRouter = require('./Routes/cartRoute');
const userRouter = require('./Routes/userRoute');
const jwt = require('jsonwebtoken');

//require error handleing files

//middleware
app.use(cors());

// Body Parser : Use to get access of request body
app.use(express.json());

//verify token
// app.post('/api/v1/jwt', async (req, res) => {
//   const user = req.body;
//   const token = jwt.sign({ user }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
//   res.send({ token });
// });

// routes
app.use('/api/v1/menus', menuRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/users', userRouter);

//global error handler
// if we hit route which is not there

module.exports = app;
