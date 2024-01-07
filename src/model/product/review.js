const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  ratings: { type: Number },
  message: { type: String },
});

const ReviewModel = model("review", reviewSchema);

module.exports = ReviewModel;
