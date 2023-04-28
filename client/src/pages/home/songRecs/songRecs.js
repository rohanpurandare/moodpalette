import "./songRecs.css"
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import SpotifyWebApi from 'spotify-web-api-js';
import { useContext, useState } from "react";

const spotifyApi = new SpotifyWebApi();
const MoodPaletteUserId = "31kh76sx7m4ox754hcf46zckulsy";
const currDate = new Date().toDateString();


function SongRecs() {
  const [currRec, setCurrRec] = useState("");

  const [playlistID, setPlaylistID] = useState("");


  const { user } = useContext(AuthContext);
  console.log(user)

  const {date, setDate} = useState(currDate);
  const month = 3; //TODO change to db var

  const SongDB = async (e) => {
    try {
      const inp = {
        username: user.username,
        songId: currRec.id,
        date: currDate,
        playlistId: playlistID.id
      };
      console.log("PLAYLIST TEST B4", playlistID.id);
      const res = await axios.delete(`song/deleteSongHack/${user.username}/${currDate}`);
		  console.log(res)
      await axios.post("/song/addSongID", inp).then((response) => {
        console.log(response.data);
        // handle successful response
      })
      .catch((error) => {
        //console.error(error);
        console.log(error);
        // handle error response
      });
    } catch(err) {
      console.log("SONG DB" + err.response.data)
    }
  }

  const getSongDB = async () => {
    try {
        const res = await axios.get(
          `/song/getSongID/${user.username}/${currDate}`
          );
        console.log("ATTEMPT " , res.data[0].songId);
        if (typeof res.data[0].songId !== 'undefined') {
          setCurrRec({username: user.username, date:currDate, id: res.data[0].songId});
          setPlaylistID({id: res.data[0].playlistId})
          console.log("YESSSSS", currRec.id);
        } else {
          //setCurrRec({username: user.username, date:currDate, id: ""});
        }
    } catch (err) {
      console.log(err.response.data);
    }
  }
  


  const newPlaylist = async () => {
    const id = {
      songId: currRec.id
    };
       
    const res = await axios.get("/spotify/fetchAccessToken", {})
    .then((res) => {
      spotifyApi.setAccessToken(res.data.accessToken);
      return spotifyApi.createPlaylist(MoodPaletteUserId, {
        name: "TEST PLAYLIST",
        description:"yas",
        public:true
        })
        .then((response) => {    
          console.log("THIS IS MY PLAYLIST:", response)
          
              setPlaylistID({
                id: response.id
              }) 
              //PlaylistDB();


          });
    })
    .catch((error) => {
      console.log(error);
  });
  }

  const callSongDB = async () => {
    if (currRec.id == undefined) {
      getSongDB();
    }
  }

  {callSongDB()}

  
  const addTrackToPlaylist = async () => {

    const res = await axios.get("/spotify/fetchAccessToken", {})
    .then((res) => {
      spotifyApi.setAccessToken(res.data.accessToken); 
      return spotifyApi.addTracksToPlaylist(playlistID.id, 
        ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"], 
        {"uris": [currRec.uri]})
        .then((response) => {  
          console.log("THIS IS MY ADDING TRACKS RESPONSE", response)
          });
    })
    .catch((error) => {
      console.log(error);
  });
  }


  const getRecs = async () => {
    
    const res = await axios.get("/spotify/fetchAccessToken", {})
    .then((res) => {
      spotifyApi.setAccessToken(res.data.accessToken);
      return spotifyApi.getRecommendations({
        limit:5,
        market:"ES",
        seed_artists:"4NHQUGzhtTLFvgF5SZesLK",
        seed_genres:"rock,pop,classical",
        seed_tracks:"0c6xIDDpzE81m2q797ordA"
      }).then((response) => {    
      console.log("THIS IS MY REC:", response)
          const dateMonth = new Date().getMonth();
          if (month != dateMonth) {
            newPlaylist();
            //add playlist to db
            //month = dateMonth; //TODO change to db var
          } 
          setCurrRec({
            name: response.tracks[0].name,
            albumArt: response.tracks[0].album.images[0].url,
            artist: response.tracks[0].artists[0].name,
            url: response.tracks[0].external_urls.spotify,
            id: response.tracks[0].id,
            uri: response.tracks[0].uri
          })
          SongDB();
          addTrackToPlaylist();
          try {
           // axios.put("/days/" + date._id, { url: currRec.url });
          } catch (err) {
            console.log(err);
          }
      });
    })
    .catch((error) => {
        console.log(error);
    });
    /*
    
                      <iframe src={"https://open.spotify.com/embed/playlist/" + playlistID.id + "?utm_source=generator"} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                      */
  }

  return (
    
    <div className="recs">
        <div className="recsWrapper">
            <span className="recsDesc">
              <br/> 
                View your Song Reccomendation!
            </span>
                <br/>
                <div className="recsRight"></div>
                <div className="song" value={currRec.id} data-hide-if="">
                  <br/> <br/> <br/>
                  <br/> 
                  {console.log("CURRRECID" , currRec.id)}
                  {callSongDB}
                  {currRec.id == undefined ? (
                  <div>
                    <button className="songButton" onClick={getRecs}>Song of the Day!         
                </button>
                  </div>
              ) : (
                <div>
                  <button className="songButton" onClick={getRecs}>Generate a New Song of the Day!         
                  </button>
                  <br/> <br/> <br/>
                  <br/> 
                  <iframe className="songEmbed" src= {"https://open.spotify.com/embed/track/" + currRec.id + "?utm_source=generator"} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>             
                  <br/> <br/>
                </div>
                  )}
                  {playlistID.id == undefined ? (
                  <div>
                  </div>
              ) : (
                <div>
                  <iframe src={"https://open.spotify.com/embed/playlist/" + playlistID.id + "?utm_source=generator"} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

                </div>
                  )}

                  <br/> <br/>
                  <br/> <br/> <br/>
                </div>
        </div>
    </div>
  );
}

export default SongRecs