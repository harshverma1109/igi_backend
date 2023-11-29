const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
      token:{
        type: String
    },
     name:{
        type: String,
        required : true
      },
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required : true
    },
    profile_image:{
      type:String,
    },
    about_me:{
      type:String
    }
  });
module.exports = mongoose.model("User",userSchema);