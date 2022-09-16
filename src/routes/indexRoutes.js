const express = require("express");
const router = express.Router();

const indexControllers = require("../controllers/indexControllers");

router.get("/", indexControllers.index);

router.get("/carrito", indexControllers.carrito);

module.exports = router;
