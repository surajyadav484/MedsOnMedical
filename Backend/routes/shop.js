const express = require("express");
const shopController = require("../controller/shop");
const router = express.Router();
const UtilityMehtod = require("../utils/UtilityMethod");

// http://localhost:3000/addToCart
router.post("/addToCart", UtilityMehtod.verifyToken, shopController.addToCart);

// http://localhost:3000/getCart
router.get("/getCart", UtilityMehtod.verifyToken, shopController.getCart);

module.exports = router;
