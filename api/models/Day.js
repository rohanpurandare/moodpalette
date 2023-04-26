const mongoose = require("mongoose");

const DaySchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },

    date:{
        type:String,
    },

    color:{
        type:String,
    },

    vibe:{
        type:Number,
    },

    journal:{
        type:String,
    },

    completedHabits: {
        type: Array,
        default: [],
    },

    songId:{
        type:String, //SONG id: use with embedding code to display
        //default: ""
    },

    emotion:{
        type:String,
    },

},

{timestamps:true});

module.exports = mongoose.model("Day", DaySchema); 


