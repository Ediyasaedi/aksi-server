"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Nilai.belongsTo(models.Wacana);
      Nilai.belongsTo(models.User);
    }
  }
  Nilai.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      WacanaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Wacanas",
          key: "id",
        },
      },
      Nilai: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Nilai",
    }
  );
  return Nilai;
};
