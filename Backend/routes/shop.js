const express = require("express");
const shopController = require("../controller/shop");
const router = express.Router();

// http://localhost:3000/addToCart
router.get("/addToCart", shopController.addToCart);

module.exports = router;
