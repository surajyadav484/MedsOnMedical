const { body } = require("express-validator");

exports.registrationValidator = () => {
  return [
    body("firstName")
      .matches(/^[A-Za-z]+$/)
      .withMessage("Firstname must contain only alphabets"),
    body("lastName")
      .matches(/^[A-Za-z]+$/)
      .withMessage("Lastname must contain only alphabets"),
    body("email").isEmail().withMessage("Plese enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Should be min 8 character long")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
      .withMessage("Password should contain alphanumeric characters"),
    body("confirmPassowrd").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and Confirm Password must be same");
      }
      return true;
    }),
  ];
};
