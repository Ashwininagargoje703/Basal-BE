const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user/userModel");
require("dotenv").config();

const saltRounds = 10;

const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ msg: "already registered, please login!", status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("hashedpasswrod", hashedPassword);

    user = await UserModel.create({ name, email, password: hashedPassword });

    res.json({ status: 201, msg: "created" });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "user not found", status: 404 });
    }

    let comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      return res.status(400).json({ msg: "incorrect password!", status: 400 });
    }

    user = {
      _id: user._id.toHexString(),
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "7d" });

    res.json({ user, token, status: 200 });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

module.exports = { login, register };
