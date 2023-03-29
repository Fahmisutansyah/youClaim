const route = require("express").Router();

const { UserController } = require("../controllers");
const { Authentication } = require("../helpers/middlewares/authentication");

route.post("/", UserController.create);
route.post("/login", UserController.login);
route.use(Authentication);
route.get("/pl", UserController.getPayload);
route.get("/owned", UserController.getMerchants);

module.exports = route;
