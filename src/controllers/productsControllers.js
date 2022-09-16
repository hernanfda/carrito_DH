const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); //genera ids automaticos
const { validationResult } = require("express-validator"); //mensajes de error para validaciones

const productsFilePath = path.join(__dirname, "../data/products.json"); //ubicacion del archivo json
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8")); //metodo parse para poder leer el array.

module.exports = {
  //devuelve todos los productos del json
  allProducts: (req, res) => {
    if (req.session.userLoged) {
      res.render("products/products", {
        products: products,
        title: "Todos Los Productos",
        styles: "products.css",
        user: req.session.userLoged,
      });
    } else {
      res.render("products/products", {
        products: products,
        title: "Todos Los Productos",
        styles: "products.css",
      });
    }
  },

  detail: (req, res) => {
    //muestra el detalle de un producto especifico.
    const id = req.params.id;
    //buscamos en el array el producto que coincida con el que llega por parametro.
    const filteredProduct = products.find((product) => {
      return product.id == id;
    });
    if (req.session.userLoged) {
      res.render("products/detail", {
        title: filteredProduct.title,
        styles: "detail.css",
        filteredProduct,
        user: req.session.userLoged,
      });
    } else {
      res.render("products/detail", {
        title: filteredProduct.title,
        styles: "detail.css",
        filteredProduct,
      });
    }
    //devolvemos la vista con la info del producto encontrado.
  },

  createForm: (req, res) => {
    res.render("products/create", {
      title: "Crear Producto",
      styles: "create-product.css",
    });
  },

  createProcess: (req, res) => {
    //guardamos en una variable que contrendra los errores, lo que llega mediante el req.
    const errors = validationResult(req);

    //si hay errores, mostramos los errores en la vista
    if (!errors.isEmpty()) {
      return res.render("products/create", {
        errors: errors.mapped(),
        old: req.body,
        styles: "create-product.css",
        title: "Crear Producto",
      });
      //sino cargamos el producto
    } else {
      //generamos un id
      const id = uuidv4();
      //capturamos lo que llega del formulario
      const newProduct = req.body;
      //le asignamos el id al producto
      newProduct.id = id;
      // le asignamos el array de imagenes
      newProduct.images = req.files;

      //agregamos el nuevo producto al array de productos
      products.push(newProduct);
      //sobreescribimos el json con la nueva info
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
      // redirigimos al inicio
      res.redirect("/");
    }
  },

  edit: (req, res) => {
    const id = req.params.id;
    const filteredProduct = products.find((product) => {
      return product.id == id;
    });
    res.render("products/edit", {
      title: "Editar Producto",
      styles: "create-product.css",
      product: filteredProduct,
    });
  },

  editProcess: (req, res) => {
    // capturo id por parametro
    const id = req.params.id;
    //lo encuentro en el JSON
    let productToEdit = products.find((product) => {
      return product.id == id;
    });
    //si no subieron archivos, quedan los anteriores
    if (req.files.length == 0) {
      productToEdit = {
        id: productToEdit.id,
        ...req.body,
        images: productToEdit.images,
      };
      const editedProduct = products.map((product) => {
        if (product.id == productToEdit.id) {
          return (product = { ...productToEdit });
        }
        return product;
      });
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(editedProduct, null, " ")
      );
      res.redirect("/products");
    } else {
      productToEdit = {
        id: productToEdit.id,
        ...req.body,
        images: req.files,
      };
      const editedProduct = products.map((product) => {
        if (product.id == productToEdit.id) {
          return (product = { ...productToEdit });
        }
        return product;
      });
      fs.writeFileSync(
        productsFilePath,
        JSON.stringify(editedProduct, null, " ")
      );
      res.redirect("/products");
    }
  },

  deleteProduct: (req, res) => {
    const id = req.params.id;

    const newProductList = products.filter((products) => {
      return products.id != id;
    });
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(newProductList, null, " ")
    );
    res.redirect("/products");
  },
};
