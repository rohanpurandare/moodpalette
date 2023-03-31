import "./songRecs.css"
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import SpotifyWebApi from 'spotify-web-api-js';
import { useContext, useState } from "react";

const spotifyApi = new SpotifyWebApi();

function SongRecs() {

  const [userData, setUserData] = useState({
    username: "",
    date: "",
    color: "",
    vibe: 0,
    journal: "",
    emotion: ""
   });  

  const [currRec, setCurrRec] = useState("");
  const { user } = useContext(AuthContext);
  console.log(user)
  //const {date} = useState();

 // const {user} = useContext(AuthContext)
 //to track selected date

 const [date, setDate] = useState(new Date())
 //to specify popups for specific dates
 const [open, setOpen] = useState(false)
 const [openPast, setOpenPast] = useState(false)
 //to open a popup when the user hasn't inputted their thought log
 const [openExtra, setOpenExtra] = useState(false)
 //to track the color
 const[color, setColor] = useState("#ffffff");
 //to track the vibe
 const[vibe, setVibe] = useState(25);
 //to track emotion
 const [emotion, setEmotion] = useState("");
 //to save text within the textbox- for journal
 const [journal, setText] = useState("");
/*const getRecs = () => {
    fetchNewSpotifyToken();
    spotifyApi.setAccessToken(user.spotifyAccessToken);

    return spotifyApi.getRecommendations({
      limit:5,
      market:"ES",
      seed_artists:"4NHQUGzhtTLFvgF5SZesLK",
      seed_genres:"rock,pop,classical",
      seed_tracks:"0c6xIDDpzE81m2q797ordA"
    }).then((response) => {
        console.log("THIS IS MY REC:", response)
        setCurrRec({
          name: response.tracks[0].name,
          albumArt: response.tracks[0].album.images[0].url,
          artist: response.tracks[0].artists[0].name,
          url: response.tracks[0].external_urls.spotify
        })
        try {
          axios.put("/days/" + date._id, { url: currRec.url });
        } catch (err) {
          console.log("error with editing age");
        }
    });
  }*/

  function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}


const getUserData = async (e) => {
  const res = await axios.get(`day/getDailyData/${user.username}/${date.toDateString()}`)
  const latestres = res.data[res.data.length - 1];
  console.log("latestres:", latestres);
  if (typeof latestres !== 'undefined') {
    setUserData({username: user.username, date: date.toDateString(), color: latestres.color, vibe: latestres.vibe, journal: latestres.journal, emotion: latestres.emotion});
  }
  else {
    setUserData({username: user.username, date: date.toDateString(), color: "", vibe: 25, journal: "", emotion: ""});
  }
  return userData;
};


  const getRecs = async (e) => {
    e.preventDefault();
    const res = await axios.get("/spotify/fetchAccessToken", {})
    .then((res) => {
      spotifyApi.setAccessToken(res.data.accessToken);
      setUserData(getUserData());
      let dance = userData.vibe/50;
      //let rgb = hexToRgb(color);
      console.log("AHHHHH", userData.color);
      
      var obj = {
        limit:5,
        market:"ES",
        seed_artists:"4NHQUGzhtTLFvgF5SZesLK",
        seed_genres:"rock,pop,classical",
        seed_tracks:"0c6xIDDpzE81m2q797ordA",
      };
      obj['target_danceability'] = dance;
      obj['target_energy'] = dance;
      obj['target_loudness'] = dance;
      obj['target_valence'] = dance;

      console.log("OBJECT:", obj)


      return spotifyApi.getRecommendations(obj).then((response) => {
          console.log("THIS IS MY REC:", response)
          setCurrRec({
            name: response.tracks[0].name,
            albumArt: response.tracks[0].album.images[0].url,
            artist: response.tracks[0].artists[0].name,
            url: response.tracks[0].external_urls.spotify
          })
          /*
          try {
            axios.put("/users/" + user._id + date, {
              url: currRec.url
            });
          } catch (err) {
            console.log("error with editing url");
          }
          */
          /*
          try {
            console.log(getUserData());
            axios.put(`/days/addSong/${userData.date}/${user.username}`, currRec.url);
          } catch (err) {
            console.log(err);
          }
          */
      });
    })
    .catch((error) => {
        console.log(error);
    });
  }

  return (
    
    <div className="recs">
        <div className="recsWrapper">
            <span className="recsDesc">
              <br/> 
                View your Song Reccomendation!
            </span>
                <br/>
                <br/>
                <div className="recsRight"></div>
                <button className="songButton" onClick={getRecs}>Song of the Day!</button>
                <div className="song">
                <a href={currRec.url}><img src={currRec.albumArt}/></a>
                  <br/> 
                  Click on the cover to view on Spotify!
                  <br/><br/>
                  <span className="recsDesc">
                  {currRec.name}
                  <br/> <br/>
                  {currRec.artist}
                  <br/> <br/> <br/>
                  </span>
                </div>
        </div>
    </div>
  );
}

export default SongRecs
