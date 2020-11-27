const ArticleController = require("../controllers/articleController");
const UserController = require("../controllers/userController");
const WacanaController = require("../controllers/wacanaController");
const QuestionController = require("../controllers/questionController");
const NilaiController = require("../controllers/nilaiController");
const route = require("express").Router();

route.post("/register", UserController.createUser);
route.post("/login", UserController.loginUser);
route.get("/wacanas", WacanaController.getByApps);
route.get("/articles/:id", ArticleController.readAllByWacanaId);
route.get("/questions/:id", QuestionController.readAllByWacanaId);

route.post("/nilai", NilaiController.createNilai);
route.get("/nilai/:id", NilaiController.getAllNilai);

module.exports = route;
