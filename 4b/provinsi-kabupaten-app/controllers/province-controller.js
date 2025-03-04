const { Province, User } = require("../models");
const { Sequelize } = require("sequelize");
const config = require("../config/config.json");
require("dotenv").config();

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

// RENDER PROVINCE PAGE
async function renderProvincesPage(req, res) {
  const user = req.session.user;

  const getProvinces = await Province.findAll({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    order: [["nama", "ASC"]],
  });

  if (!user) {
    res.render("provinces", { provinces: getProvinces });
  } else {
    res.render("provinces", { provinces: getProvinces, user: user });
  }
}

// RENDER PROVINCE DETAIL PAGE
async function renderProvinceDetailPage(req, res) {
  const user = req.session.user;
  const id = req.params.id;

  const getProvince = await Province.findOne({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    where: { id: id },
  });

  if (getProvince === null) {
    res.render("page-404");
  } else {
    res.render("province-detail", {
      province: getProvince,
      userData: getProvince.user,
      user: user,
    });
  }
}

// RENDER CREATE PROVINCE PAGE
function renderProvinceCreatePage(req, res) {
  const user = req.session.user;

  res.render("province-create", { user: user });
}

// RENDER EDIT PROVINCE PAGE
async function renderEditProvincePage(req, res) {
  const id = req.params.id;
  const user = req.session.user;

  const existingProvince = await Province.findOne({
    include: { model: User, as: "user", attributes: { exclude: ["password"] } },
    where: { id: id },
  });

  if (user.id !== existingProvince.user.id) {
    return res.redirect("/unauthorized");
  }

  if (existingProvince === null) {
    res.redirect("/404-not-found");
  } else {
    res.render("province-edit", { province: existingProvince, user: user });
  }
}

// CREATE PROVINCE
async function createProvince(req, res) {
  const { nama, diresmikan, pulau } = req.body;
  const image = req.file.path;
  const userId = req.session.user.id;

  const provinceData = {
    nama,
    diresmikan,
    pulau,
    photo: image,
    user_id: userId,
  };

  await Province.create(provinceData)
    // .then((res) => console.log(res))
    .catch((error) => console.error(error));
  res.redirect("/provinces");
}

// DELETE PROVINCE
async function deleteProvince(req, res) {
  const id = req.params.id;

  const deletedProvince = await Province.destroy({
    where: { id: id },
  });

  res.redirect("/provinces");
}

// UPDATE PROVINCE
async function updateProvince(req, res) {
  const id = req.params.id;
  let { nama, diresmikan, pulau } = req.body;
  let image = req.file;

  if (!image) {
    image = req.body.image;
  } else {
    image = image.path;
  }

  const editedProvince = {
    nama,
    diresmikan,
    pulau,
    photo: image,
  };

  const updatedProvince = await Province.update(editedProvince, {
    where: { id: id },
  })
    .then((res) => console.log(res))
    .catch((error) => console.error(error));

  res.redirect("/provinces");
}

module.exports = {
  renderProvincesPage,
  renderProvinceDetailPage,
  renderProvinceCreatePage,
  renderEditProvincePage,
  createProvince,
  deleteProvince,
  updateProvince,
};
