const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const user = require("../models/user");
const User = require("../models/user");
const UtilityMehtod = require("../utils/UtilityMethod");

exports.addToCart = async (req, res, next) => {
  try {
    const { productId = "627f909df4bbdf5a5d5b1b66" } = req.body;
    const _id = UtilityMehtod.findUserIdFromToken(req);
    console.log(typeof _id);
    const user = await User.findById({ _id });

    const result = await user.addToCart(productId);
    console.log(result);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.json({ err: err.message });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const _id = UtilityMehtod.findUserIdFromToken(req);
    console.log(typeof _id);

    const user = await User.findById({ _id });
    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
