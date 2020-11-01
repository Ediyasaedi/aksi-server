const { Article } = require("../models");

class ArticleController {
  static async createArticleByAdmin(req, res, next) {
    try {
      const { title, img_url, content, WacanaId } = req.body;

      const newArticle = await Article.create({
        title,
        img_url,
        content,
        WacanaId,
      });

      res.status(201).json({ newArticle });
    } catch (error) {
      next(error);
    }
  }

  static async readAllByWacanaId(req, res, next) {
    try {
      const { id } = req.params;

      const article = await Article.findAll({
        where: {
          WacanaId: id,
        },
      });

      res.status(200).json({ article });
    } catch (error) {
      next(error);
    }
  }

  static async readOneByArticleId(req, res, next) {
    try {
      const { id } = req.params;

      const article = await Article.findByPk(id);

      res.status(200).json({ article });
    } catch (error) {
      next(error);
    }
  }

  static async updateByArticleId(req, res, next) {
    try {
      const { id } = req.params;
      const { title, img_url, content, WacanaId } = req.body;

      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };
      else {
        article.update({
          title,
          img_url,
          content,
          WacanaId,
        });

        res
          .status(201)
          .json({ msg: `article with id: ${article.id} has updated` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteByArticleId(req, res, next) {
    try {
      const { id } = req.params;

      let article = await Article.findByPk(id);
      if (!article) throw { name: "NotFound" };
      else {
        article.destroy();

        res
          .status(201)
          .json({ msg: `article with id: ${article.id} has deleted` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ArticleController;
