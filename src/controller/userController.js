const UserModel = require("../model/user/userModel");

const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ msg: "already registered, please login!", status: 409 });
    }

    user = await UserModel.create({ name, email, password });

    res.json({ status: 201, user });
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

    if (user.password !== password) {
      return res.status(400).json({ msg: "incorrect password!", status: 400 });
    }

    res.json({ user, status: 200 });
  } catch (e) {
    res
      .status(500)
      .json({ status: 500, msg: "something went wrong", err: e.message });
  }
};

module.exports = { login, register };
