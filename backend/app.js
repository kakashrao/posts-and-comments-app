if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");

const mongoose = require('mongoose');

// For mongoDB Compass
// mongodb+srv://akash:fHM586W6Rgx63Ghi@cluster0.ojbqg.mongodb.net/test

mongoose
  .connect(
    `${process.env.MONGO_DB_URI}/post-and-comments-app?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connection to database successful");
  })
  .catch(() => {
    console.log("Error while connecting to database");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )
  next();
})

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);

module.exports = app;
