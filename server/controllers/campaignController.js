const { Campaign } = require("../models");
const { jwtUtil } = require("../helpers/util");
const slugify = require("../helpers/lib/slugify");

class CampaignController {
  static create(req, res) {
    let decode = jwtUtil.decodeJwt(req.headers.token);
    let merchantName = res.locals.merchant.name;
    const {
      campaignName,
      banner,
      logo,
      endDate,
      slug,
      description,
      tnc,
      waNumber,
      isActive,
    } = req.body;
    let tSlug = slugify(
      !slug ? `{${merchantName} ${campaignName}}` : `{${merchantName} ${slug}}`
    );
    let newCampaign = new Campaign({
      campaignName,
      banner,
      logo,
      endDate,
      slug: tSlug,
      description,
      tnc,
      waNumber,
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
    const query = req.query;
    Campaign.findOne({ query })
      .then((campaign) => {
        if (campaign) {
          res.status(200).json(campaign);
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
  static get(req, res) {
    const query = req.query;
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
}

module.exports = CampaignController;
