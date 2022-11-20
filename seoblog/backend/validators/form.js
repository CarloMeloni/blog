const { check } = require("express-validator");

exports.contactFormValidator = [
  check("name").not().isEmpty().withMessage("Nome richiesto."),
  check("email")
    .isEmail()
    .withMessage("Deve essere un indirizzo email valido."),
  check("message")
    .not()
    .isEmpty()
    .isLength({ min: "20" })
    .withMessage("Il messaggio deve essere di almeno 20 caratteri"),
];
