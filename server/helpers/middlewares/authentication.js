const { jwtUtil } = require("../util");
const { User, Merchant } = require("../../models");

function Authentication(req, res, next) {
  console.log("authenticating");
  let decode = jwtUtil.decodeJwt(req.headers.token);
  if (decode) {
    User.findOne({ email: decode.email })
      .then((user) => {
        if (user) {
          if (!user) {
            throw { msg: "No User found" };
          }
          res.locals.loggedUser = user;
          next();
        } else {
          res.status(404).json({
            msg: "Email not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: err.message,
        });
      });
  } else {
    res.status(400).json({
      msg: "Token is not valid",
    });
  }
}
function MerchantAuthentication(req, res, next) {
  const { loggedUser } = res.locals;
  if (loggedUser) {
    Merchant.findById(req.query.merchantId).then((merchant) => {
      if (
        merchant &&
        merchant.ownerId.toString() === loggedUser.id.toString()
      ) {
        res.locals.merchant = merchant;
        next();
      } else if (!merchant) {
        res.status(404).json({
          msg: "Merchant not found",
        });
      } else {
        res.status(403).json({
          msg: "Not owner of the merchant",
        });
      }
    });
  } else {
    res.status(404).json({
      msg: "No logged User",
    });
  }
}

module.exports = {
  Authentication,
  MerchantAuthentication,
};
