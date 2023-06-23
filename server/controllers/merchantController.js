const { Merchant, User } = require("../models");
const { jwtUtil } = require("../helpers/util");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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
    Merchant.findById(merchantId).then((merchant) => {
      const { employeeId, requestId } = merchant;
      if (
        requestId.includes(new ObjectId(decode.id)) ||
        employeeId.includes(new ObjectId(decode.id))
      ) {
        res.status(404).json({
          msg: "This user has already requested",
        });
      } else {
        Merchant.findByIdAndUpdate(merchantId, {
          $push: { requestId: decode.id },
        })
          .then((merchant) => {
            res.status(200).json(merchant);
          })
          .catch((err) => {
            res.status(500).json({ msg: err.message });
          });
      }
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

  static getList(req, res) {
    const { merchantId } = req.query;
    if (!merchantId) {
      res.status(400).json({
        msg: "Bad Request, need merchant id",
      });
      throw "Bad Request, need merchant id";
    }
    Merchant.findById(merchantId)
      .populate("requestId")
      .populate("employeeId")
      .populate("editorId")
      .then((merchant) => {
        let result = {
          employees: merchant.employeeId,
          requests: merchant.requestId,
          editor: merchant.editorId,
        };
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
  static updateEmployees(req, res) {
    const { merchant } = res.locals;
    const { userId } = req.body;
    const { q } = req.query;
    const isId = (element) => {
      return element.toString() === userId;
    };
    Merchant.findById(merchant._id)
      .then((dbMerchant) => {
        if (q.includes("depromote")) {
          if (!q.includes("editor")) {
            dbMerchant.employeeId.push(dbMerchant.editorId);
          }
          dbMerchant.editorId = undefined;
          dbMerchant
            .save({ validateBeforeSave: false })
            .then((savedMerchant) => {
              res.status(200).json(savedMerchant);
            })
            .catch((err) => {
              res.status(500).json({
                msg: err.message,
              });
            });
        } else {
          const index = dbMerchant.employeeId.findIndex(isId);
          if (index !== -1) {
            if (q === "editor") {
              dbMerchant.editorId = dbMerchant.employeeId[index];
            }
            dbMerchant.employeeId.splice(index, 1);
            dbMerchant
              .save({ validateBeforeSave: false })
              .then((savedMerchant) => {
                res.status(200).json(savedMerchant);
              })
              .catch((err) => {
                res.status(500).json({
                  msg: err.message,
                });
              });
          } else {
            throw { message: "no user id found in employee list" };
          }
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }

  static acceptRequest(req, res) {
    const { merchant } = res.locals;
    const { userRequestId } = req.body;
    const { q } = req.query;
    const isId = (element) => {
      return element.toString() === userRequestId;
    };
    console.log(isId);
    Merchant.findById(merchant._id)
      .then((dbMerchant) => {
        const index = dbMerchant.requestId.findIndex(isId);
        if (index !== -1) {
          if (q === "accept") {
            dbMerchant.employeeId.push(dbMerchant.requestId[index]);
          }
          dbMerchant.requestId.splice(index, 1);
          dbMerchant
            .save({ validateBeforeSave: false })
            .then((savedMerchant) => {
              res.status(200).json(savedMerchant);
            })
            .catch((err) => {
              res.status(500).json({
                msg: err.message,
              });
            });
        } else {
          throw { message: "no user id found in request list" };
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
  static querySearch(req, res) {
    const { q } = req.query;
    Merchant.find({ name: { $regex: q, $options: "i" } })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
}

module.exports = MerchantController;
