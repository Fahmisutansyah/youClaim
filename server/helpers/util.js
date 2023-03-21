const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const bcryptUtil = {
  hashPass(pass) {
    return bcrypt.hashSync(pass, 8);
  },
  compareHash(pass, passDb) {
    return bcrypt.compareSync(pass, passDb);
  },
};
const jwtUtil = {
  generateJwt(obj) {
    return jwt.sign({ email: obj.email, id: obj.id }, "jwt");
  },
  decodeJwt(token) {
    // JWT KEY SHOULD BE PUT IN env file
    try {
      return jwt.verify(token, "jwt");
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = { bcryptUtil, jwtUtil };
