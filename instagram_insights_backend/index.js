const express = require("express");
const User = require("./models/user");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const authRoutes = require("./auth/routes/auth");
const profileRoutes = require("./profile/routes/profile");
const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const fs = require("fs");
const https = require("https");

app.post(
  "/auth/facebook/token",
  passport.authenticate("facebook-token"),
  (req, res) => {
    console.log("working login");
    // Handle the successful authentication response
    res.send(req.user ? 200 : 401);
  }
);

//connection
mongoose.connect(
  "mongodb+srv://raj:raj@cluster0.aeacp5p.mongodb.net/igi?retryWrites=true&w=majority"
);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

//need to check how to add errors statement?

var cors = require("cors");
app.use(cors());
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Expose the uploded files
app.use("/uploads/avatar", express.static("uploads/avatar"));

//My Routes
app.use("/authentication-node", authRoutes);
app.use("/profile-node", profileRoutes);

//testing api
// app.get("/logout", (req, res) => {
//   res.send({ msg: "hello world" });
// });

// Logout route for fb
app.get("/logout", (req, res) => {
  // Successful logout
  console.log(passport.authenticate(req.query.accessToken));
  //console.log("working", req.query.accessToken);
  res.status(200).json({ message: "Logout successful" });
});

app.post("/setFBTokens", (req, res) => {
  passport.use(
    new FacebookTokenStrategy(
      {
        //clientID: "2654254701391011",
        //clientSecret: "dd0e0ceb3f2cda35d2f7c35b7f4ff42a",
        clientID: req.body.appId,
        clientSecret: req.body.appSecret,
      },
      (accessToken, refreshToken, profile, done) => {
        // You can customize how user data is stored in your database
        // For example, create or find a user based on Facebook profile
        // Save user to the database and call `done` to continue the authentication process
        // Example:
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
        // Return the user object to indicate successful logout
        return done(null, profile);
      }
    )
  );

  app.use(passport.initialize());
});

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
