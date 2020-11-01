const QuestionController = require("../controllers/questionController");
const route = require("express").Router();

route.post("/", QuestionController.createQuestionByAdmin);
route.get("/:id", QuestionController.readAllByWacanaId);
route.get("/detail/:id", QuestionController.readOneBySoalId);
route.put("/:id", QuestionController.updateByQuestionId);
route.delete("/:id", QuestionController.deleteByQuestionId);

module.exports = route;
