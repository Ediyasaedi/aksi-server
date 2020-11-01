const { Question } = require("../models");

class QuestionController {
  static async createQuestionByAdmin(req, res, next) {
    try {
      const {
        soal,
        pilihan_a,
        pilihan_b,
        pilihan_c,
        pilihan_d,
        kunci_jawaban,
        img_url,
        WacanaId,
      } = req.body;

      const newQuestion = await Question.create({
        soal,
        pilihan_a,
        pilihan_b,
        pilihan_c,
        pilihan_d,
        kunci_jawaban,
        img_url,
        WacanaId,
      });

      res.status(201).json({ newQuestion });
    } catch (error) {
      next(error);
    }
  }

  static async readAllByWacanaId(req, res, next) {
    try {
      const { id } = req.params;

      const question = await Question.findAll({
        where: {
          WacanaId: id,
        },
      });

      res.status(200).json({ question });
    } catch (error) {
      next(error);
    }
  }

  static async readOneBySoalId(req, res, next) {
    try {
      const { id } = req.params;

      const question = await Question.findByPk(id);

      res.status(200).json({ question });
    } catch (error) {
      next(error);
    }
  }

  static async updateByQuestionId(req, res, next) {
    try {
      const { id } = req.params;
      const {
        soal,
        pilihan_a,
        pilihan_b,
        pilihan_c,
        pilihan_d,
        kunci_jawaban,
        img_url,
        WacanaId,
      } = req.body;

      let question = await Question.findByPk(id);
      if (!question) throw { name: "NotFound" };
      else {
        question.update({
          soal,
          pilihan_a,
          pilihan_b,
          pilihan_c,
          pilihan_d,
          kunci_jawaban,
          img_url,
          WacanaId,
        });

        res
          .status(201)
          .json({ msg: `question with id: ${question.id} has updated` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteByQuestionId(req, res, next) {
    try {
      const { id } = req.params;

      let question = await Question.findByPk(id);
      if (!question) throw { name: "NotFound" };
      else {
        question.destroy();

        res
          .status(201)
          .json({ msg: `question with id: ${question.id} has deleted` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QuestionController;
