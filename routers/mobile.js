const ArticleController = require("../controllers/articleController");
const UserController = require("../controllers/userController");
const WacanaController = require("../controllers/wacanaController");
const QuestionController = require("../controllers/questionController");
const route = require("express").Router();

route.post("/register", UserController.createUser);
route.post("/login", UserController.loginUser);
route.get("/wacanas", WacanaController.getByApps);
route.get("/articles/:id", ArticleController.readAllByWacanaId);
route.get("/questions/:id", QuestionController.readAllByWacanaId);

module.exports = route;
