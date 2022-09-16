function unAuthMiddleware(req, res, next) {
  if (!req.session.userLoged) {
    // si no estas logueado podes entrar
    next();
  } else {
    // si estas logueado, no podes entrar
    res.redirect("/");
  }
}

module.exports = unAuthMiddleware;
