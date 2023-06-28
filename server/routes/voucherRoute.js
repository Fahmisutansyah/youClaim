const route = require("express").Router();

const {
  Authentication,
  MerchantAuthentication,
} = require("../helpers/middlewares/authentication");

const { VoucherController } = require("../controllers");

route.post("/", VoucherController.create);
route.use(Authentication);
route.put("/", VoucherController.redeem);
route.use(MerchantAuthentication);
route.get("/", VoucherController.get);
route.get("/pagi", VoucherController.getPagi);
route.get("/cust", VoucherController.getCustomer);

module.exports = route;
