const UserController = require("../controllers/userController");
const route = require("express").Router();

route.post("/", UserController.createUser);
route.get("/role/:role", UserController.readAllByRole);
route.get("/:id", UserController.readById);
route.put("/:id", UserController.updateUser);
route.delete("/:id", UserController.deleteUser);

module.exports = route;
