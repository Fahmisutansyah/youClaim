const route = require("express").Router();

const {
  Authentication,
  MerchantAuthentication,
} = require("../helpers/middlewares/authentication");
const { MerchantController } = require("../controllers");

route.use(Authentication);
route.post("/", MerchantController.create);
route.get("/search", MerchantController.querySearch);
route.patch("/requestby/id", MerchantController.userAddRequest);
route.use(MerchantAuthentication);
route.get("/requestlist", MerchantController.getList);
route.patch("/requestby/email", MerchantController.emailAddRequest);
route.patch("/request/accept", MerchantController.acceptRequest);
route.patch("/employee", MerchantController.updateEmployees);
route.patch("/", MerchantController.update);
module.exports = route;
