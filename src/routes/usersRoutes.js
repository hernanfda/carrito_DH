const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/usersControllers");
const upload = require("../middlewares/multer/multerUsers");
const registerValidations = require("../middlewares/validationsForms/registerValidations.js");
const loginValidations = require("../middlewares/validationsForms/loginValidations");
const unAuthMiddleware = require("../middlewares/access/unAuthorizedmdlwr");
const authMiddleware = require('../middlewares/access/AuthorizedMd')

router.get("/register", userControllers.register);
router.post(
  "/register",
  upload.single("avatar"),
  registerValidations,
  userControllers.processRegister
);

router.get("/login", unAuthMiddleware, userControllers.login);
router.post("/login", loginValidations, userControllers.processLogin);

router.get("/logout", userControllers.processLogout);

module.exports = router;
