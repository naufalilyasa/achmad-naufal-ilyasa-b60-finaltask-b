const { Province, Regency, User } = require("../models");
const { Sequelize } = require("sequelize");
const config = require("../config/config.json");
require("dotenv").config();

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

// RENDER REGENCIES PAGE
async function renderRegenciesPage(req, res) {
  const user = req.session.user;

  const getRegencies = await Regency.findAll({
    include: [
      {
        model: Province,
        as: "province",
        include: [
          { model: User, as: "user", attributes: { exclude: ["password"] } },
        ],
      },
    ],
    order: [["nama", "ASC"]],
  });

  if (!user) {
    res.render("regencies", { regencies: getRegencies });
  } else {
    res.render("regencies", {
      regencies: getRegencies,
      userSession: user,
    });
  }
}

// RENDER REGENCY DETAIL PAGE
async function renderRegencyDetailPage(req, res) {
  const user = req.session.user;
  const id = req.params.id;

  const getRegency = await Regency.findOne({
    include: [
      {
        model: Province,
        as: "province",
        include: [
          { model: User, as: "user", attributes: { exclude: ["password"] } },
        ],
      },
    ],
    where: { id: id },
  });

  if (getRegency === null) {
    res.render("page-404");
  } else {
    res.render("regency-detail", {
      regency: getRegency,
      user: user,
    });
  }
}

// RENDER CREATE REGENCY PAGE
async function renderRegencyCreatePage(req, res) {
  const user = req.session.user;

  const getProvinces = await Province.findAll();

  res.render("regency-create", { provinces: getProvinces, user: user });
}

// RENDER EDIT REGENCY PAGE
async function renderEditRegencyPage(req, res) {
  const id = req.params.id;
  const user = req.session.user;

  const existingRegency = await Regency.findOne({
    include: [
      {
        model: Province,
        as: "province",
        include: [
          { model: User, as: "user", attributes: { exclude: ["password"] } },
        ],
      },
    ],
    where: { id: id },
  });

  const getProvinces = await Province.findAll();

  if (existingRegency === null) {
    res.redirect("/404-not-found");
  } else {
    res.render("regency-edit", {
      regency: existingRegency,
      provinces: getProvinces,
      user: user,
    });
  }
}

// CREATE REGENCY
async function createRegency(req, res) {
  const { nama, diresmikan, pulau, provinsiId } = req.body;
  const image = req.file.path;

  const regencyData = {
    nama,
    diresmikan,
    pulau,
    photo: image,
    provinsi_id: provinsiId,
  };

  await Regency.create(regencyData)
    // .then((res) => console.log(res))
    .catch((error) => console.error(error));
  res.redirect("/regencies");
}

// DELETE REGENCY
async function deleteRegency(req, res) {
  const id = req.params.id;

  const deletedRegency = await Regency.destroy({
    where: { id: id },
  });

  res.redirect("/regencies");
}

// UPDATE REGENCY
async function updateRegency(req, res) {
  const id = req.params.id;
  let { nama, diresmikan, pulau, provinsiId } = req.body;
  let image = req.file;

  if (!image) {
    image = req.body.image;
  } else {
    image = image.path;
  }

  const editedRegency = {
    nama,
    diresmikan,
    pulau,
    photo: image,
    provinsi_id: provinsiId,
  };

  const updatedRegency = await Regency.update(editedRegency, {
    where: { id: id },
  })
    .then((res) => console.log(res))
    .catch((error) => console.error(error));

  res.redirect("/regencies");
}

module.exports = {
  renderRegenciesPage,
  renderRegencyDetailPage,
  renderRegencyCreatePage,
  renderEditRegencyPage,
  createRegency,
  deleteRegency,
  updateRegency,
};
