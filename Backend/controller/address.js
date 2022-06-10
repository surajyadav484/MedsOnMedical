const UtilityMehtod = require("../utils/UtilityMethod");
const Address = require("../models/address");
const { default: mongoose } = require("mongoose");

exports.addUserAddress = async (req, res, next) => {
  try {
    const userId = UtilityMehtod.findUserIdFromToken(req);
    const {
      address1,
      address2 = "",
      city,
      state,
      zipCode,
      contactNumber,
    } = req.body;
    let userAddress;

    address2.length >= 1
      ? (userAddress = new Address({
          address1,
          address2,
          city,
          state,
          zipCode,
          contactNumber,
          userId,
        }))
      : (userAddress = new Address({
          address1,
          city,
          state,
          zipCode,
          contactNumber,
          userId,
        }));

    const result = await userAddress.save();
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
