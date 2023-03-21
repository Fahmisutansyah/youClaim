const { jwtUtil } = require("../util");
const { User } = require("../../models");

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

module.exports = {
  Authentication,
};
