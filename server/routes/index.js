const route = require("express").Router();

route.use("/users", require("./userRoute"));

module.exports = route;
