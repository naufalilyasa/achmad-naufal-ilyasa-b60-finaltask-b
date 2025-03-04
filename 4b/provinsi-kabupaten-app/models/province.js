"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Province.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      Province.hasMany(models.Regency, {
        foreignKey: "provinsi_id",
        as: "regencies",
      });
    }
  }
  Province.init(
    {
      user_id: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      diresmikan: DataTypes.DATE,
      photo: DataTypes.STRING,
      pulau: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Province",
      tableName: "provinsi_tb",
      timestamps: false,
    }
  );
  return Province;
};
