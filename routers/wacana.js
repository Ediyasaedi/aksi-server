const WacanaController = require("../controllers/wacanaController");
const route = require("express").Router();

route.post("/", WacanaController.createWacanaByAdmin);
route.get("/", WacanaController.readAllByAdmin);
route.get("/sort/:kelas", WacanaController.readAllByKelas);
route.get("/:id", WacanaController.readById);
route.put("/:id", WacanaController.updateWacana);
route.delete("/:id", WacanaController.deleteWacana);

module.exports = route;
