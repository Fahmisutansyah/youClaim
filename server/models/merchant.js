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

let Merchant = mongoose.model("Merchant", merchantSchema);

module.exports = Merchant;
