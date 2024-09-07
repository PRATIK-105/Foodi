const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");



//error uncaught errors

//connect to mongo DB

// const DB = process.env.DB_ATLAS;
const DB = process.env.DB_LOCAL;


mongoose
  .connect(DB , {family: 4,})
  .then(() => {
    console.log("Database Connection is Successfull..✌️");
  })
  .catch((err) => {
    console.log("Error Occurred..", err);
  });

const port = 3001;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

//handeling unhandeled rejections
