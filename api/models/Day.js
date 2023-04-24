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

    allHabits: {
        type: Array,
        default: [],
    },

    url:{
        type:String //url
    },

    emotion:{
        type:String,
    },

},

{timestamps:true});

module.exports = mongoose.model("Day", DaySchema); 


