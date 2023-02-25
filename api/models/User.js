const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },

    email:{
        type:String,
        required: true
    },

    password:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    mooPal: {
        type: String,
        default: "",
    },

    mooLahs: {
        type:Number,
        default: 0
      },

    explicit: {
        type: Boolean,
        default: "",
    },

},

{timestamps:true});

module.exports = mongoose.model("User", UserSchema); // mongoose passes model name ("User") to mongodb utils, mongodb auto adds s so this creates "users" collection


