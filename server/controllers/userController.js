const { User, Merchant } = require("../models");

const { bcryptUtil, jwtUtil } = require("../helpers/util");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class UserController {
  static create(req, res, next) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    newUser
      .save()
      .then((created) => {
        res.status(201).json(created);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }

  static readOne(req, res) {
    User.findById(req.query.id)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }

  static login(req, res) {
    User.findOne({
      email: req.body.email,
    })
      .then((user) => {
        if (user) {
          let check = bcryptUtil.compareHash(req.body.password, user.password);
          if (check) {
            let token = jwtUtil.generateJwt({
              email: user.email,
              id: user._id,
            });
            res.status(201).json({
              token,
            });
          } else {
            res.status(400).json({
              msg: `Invalid email/password`,
            });
          }
        } else {
          res.status(400).json({
            msg: `Invalid email/password`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }

  static getPayload(req, res) {
    let decode = jwtUtil.decodeJwt(req.headers.token);
    User.findOne({
      _id: decode.id,
    })
      .select(["-password"])
      .then((user) => {
        if (!user) {
          throw { message: "No user ID found" };
        }
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }

  static getMerchants(req, res) {
    let decode = jwtUtil.decodeJwt(req.headers.token);
    Merchant.find()
      .where({
        $and: [
          {
            $or: [
              {
                employeeId: new ObjectId(decode.id),
              },
              {
                requestId: new ObjectId(decode.id),
              },
              {
                ownerId: new ObjectId(decode.id),
              },
              {
                editorId: new ObjectId(decode.id),
              },
            ],
          },
        ],
      })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          throw { message: "No Merchant Found" };
        }
      })
      .catch((err) => {
        if (err.message === "No Merchant Found") {
          res.status(404).json({
            msg: err.message,
          });
        } else {
          res.status(500).json({
            msg: err.message,
          });
        }
      });
  }
  static logout(req, res) {
    res.status(200).json({ msg: "success logout" });
  }
}

module.exports = UserController;
