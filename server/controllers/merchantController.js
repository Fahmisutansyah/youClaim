const { Merchant } = require("../models");
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
}

module.exports = MerchantController;
