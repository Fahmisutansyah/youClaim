const { Voucher } = require("../models");
const { customAlphabet } = require("nanoid");
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
      email,
    } = req.body;
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
        res.status(201).json(created);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
  static redeem(req, res) {
    const { uniqueCode } = req.body;
    Voucher.findOneAndUpdate(
      { uniqueCode },
      { isRedeemed: true },
      { new: true }
    )
      .then((voucher) => {
        if (voucher && !voucher.isRedeemed) {
          res.status(200).json(voucher);
        } else if (voucher.isRedeemed) {
          res.status(404).json({
            msg: "Voucher is already redeemed",
          });
        } else {
          res.status(404).json({
            msg: "Voucher code invalid",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
          ss,
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
