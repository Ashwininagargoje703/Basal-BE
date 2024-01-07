const ReviewModel = require("../model/product/review");

const addReview = async (req, res) => {
  try {
    let { ratings, message, name, email } = req.body;

    let review = await ReviewModel.findOne({ email, ratings });

    if (review) {
      return res.status(409).json({ msg: "already reviewed", status: 409 });
    }

    review = await ReviewModel.create({ ratings, message, name, email });

    res.json({ review, status: 201 });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

const getReview = async (req, res) => {
  try {
    let { email } = req.params;

    let review = await ReviewModel.findOne({ email });

    if (!review) {
      return res.status(404).json({ msg: "no review found", status: 404 });
    }

    res.json({ review, status: 200 });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

const editReview = async (req, res) => {
  try {
    let { email, ratings, message } = req.body;

    let review = await ReviewModel.findOne({ email });

    if (!review) {
      return res.status(404).json({ msg: "no review found", status: 404 });
    }

    review = {
      ...review._doc,
      ratings,
      message,
    };
    review = await ReviewModel.findOneAndUpdate({ email }, review);
    res.json({ review, status: 200 });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

module.exports = { addReview, getReview, editReview };
