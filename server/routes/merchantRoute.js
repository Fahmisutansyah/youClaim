const route = require("express").Router();

const {
  Authentication,
  MerchantAuthentication,
} = require("../helpers/middlewares/authentication");
const { MerchantController } = require("../controllers");

route.use(Authentication);
route.post("/", MerchantController.create);
route.patch("/requestby/id", MerchantController.userAddRequest);
route.use(MerchantAuthentication);
route.get("/requestlist", MerchantController.getRequestList);
route.patch("/requestby/email", MerchantController.emailAddRequest);
module.exports = route;
