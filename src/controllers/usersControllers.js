const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const usersFilePath = path.join(__dirname, "../data/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

module.exports = {
  register: (req, res) => {
    res.render("auth/register", {
      title: "Registro",
      styles: "users-form.css",
    });
  },

  processRegister: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("auth/register", {
        errors: errors.mapped(),
        old: req.body,
        title: "Registro",
        styles: "users-form.css",
      });
    } else {
      newUser = req.body;
      newUser.password = bcrypt.hashSync(newUser.password, 10);
      newUser.id = uuidv4();
      newUser.avatar = req.file;
      newUser.isAdmin = false;

      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
      res.redirect("/users/login");
    }
  },

  login: (req, res) => {
    res.render("auth/login", {
      title: "Login",
      styles: "users-form.css",
    });
  },

  processLogin: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("auth/login", {
        errors: errors.mapped(),
        title: "Login",
        styles: "users-form.css",
      });
    } else {
      const userFound = users.find((user) => {
        if (bcrypt.compareSync(req.body.password, user.password))
          return user.userEmail === req.body.email;
      });

      if (userFound == undefined) {
        res.render("auth/login", {
          error: "credenciales invalidas",
          title: "Login",
          styles: "users-form.css",
        });
      }

      req.session.userLoged = userFound;

      if (req.body.remember_me != undefined) {
        //chequear el timepo de la cookie
        res.cookie(
          "recordame",
          userFound.id
          // { maxAge: 60000 }
        );
      }
      res.redirect("/");
    }
  },

  processLogout: (req, res) => {
    res.clearCookie("recordame");
    req.session.destroy();
    res.redirect("/users/login");
  },
};
