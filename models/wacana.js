"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wacana extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wacana.belongsTo(models.User, { foreignKey: "UserId" });
      Wacana.hasMany(models.Article, { foreignKey: "WacanaId" });
    }
  }
  Wacana.init(
    {
      title: DataTypes.STRING,
      img_url: DataTypes.STRING,
      kelas: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wacana",
    }
  );
  return Wacana;
};
