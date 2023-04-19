const route = require("express").Router();

route.use("/users", require("./userRoute"));
route.use("/merchant", require("./merchantRoute"));
route.use("/campaign", require("./campaignRoute"));

module.exports = route;
