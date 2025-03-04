require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const methodOverride = require("method-override");
const path = require("path");
const flash = require("express-flash");
const session = require("express-session");

const app = express();
const port = process.env.SERVER_PORT || 3300;

const upload = require("./middlewares/upload-file.js");
const { checkUser } = require("./middlewares/auth.js");

const {
  renderUnauthorizedPage,
  render404NotFoundPage,
  renderHomePage,
} = require("./controllers/index-controller.js");
const {
  authLoginPage,
  authRegisterPage,
  authLogin,
  authRegister,
  authLogout,
} = require("./controllers/auth-controller.js");
const {
  renderProvincesPage,
  renderProvinceDetailPage,
  renderProvinceCreatePage,
  createProvince,
  renderEditProvincePage,
  deleteProvince,
  updateProvince,
} = require("./controllers/province-controller.js");
const {
  renderRegenciesPage,
  renderRegencyDetailPage,
  renderRegencyCreatePage,
  renderEditRegencyPage,
  createRegency,
  deleteRegency,
  updateRegency,
} = require("./controllers/regency-controller.js");

const { equalPage } = require("./utils/equalPage.js");
const { dateFormatter } = require("./utils/dateFormatter.js");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./assets")));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use(express.static(path.join(__dirname, "./uploads")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    name: "mySession",
    resave: false,
    secret: "mySecret",
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 30 },
  })
);
app.use(flash());

hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", equalPage);
hbs.registerHelper("or", (a, b) => a || b);
hbs.registerHelper("dateFormatter", dateFormatter);

// RENDER HOME PAGE
app.get("/", renderHomePage);

// RENDER PROVINCES PAGE
app.get("/provinces", renderProvincesPage);

// RENDER PROVINCE DETAIL PAGE
app.get("/province-detail/:id", checkUser, renderProvinceDetailPage);

// RENDER CREATE PROVINCE PAGE
app.get("/province-create", checkUser, renderProvinceCreatePage);

// RENDER EDIT PROVINCE PAGE
app.get("/province-edit/:id", checkUser, renderEditProvincePage);

// CREATE PROVINCE
app.post("/province", upload.single("image"), createProvince);

// DELETE PROVINCE
app.delete("/province/:id", deleteProvince);

// UPDATE PROVINCE
app.put("/province/:id", upload.single("image"), updateProvince);

// RENDER REGENCIES PAGE
app.get("/regencies", renderRegenciesPage);

// RENDER REGENCY DETAIL PAGE
app.get("/regency-detail/:id", checkUser, renderRegencyDetailPage);

// RENDER CREATE REGENCY PAGE
app.get("/regency-create", checkUser, renderRegencyCreatePage);

// RENDER EDIT REGENCY PAGE
app.get("/regency-edit/:id", checkUser, renderEditRegencyPage);

// CREATE REGENCY
app.post("/regency", upload.single("image"), createRegency);

// DELETE REGENCY
app.delete("/regency/:id", deleteRegency);

// UPDATE REGENCY
app.put("/regency/:id", upload.single("image"), updateRegency);

// RENDER LOGIN PAGE
app.get("/login", authLoginPage);

// RENDER REGISTER PAGE
app.get("/register", authRegisterPage);

// LOGIN
app.post("/login", authLogin);

// REGISTER
app.post("/register", authRegister);

// LOGOUT
app.get("/logout", authLogout);

// RENDER UNAUTHORIZED PAGE
app.get("/unauthorized", renderUnauthorizedPage);

// RENDER 404 NOT FOUND PAGE
app.get("*", render404NotFoundPage);
app.get("/404-not-found", render404NotFoundPage);

app.listen(port, () => {
  console.log(`Provinsi Kabupaten app listening on port ${port}`);
});
