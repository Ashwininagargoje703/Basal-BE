const { connect } = require("mongoose");

const connection = () => {
  return connect(
    `mongodb+srv://ashwini1234:ashwini1234@cluster0.seroub9.mongodb.net/traya_review_system`
  );
};

module.exports = connection;
