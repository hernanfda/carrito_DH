const express = require("express"); //requerimiento de express
const router = express.Router(); //funcionalidad de express.Router()

//MIDDLEWARES
const upload = require("../middlewares/multer/multerProducts");
const createProductsValidations = require("../middlewares/validationsForms/createProdsValidations");
const authMiddleware = require("../middlewares/access/AuthorizedMd");
const adminAcces = require("../middlewares/access/adminMd");

//CONTROLADORES DE PRODUCTOS
const productsControllers = require("../controllers/productsControllers");

//RUTAS

router.get("/", productsControllers.allProducts);
router.get("/detail/:id", productsControllers.detail);
router.get(
  "/create",
  authMiddleware,
  adminAcces,
  productsControllers.createForm
);
router.post(
  "/create",
  upload.array("image", 10),
  createProductsValidations,
  productsControllers.createProcess
);
router.get("/edit/:id", adminAcces, productsControllers.edit);
router.put(
  "/edit/:id",
  upload.array("images", 10),
  productsControllers.editProcess
);

router.delete("/delete/:id", productsControllers.deleteProduct)

module.exports = router;
