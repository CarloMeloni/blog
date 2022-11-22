const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Nome richiesto."),
  check("email")
    .isEmail()
    .withMessage("Deve essere un indirizzo e-mail valido."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("La password deve avere almeno 6 caratteri."),
];

exports.userSigninValidator = [
  check("email")
    .isEmail()
    .withMessage("Deve essere un indirizzo e-mail valido."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("La password deve avere almeno 6 caratteri."),
];

exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Deve essere un indirizzo e-mail valido."),
];

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("La password deve avere almeno 6 caratteri.")
];