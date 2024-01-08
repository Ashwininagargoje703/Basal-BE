const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    let isAuth = jwt.verify(JSON.parse(token), process.env.SECRET_KEY);

    if (isAuth) {
      return next();
    }

    return res.status(401).json({ msg: "bad request", status: 401 });
  } catch (e) {
    console.log("something went wrong with token", e.message);
    return res.status(500).json({ msg: "Something went wrong", status: 500 });
  }
}

module.exports = auth;
