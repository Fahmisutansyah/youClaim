const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let merchantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employeeId: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  requestId: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  editorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  //editorId tipe employee yang bisa create campaign
});

merchantSchema.path("name").validate(function (value) {
  return new Promise(function (resolve, reject) {
    Merchant.findOne({ name: value })
      .then((merchant) => {
        if (merchant) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}, "Name is taken!");

merchantSchema.path("ownerId").validate(function (value) {
  return new Promise(function (resolve, reject) {
    Merchant.findOne({
      ownerId: value,
    })
      .then((merchant) => {
        if (merchant) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
});

let Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;
