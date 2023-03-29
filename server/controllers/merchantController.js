const { Merchant, User } = require("../models");
const { jwtUtil } = require("../helpers/util");

class MerchantController {
  static create(req, res) {
    let decode = jwtUtil.decodeJwt(req.headers.token);
    const { name, desc, logoUrl } = req.body;
    let newMerchant = new Merchant({
      name,
      desc,
      logoUrl,
      ownerId: decode.id,
    });
    newMerchant
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
  static userAddRequest(req, res) {
    let decode = jwtUtil.decodeJwt(req.headers.token);
    const { merchantId } = req.query;

    Merchant.findByIdAndUpdate(merchantId, { $push: { requestId: decode.id } })
      .then((merchant) => {
        res.status(200).json(merchant);
      })
      .catch((err) => {
        res.status(500).json({ msg: err.message });
      });
  }
  static emailAddRequest(req, res) {
    const { email } = req.body;
    const { merchantId } = req.query;
    let decode = jwtUtil.decodeJwt(req.headers.token);
    if (!merchantId) {
      res.status(400).json({
        msg: `Bad Request, need merchant id`,
      });
    } else {
      User.findOne({ email })
        .then((user) => {
          if (user) {
            if (user._id === decode.id) {
              res.status(400).json({
                msg: `Bad Request, cannot add owner to employee`,
              });
            } else {
              Merchant.findByIdAndUpdate(merchantId, {
                $push: { requestId: user._id },
              })
                .then((merchant) => {
                  res.status(200).json(merchant);
                })
                .catch((err) => {
                  res.status(500).json({ msg: err.message });
                });
            }
          } else {
            res.status(400).json({
              msg: `No user found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ msg: err.message });
        });
    }
  }

  static getRequestList(req, res) {
    let decode = jwtUtil.decodeJwt(req.headers.token);
    const { merchantId } = req.query;
    if (!merchantId) {
      res.status(400).json({
        msg: "Bad Request, need merchant id",
      });
      throw "Bad Request, need merchant id";
    }
    Merchant.findById(merchantId)
      .populate("requestId")
      .then((merchant) => {
        if (merchant.ownerId !== decode.id) {
          res.status(403).json({
            msg: "You are not authorized",
          });
          throw "Forbidden request";
        }
        res.status(200).json(merchant.requestId);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
}

module.exports = MerchantController;
