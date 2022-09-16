module.exports = {
  index: (req, res) => {
    if (req.session.userLoged) {
      res.render("index", {
        title: "Inicio",
        styles: "general-styles.css",
        user: req.session.userLoged,
      });
    } else {
      res.render("index", { title: "Inicio", styles: "general-styles.css" });
    }
  },
  carrito: (req, res) => {
    res.render("carrito", {
      title: "Carrito",
      styles: "carrito.css",
    });
  },
};
