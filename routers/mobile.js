const ArticleController = require("../controllers/articleController");
const UserController = require("../controllers/userController");
const WacanaController = require("../controllers/wacanaController");
const route = require("express").Router();

route.post("/register", UserController.createUser);
route.post("/login", UserController.loginUser);
route.get("/wacanas", WacanaController.getByApps);
route.get("/articles/:id", ArticleController.readAllByWacanaId);

module.exports = route;
