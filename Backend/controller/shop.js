const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const user = require("../models/user");
const User = require("../models/user");

exports.addToCart = async (req, res, next) => {
  try {
    const { productId = "627f909df4bbdf5a5d5b1b66" } = req.body;
    const bearerToken = req.headers["authorization"];
    const token = bearerToken && bearerToken.split(" ")[1];

    const payload = jwtDecode(token);
    const {
      user: { _id },
    } = payload;
    const user = await User.findById({ _id });

    const result = await user.addToCart(productId);
    console.log(result);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.json({ err: err.message });
  }
};
