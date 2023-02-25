const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },

    color:{
        type:String,
    },

    vibes:{
        type:Number,
        required:true
    },

    journal:{
        type:String,
    },

},

{timestamps:true});

module.exports = mongoose.model("Day", DaySchema); 


