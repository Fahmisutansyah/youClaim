const mongoose = require("mongoose");

const { hashPass } = require("../helpers/util");

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
});

let User = mongoose.model("User", userSchema);

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

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = hashPass(this.password);
  }
  next();
});

module.exports = User;
