const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

exports.verifyToken = (req, res, next) => {
  //console.log("working");
  //verify a token symmetric
  jwt.verify(
    req.headers.authorization,
    process.env.SECRET_KEY,
    async function (err, decoded) {
      if (err) res.status(400).send({ msg: "Invalid Token" });
      else {
        //console.log(req.headers.authorization);
        //console.log(decoded);
        let data = await User.findOne({
          email: decoded.user.email,
          token: req.headers.authorization,
        }).select({ password: 0 });
        //console.log(data);
        if (data) {
          //console.log("decoded:", decoded);
          req.token = decoded;
          next();
        } else res.status(400).send({ msg: "Token Expired" });
      }
    }
  );
};
