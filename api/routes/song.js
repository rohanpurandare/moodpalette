const Song = require("../models/Song");
const router = require("express").Router();
//const bcrypt = require("bcrypt");

router.post("/addSongID", async (req, res) => {
    try {
              console.log("SONG PUSH TO DB");
              const newSong = new Song({
                  username: req.body.username,
                  songId: req.body.songId,
                  date: req.body.date,
                  playlistId: req.body.playlistId
              });
              
              const song = await newSong.save();
              return res.status(200).json(song); // send success (200)
      
    } catch (err) {
      return res.status(500).json(err);
    }
 
}); 

router.get("/getSongID/:username/:date", async (req, res)=>{
    try {
		const song = await Song.findOne({ username: req.params.username, date: req.params.date });
        console.log("SONG"+ song.songId);
		res.status(200).json(song);
	} catch (err) {
		res.status(500).json("error fetching songid");
	}
})

router.get("/getPlaylistId/:username/:month", async (req, res)=>{
  try {
  console.log(req.params.month)
  const song = await Song.findOne({ username: req.params.username, date: { $regex : req.params.month }, playlistId: { $exists: true } });
  res.status(200).json(song);
} catch (err) {
  res.status(500).json("error fetching playlistId");
}
})

router.delete("/deleteSongHack/:username/:date", async (req, res) => { //delete song object with completedHabits
    try {
      const song = await Song.findOneAndDelete({username: req.params.username, date: req.params.date});
      res.status(200).json("Song has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  });

 module.exports = router
