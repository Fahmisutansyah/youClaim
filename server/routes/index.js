const route = require("express").Router();

route.use("/users", require("./userRoute"));
route.use("/merchant", require("./merchantRoute"));

module.exports = route;
