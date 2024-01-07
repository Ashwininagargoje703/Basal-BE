const express = require("express");
const {
  addReview,
  editReview,
  getReview,
} = require("../controller/reviewController");

const app = express.Router();

app.post("/add-review", addReview);
app.post("/edit-review", editReview);
app.get("/get-review/:email", getReview);

module.exports = app;
