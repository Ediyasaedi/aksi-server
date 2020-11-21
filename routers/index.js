const route = require("express").Router();
const adminRoute = require("./admin");
const mobileRoute = require("./mobile");
const UserController = require("../controllers/userController");
const { adminAuthentication } = require("../middlewares/adminAuthentication");

route.post("/addadmin", UserController.addAdmin);
route.post("/login", UserController.login);
route.use("/admin", adminAuthentication, adminRoute);

route.use("/app", mobileRoute);

module.exports = route;
