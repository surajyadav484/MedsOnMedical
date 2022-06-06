const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { body } = require("express-validator");
const validatorUtils = require("../utils/validator");
const verification = require("../utils/verifyToken");

router.get("/", verification.verifyToken, userController.getUser);

// http://localhost:3000/users/userRegistration
router.post(
  "/userRegistration",
  validatorUtils.registrationValidator(),
  userController.registerUser
);

// http://localhost:3000/users/login
router.post("/login", userController.loginUser);
module.exports = router;
