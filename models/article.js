"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.Wacana, { foreignKey: "WacanaId" });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      img_url: DataTypes.STRING,
      content: DataTypes.TEXT,
      WacanaId: Sequelize.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
