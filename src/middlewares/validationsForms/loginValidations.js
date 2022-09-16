const { body } = require("express-validator");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("debe ingresar un email")
    .bail()
    .isEmail()
    .withMessage("debe ingresar un email valido")
    .bail(),

  body("password")
    .notEmpty()
    .withMessage("debe ingresar una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("la contraseña debe tener 8 caracteres minimo")
    .bail(),
];
