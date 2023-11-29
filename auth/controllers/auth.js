const User = require("../../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.sign_up = async (req, res) => {
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  await User.create(data);
  return res.status(200).send({ msg: "Record inserted Successfully" });
};
exports.login = async (req, res) => {
  let data = User.findOne({ email: req.body.email });
  data.then((value) => {
    //console.log(value);
    if (value) {
      if (value.password === req.body.password) {
        if (value.token) {
          jwt.verify(
            value.token,
            process.env.SECRET_KEY,
            async function (err, decoded) {
              if (err) {
                const user = {
                  email: req.body.email,
                };
                jwt.sign(
                  { user },
                  process.env.SECRET_KEY,
                  { expiresIn: "6H" },
                  async (err, token) => {
                    await User.findOneAndUpdate(
                      { email: req.body.email },
                      { token: token }
                    );
                    res
                      .status(200)
                      .send({ msg: "Login Successful", token: token });
                  }
                );
              } else {
                res.status(200).send({
                  msg: "You are already logged in",
                  token: value.token,
                });
              }
            }
          );
        } else {
          const user = {
            email: req.body.email,
          };
          jwt.sign(
            { user },
            process.env.SECRET_KEY,
            { expiresIn: "6H" },
            async (err, token) => {
              await User.findOneAndUpdate(
                { email: req.body.email },
                { token: token }
              );
              res.status(200).send({ msg: "Login Successful", token: token });
            }
          );
        }
      } else {
        res.status(400).send({ msg: "Login unsuccessful" });
      }
    } else {
      res.status(400).send({ msg: "User not found" });
    }
  });
};
exports.check_login = (req, res) => {
  res.status(200).send({ msg: "Active" });
};
exports.logout = async (req, res) => {
  let data = await User.findOneAndUpdate(
    { email: req.token.user.email },
    { token: null }
  );
  //console.log(data);
  if (data) {
    res.status(200).json({ msg: "Logged out successfully" });
  } else {
    res.status(500).json({ msg: "No such user found" });
  }
};
