const { Nilai, User, Wacana } = require("../models");

class NilaiController {
  static async createNilai(req, res, next) {
    try {
      const { UserId, WacanaId, NilaiValue } = req.body;
      console.log(UserId, WacanaId, NilaiValue);

      const newNilai = await Nilai.create({
        UserId,
        WacanaId,
        Nilai: NilaiValue,
      });

      res.status(201).json({ newNilai });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllNilai(req, res, next) {
    try {
      const { id } = req.params;

      const nilai = await Nilai.findAll({
        where: {
          UserId: id,
        },
        include: Wacana,
      });

      res.status(200).json({ nilai });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NilaiController;
