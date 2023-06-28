const { Voucher, Campaign, Merchant } = require("../models");
const { customAlphabet } = require("nanoid");
const { jwtUtil } = require("../helpers/util");
const alphanumeric = require("../helpers/lib/alphanumeric");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class VoucherController {
  static async create(req, res) {
    const {
      campaignId,
      customerName,
      address,
      gender,
      age,
      phoneNumber,
      customerEmail,
    } = req.body;
    const { tkn } = req.query;
    if (tkn !== "undefined") {
      try {
        jwtUtil.decodeJwtSlug(tkn, campaignId);
        res.status(404).json({
          msg: "have already generated",
        });
      } catch (err) {
        const nanoid = customAlphabet(alphanumeric, 7);
        let uniqueCode = "";
        async function checkUnique() {
          let check = nanoid();
          const result = await Voucher.findOne({ uniqueCode: check });
          if (result) {
            checkUnique();
          } else {
            uniqueCode = check;
            return;
          }
        }
        await checkUnique();

        let newVoucher = new Voucher({
          uniqueCode,
          campaignId,
          customerName,
          address,
          gender,
          age,
          phoneNumber,
          customerEmail,
        });
        newVoucher
          .save()
          .then((created) => {
            let result = created.toJSON();
            Campaign.findById(campaignId)
              .then((campaign) => {
                let now = new Date();
                let expd = new Date(campaign.endDate);
                let dif = expd.getTime() - now.getTime();
                let days = Math.ceil(dif / (1000 * 3600 * 24) + 1);
                let token = jwtUtil.generateJwtSlug({
                  campaignId: campaign._id.toString(),
                  exp: days,
                });
                result["campaign"] = campaign;
                result["token"] = token;

                res.status(201).json(result);
              })
              .catch((err) => {
                res.status(201).json(created);
              });
          })
          .catch((err) => {
            res.status(500).json({
              msg: err.message,
            });
          });
      }
    } else {
      const nanoid = customAlphabet(alphanumeric, 7);
      let uniqueCode = "";
      async function checkUnique() {
        let check = nanoid();
        const result = await Voucher.findOne({ uniqueCode: check });
        if (result) {
          checkUnique();
        } else {
          uniqueCode = check;
          return;
        }
      }
      await checkUnique();

      let newVoucher = new Voucher({
        uniqueCode,
        campaignId,
        customerName,
        address,
        gender,
        age,
        phoneNumber,
        email,
      });
      newVoucher
        .save()
        .then((created) => {
          let result = created.toJSON();
          Campaign.findById(campaignId)
            .then((campaign) => {
              let now = new Date();
              let expd = new Date(campaign.endDate);
              let dif = expd.getTime() - now.getTime();
              let days = Math.ceil(dif / (1000 * 3600 * 24) + 1);
              let token = jwtUtil.generateJwtSlug({
                campaignId: campaign._id.toString(),
                exp: days,
              });
              result["campaign"] = campaign;
              result["token"] = token;

              res.status(201).json(result);
            })
            .catch((err) => {
              res.status(201).json(created);
            });
        })
        .catch((err) => {
          res.status(500).json({
            msg: err.message,
          });
        });
    }
  }
  static redeem(req, res) {
    const { uniqueCode } = req.body;
    let decode = jwtUtil.decodeJwt(req.headers.token);
    Voucher.findOne({ uniqueCode })
      .then((voucher) => {
        if (voucher.isRedeemed) {
          res.status(404).json({
            msg: "Voucher is redeemed",
          });
        } else {
          Campaign.findById(voucher.campaignId).then((campaign) => {
            let merchId = null;
            if (campaign && campaign.isActive) {
              merchId = campaign.merchantId;
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
                    voucher.isRedeemed = true;
                    voucher
                      .save({ validateBeforeSave: false })
                      .then((savedVoucher) => {
                        res.status(200).json(savedVoucher);
                      })
                      .catch((err) => {
                        res.status(500).json({
                          msg: err.message,
                        });
                      });
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
            } else if (campaign && !campaign.isActive) {
              res.status(404).json({
                msg: "inactive campaign",
              });
            }
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
  static get(req, res) {
    const query = req.query;
    delete query.merchantId;
    Voucher.find(query)
      .then((voucher) => {
        res.status(200).json(voucher);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
  static getCustomer(req, res) {
    const { campaignId } = req.query;
    Voucher.find({ campaignId })
      .then((vouchers) => {
        let result = [];
        let arr = [];
        let total = 0;
        let f = [
          "customerName",
          "address",
          "gender",
          "age",
          "phoneNumber",
          "customerEmail",
        ];
        for (let i = 0; i < vouchers.length; i++) {
          let obj = {};
          for (let j = 0; j < f.length; j++) {
            if (vouchers[i][f[j]]) {
              obj[f[j]] = vouchers[i][f[j]];
            }
          }
          if (!(Object.keys(obj).length === 0)) {
            if (arr.length < 8) {
              arr.push(obj);
              total++;
            } else {
              result.push(arr);
              arr = [];
              total++;
              arr.push(obj);
            }
          }
        }
        if (arr.length < 8) {
          result.push(arr);
        }
        let final = {
          customers: result,
          totalCustomer: total,
        };
        res.status(200).json(final);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
  static getPagi(req, res) {
    let { campaignId, skip, limit } = req.query;
    if (!skip || !limit) {
      res.status(500).json({
        mgs: "provide skip or limit",
      });
    }
    skip = Number(skip);
    limit = Number(limit);
    Voucher.aggregate([
      {
        $match: {
          campaignId: new ObjectId(campaignId),
        },
      },
      {
        $facet: {
          vouchers: [
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ])
      .then((vouchers) => {
        res.status(200).json(vouchers[0].vouchers);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
}

module.exports = VoucherController;
