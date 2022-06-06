const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const transporter = require("../utils/mail");
const otp = require("../utils/otpGenerator");
const { json } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { logger } = require("../utils/mail");

const OTP = otp.otpeGenerator();
//console.log(crypto.randomBytes(32).toString("hex"));
exports.getUser = (req, res, next) => {
  res.json({
    name: "Suraj",
    email: "sky@123",
    otp: otp.otpeGenerator(),
  });
};

exports.registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0]);
      return res.status(400).json({ err: errors.array()[0].msg });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exist. Please try with other email!");
    }

    //write email verification code
    // const mailOptions = {
    //   from: process.env.OWNER_EMAIL,
    //   to: email,
    //   subject: "Verify Email",
    //   html: `<b>Dear ${firstName}</b>, <br>

    //   Your OTP for email verification process is: ${OTP}.

    //   <b>Note: </b> Please do not share your OTP with others.<br>
    //   Thanks.
    //   `,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log("error", error);
    //   } else {
    //     console.log("Email verifcatio" + info.response);
    //   }
    // });

    const hashedPassword = await bcrypt.hash(password, 12);
    if (hashedPassword) {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      const result = await user.save();
      if (result) {
        return res.status(200).json(result);
      }
    }
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Please provide a valid email address and password");
    }
    const isLoggedIn = await bcrypt.compare(password, user.password);
    if (isLoggedIn) {
      console.log(isLoggedIn);
      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY);
      res.json({ token });
    } else {
      res
        .status(200)
        .json({ msg: "Please provide a valid email address and password" });
    }
  } catch (err) {
    res.status(403).json({ err: err });
  }
};
