const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const postRoutes = require("./routes/post");

const mongoose = require('mongoose');

// For mongoDB Compass
// mongodb+srv://akash:fHM586W6Rgx63Ghi@cluster0.ojbqg.mongodb.net/test

mongoose
  .connect(
    "mongodb+srv://akash:fHM586W6Rgx63Ghi@cluster0.ojbqg.mongodb.net/post-and-comments-app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection to database successful");
  })
  .catch(() => {
    console.log("Error while connecting to database");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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

module.exports = app;
