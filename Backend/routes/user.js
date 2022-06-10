const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { body } = require("express-validator");
const validatorUtils = require("../utils/validator");
const UtilityMehtod = require("../utils/UtilityMethod");

// http://localhost:3000/users/
router.get("/", UtilityMehtod.verifyToken, userController.getUser);

// http://localhost:3000/users/userRegistration
router.post(
  "/userRegistration",
  validatorUtils.registrationValidator(),
  userController.registerUser
);

// http://localhost:3000/users/login
router.post("/login", userController.loginUser);

module.exports = router;
