const route = require("express").Router();

const {
  Authentication,
  MerchantAuthentication,
} = require("../helpers/middlewares/authentication");

const { VoucherController } = require("../controllers");

route.post("/", VoucherController.create);
route.use(Authentication);
route.use(MerchantAuthentication);
route.put("/", VoucherController.redeem);
route.get("/", VoucherController.get);

module.exports = route;
