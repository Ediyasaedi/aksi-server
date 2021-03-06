const { Wacana, User } = require("../models");

class WacanaController {
  static async createWacanaByAdmin(req, res, next) {
    try {
      const { title, img_url, kelas, UserId } = req.body;

      let newWacana = await Wacana.create({
        title,
        img_url,
        kelas,
        UserId,
      });

      res.status(201).json({ newWacana });
    } catch (error) {
      next(error);
    }
  }

  static async readAllByAdmin(req, res, next) {
    try {
      let wacanas = await Wacana.findAll({
        include: User,
      });
      res.status(200).json({ wacanas });
    } catch (error) {
      next(error);
    }
  }

  static async getByApps(req, res, next) {
    try {
      let wacanas = await Wacana.findAll();
      res.status(200).json({ wacanas });
    } catch (error) {
      next(error);
    }
  }

  static async readAllByKelas(req, res, next) {
    try {
      const { kelas } = req.params;
      let wacanas = await Wacana.findAll({
        where: {
          kelas,
        },
      });
      res.status(200).json({ wacanas });
    } catch (error) {
      next(error);
    }
  }

  static async readById(req, res, next) {
    try {
      const { id } = req.params;
      const wacana = await Wacana.findAll({
        where: {
          id,
        },
        include: {
          model: User,
        },
      });
      if (!wacana) throw { name: "NotFound" };
      else {
        res.status(200).json({ wacana });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateWacana(req, res, next) {
    try {
      const { id } = req.params;
      const { title, img_url, kelas, UserId } = req.body;
      const wacana = await Wacana.findByPk(id);
      if (!wacana) throw { name: "NotFound" };
      else {
        wacana.update({
          title,
          img_url,
          kelas,
          UserId,
        });
        res
          .status(200)
          .json({ msg: `wacana with id: ${wacana.id} has updated` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteWacana(req, res, next) {
    try {
      const { id } = req.params;
      const wacana = await Wacana.findByPk(id);
      if (!wacana) throw { name: "NotFound" };
      else {
        wacana.destroy();
        res
          .status(200)
          .json({ msg: `wacana with id: ${wacana.id} has deleted` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WacanaController;
