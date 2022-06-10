const express = require("express");
const { verifyToken } = require("../utils/UtilityMethod");
const router = express.Router();
const AddressController = require("../controller/address");

// http://localhost:3000/users/addUserAddress
router.post("/addUserAddress", verifyToken, AddressController.addUserAddress);

module.exports = router;
