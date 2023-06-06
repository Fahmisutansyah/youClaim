const route = require("express").Router();

const {
  Authentication,
  MerchantAuthentication,
} = require("../helpers/middlewares/authentication");

const { CampaignController } = require("../controllers");

route.use(Authentication);
route.get("/one", CampaignController.getOne);
route.get("/get", CampaignController.get);
route.use(MerchantAuthentication);
route.post("/new", CampaignController.create);
route.put("/update", CampaignController.put);
route.get("/page", CampaignController.getPagi);

module.exports = route;
