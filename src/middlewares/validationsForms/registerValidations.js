const { body } = require("express-validator");

const registerValidations = [
  body("userName")
    .notEmpty()
    .withMessage("el campo nombre esta vacío")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El nombre es muy corto")
    .bail(),

  body("userLastName")
    .notEmpty()
    .withMessage("el campo apellido esta vacío")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El apellido es muy corto")
    .bail(),

  body("userEmail")
    .notEmpty()
    .withMessage("debe ingresar un email")
    .bail()
    .isEmail()
    .withMessage("debe ingresar un email valido"),

  body("password")
    .notEmpty()
    .withMessage("debe ingresar una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage("la contraseña debe tener 8 caracteres minimo")
    .bail(),

  // validacion de imagenes!
  body("avatar")
    .custom((value, { req }) => {
      if (req.file.length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Debe ingresar un avatar de perfil"),
];

module.exports = registerValidations;
