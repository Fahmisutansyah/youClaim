const { jwtUtil } = require("../util");
const { User, Merchant } = require("../../models");

function Authentication(req, res, next) {
  console.log("authenticating");
  let decode = "";
  try {
    decode = jwtUtil.decodeJwt(req.headers.token);
  } catch (error) {
    console.log(error.message);
  }

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
          console.log("email not found");
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

//FE STORE MERCHANTID WHEN LOGGED IN
function MerchantAuthentication(req, res, next) {
  const { loggedUser } = res.locals;
  if (req.query.merchantId.length !== 24) {
    res.status(404).json({
      msg: "Invalid merchantId",
    });
  } else if (loggedUser) {
    Merchant.findById(req.query.merchantId).then((merchant) => {
      if (merchant) {
        if (
          merchant.ownerId.toString() === loggedUser.id.toString() ||
          merchant.editorId.toString() === loggedUser.id.toString()
        ) {
          res.locals.merchant = merchant;
          next();
        }
      } else if (!merchant) {
        console.log("merchant not found");
        res.status(404).json({
          msg: "Merchant not found",
        });
      } else {
        console.log("not owner");
        res.status(403).json({
          msg: "Not owner of the merchant",
        });
      }
    });
  } else {
    console.log("no logged user");
    res.status(404).json({
      msg: "No logged User",
    });
  }
}

module.exports = {
  Authentication,
  MerchantAuthentication,
};
