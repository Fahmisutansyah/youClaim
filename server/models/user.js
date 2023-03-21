const mongoose = require("mongoose");
const { Merchant } = require("../models");

const { bcryptUtil } = require("../helpers/util");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  merchantId: {
    type: Schema.Types.ObjectId,
    ref: "Merchant",
  },
  role: {
    type: String,
    required: true,
  },
});

userSchema.path("email").validate(function (value) {
  return new Promise(function (resolve, reject) {
    User.findOne({ email: value })
      .then((user) => {
        if (user) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}, "Email is taken!");

userSchema.path("merchantId").validate(function (value) {
  if (!value) {
    return true;
  }
  return new Promise(function (resolve, reject) {
    Merchant.findOne({ id: value }).then((merchant) => {
      if (merchant) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }).catch((err) => {
    reject(err);
  });
}, "No merchant id found!");

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcryptUtil.hashPass(this.password);
  }
  next();
});

let User = mongoose.model("User", userSchema);

module.exports = User;
