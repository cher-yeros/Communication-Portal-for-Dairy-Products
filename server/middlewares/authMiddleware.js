const jwt = require("jsonwebtoken");

module.exports = {
  varifyAuth(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      res.send({
        success: false,
        message: "No token found",
      });
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
        if (error) {
          res.json({
            success: false,
            message: error,
          });
        } else {
          res.user = decoded;
          next();
        }
      });
    }
  },
};
