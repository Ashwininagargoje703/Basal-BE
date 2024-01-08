const express = require("express");
const {
  addReview,
  editReview,
  getReview,
} = require("../controller/reviewController");
const auth = require("../middleware/authMiddleware");

const app = express.Router();

app.use(auth);

app.post("/add-review", addReview);
app.post("/edit-review", editReview);
app.get("/get-review/:email", getReview);

module.exports = app;
