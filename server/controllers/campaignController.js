const { Campaign } = require("../models");
const { jwtUtil } = require("../helpers/util");
const slugify = require("../helpers/lib/slugify");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class CampaignController {
  static create(req, res) {
    let decode = jwtUtil.decodeJwt(req.headers.token);
    let merchantName = res.locals.merchant.name;
    const { campaignName, logo, endDate, slug, description, tnc, isActive } =
      req.body;
    let tSlug = slugify(
      !slug ? `{${merchantName} ${campaignName}}` : `{${merchantName} ${slug}}`
    );
    let newCampaign = new Campaign({
      campaignName,
      logo,
      endDate,
      slug: tSlug,
      description,
      tnc,
      isActive,
      merchantId: req.query.merchantId,
      createdBy: decode.id,
    });
    newCampaign
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
  static getOne(req, res) {
    const { merchantId, _id } = req.query;
    Campaign.aggregate([
      {
        $match: {
          merchantId: new ObjectId(merchantId),
          _id: new ObjectId(_id),
        },
      },
      {
        $facet: {
          campaign: [
            {
              $lookup: {
                from: "vouchers",
                localField: "_id",
                foreignField: "campaignId",
                as: "vouchers",
              },
            },
            {
              $addFields: {
                totalRedeemed: {
                  $size: {
                    $filter: {
                      input: "$vouchers",
                      as: "item",
                      cond: {
                        $eq: ["$$item.isRedeemed", true],
                      },
                    },
                  },
                },
              },
            },
            {
              $addFields: { totalVoucher: { $size: "$vouchers" } },
            },
            {
              $unset: "vouchers",
            },
          ],
        },
      },
    ])
      .then((campaign) => {
        res.status(200).json(campaign[0].campaign[0]);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
  static get(req, res) {
    const { query } = req.query;
    Campaign.find(query)
      .then((campaigns) => {
        if (campaigns.length > 0) {
          res.status(200).json(campaigns);
        } else {
          res.status(404).json({
            msg: "No campaign Found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }

  static getPagi(req, res) {
    let { merchantId, skip, limit } = req.query;
    skip = Number(skip);
    limit = Number(limit);
    Campaign.aggregate([
      {
        $match: { merchantId: new ObjectId(merchantId) },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          allCampaign: [{ $count: "totalCampaign" }],
          campaigns: [
            {
              $lookup: {
                from: "vouchers",
                localField: "_id",
                foreignField: "campaignId",
                as: "vouchers",
              },
            },
            {
              $addFields: { totalVoucher: { $size: "$vouchers" } },
            },
            {
              $addFields: {
                totalRedeemed: {
                  $size: {
                    $filter: {
                      input: "$vouchers",
                      as: "item",
                      cond: {
                        $eq: ["$$item.isRedeemed", true],
                      },
                    },
                  },
                },
              },
            },
            {
              $unset: "vouchers",
            },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      },
    ])
      .then((campaigns) => {
        res.status(200).json(campaigns[0]);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }

  static put(req, res) {
    const { id } = req.query;
    const body = req.body;
    Campaign.findByIdAndUpdate(id, { $set: body }, { new: true })
      .then((campaign) => {
        res.status(200).json(campaign);
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
  static getIdBySlug(req, res) {
    const { s } = req.query;
    Campaign.find({ slug: s })
      .then((campaigns) => {
        if (campaigns.length > 0) {
          res.status(200).json({ campaignId: campaigns[0]._id });
        } else {
          res.status(404).json({
            msg: "No campaign Found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  }
}

module.exports = CampaignController;
