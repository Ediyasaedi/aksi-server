'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Question.init({
    soal: DataTypes.STRING,
    pilihan_a: DataTypes.STRING,
    pilihan_b: DataTypes.STRING,
    pilihan_c: DataTypes.STRING,
    pilihan_d: DataTypes.STRING,
    kunci_jawaban: DataTypes.STRING,
    img_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};