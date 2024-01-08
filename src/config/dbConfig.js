const { connect } = require("mongoose");
require("dotenv").config();

const connection = () => {
  return connect(process.env.MONGO_URI);
};

module.exports = connection;
