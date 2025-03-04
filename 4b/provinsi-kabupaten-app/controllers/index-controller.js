// RENDER HOME PAGE
function renderHomePage(req, res) {
  const user = req.session.user;
  res.render("index", { user: user });
}

// RENDER UNAUTHORIZED PAGE
function renderUnauthorizedPage(req, res) {
  const user = req.session.user;
  res.render("unauthorized", { user });
}

// RENDER 404 NOT FOUND PAGE
function render404NotFoundPage(req, res) {
  const user = req.session.user;
  res.render("404-not-found", { user });
}

module.exports = {
  renderHomePage,
  renderUnauthorizedPage,
  render404NotFoundPage,
};
