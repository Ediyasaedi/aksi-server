const ArticleController = require("../controllers/articleController");
const route = require("express").Router();

route.post("/", ArticleController.createArticleByAdmin);
route.get("/:id", ArticleController.readAllByWacanaId);
route.get("/detail/:id", ArticleController.readOneByArticleId);
route.put("/:id", ArticleController.updateByArticleId);
route.delete("/:id", ArticleController.deleteByArticleId);

module.exports = route;
