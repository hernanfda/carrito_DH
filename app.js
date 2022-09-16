const express = require("express"); // requiero express
const app = express(); // uso la funcionalida de express
const path = require("path"); //crea rutas absolutas
const session = require("express-session"); //paquete para loguear usuarios
const methodOverride = require("method-override"); // paquete para usar PUT y Delete
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000; //variable dinamica de puerto

//ROUTES
const indexRoutes = require("./src/routes/indexRoutes");
const productsRoutes = require("./src/routes/productsRoutes");
const usersRoutes = require("./src/routes/usersRoutes");

//ubicacion de la carpta de vistas para express
app.set("views", path.join(__dirname, "src/views"));
//motor de vista usado en la app
app.set("view engine", "ejs");

//MIDDLEWARES GLOBALES
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "shhh, is a secret!",
    // resave: false,
    // saveUninitialized: true,
  })
);
//disponibilizacion de carpeta publica
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// dejar en false
app.use(express.urlencoded({ extended: false }));

//ROUTES PATHS
app.use("/", indexRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);

//metodo listen para levantar aplicacion de express
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
