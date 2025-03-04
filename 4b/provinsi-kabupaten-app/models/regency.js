"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Regency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Regency.belongsTo(models.Province, {
        foreignKey: "provinsi_id",
        as: "province",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Regency.init(
    {
      nama: DataTypes.STRING,
      provinsi_id: DataTypes.INTEGER,
      diresmikan: DataTypes.DATE,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Regency",
      tableName: "kabupaten_tb",
      timestamps: false,
    }
  );
  return Regency;
};
