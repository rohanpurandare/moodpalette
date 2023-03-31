const mongoose = require("mongoose");

const SpotifySchema = new mongoose.Schema({
    client_id: {
        type:String,
        required:true,
        unique: true
    },
    accessToken:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        required:true
    },
},

{timestamps:true});

module.exports = mongoose.model("Spotify", SpotifySchema);