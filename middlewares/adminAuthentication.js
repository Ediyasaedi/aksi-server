const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

async function adminAuthentication(req, res, next) {
  try {
    const access_token = req.headers.access_token;
    if (!access_token)
      throw {
        name: "AuthenticationFailed",
        message: "invalid email or password",
      };
    else {
      const payload = decodeToken(access_token);

      let admin = await User.findByPk(payload.id);
      if (admin.role !== "admin")
        throw { name: "AuthorizationFailed", message: "permission denied" };
      else {
        req.adminData = admin;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { adminAuthentication };
