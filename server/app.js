const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// const NODE_ENV = process.env.NODE_ENV || "development"
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const database = process.env.ATLAS_PASS
  ? `mongodb+srv://admin:${process.env.ATLAS_PASS}@cluster0-ayir7.gcp.mongodb.net/e-commerce?retryWrites=true`
  : "mongodb://localhost:27017/youclaim";
mongoose.connect(database, { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error!"));
db.once("open", function () {
  console.log("mongoose is connected!");
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
module.exports = app;
