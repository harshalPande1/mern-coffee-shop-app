/** @format */

const HtmlError = require("../HtmlError");
const jwt = require("jsonwebtoken");
const userAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HtmlError("authotiaction failed", 401);
    }
    
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        throw new HtmlError(err);
      } else {
        req.userId = data.id;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
module.exports = userAuth;
