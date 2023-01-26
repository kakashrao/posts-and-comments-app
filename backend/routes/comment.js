const express = require('express');
const app = express();
const router = express.Router();

const Comment = require("../models/comment");

const { checkAuth } = require("../middlewares/check-auth");

// app.use(express.json);

router.post('/', checkAuth, (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
