const jwtDecode = require("jwt-decode");
const jwt = require("jsonwebtoken");

class UtilityMehtod {
  static verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({ err: "forbidden" });
      }
      req.user = user;
      next();
    });
  };

  static findUserIdFromToken = (req) => {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken && bearerToken.split(" ")[1];

    const payload = jwtDecode(token);
    const {
      user: { _id },
    } = payload;
    return _id;
  };
}

module.exports = UtilityMehtod;
