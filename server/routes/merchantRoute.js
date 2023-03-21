const route = require("express").Router();

const { Authentication } = require("../helpers/middlewares/authentication");
const { MerchantController } = require("../controllers");

route.use(Authentication);
route.get("/", MerchantController.create);

module.exports = route;
