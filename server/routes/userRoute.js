const route = require("express").Router();

const { UserController } = require("../controllers");
const { Authentication } = require("../helpers/middlewares/authentication");

route.post("/", UserController.create);
route.post("/login", UserController.login);

module.exports = route;
