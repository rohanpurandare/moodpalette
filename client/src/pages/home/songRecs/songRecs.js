import "./songRecs.css"
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import SpotifyWebApi from 'spotify-web-api-js';
import { useContext, useState } from "react";

const spotifyApi = new SpotifyWebApi();

function SongRecs() {

  const [currRec, setCurrRec] = useState("");

  const { user } = useContext(AuthContext);
  console.log(user)

  const {date} = useState();

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
          setCurrRec({
            name: response.tracks[0].name,
            albumArt: response.tracks[0].album.images[0].url,
            artist: response.tracks[0].artists[0].name,
            url: response.tracks[0].external_urls.spotify
          }) 
          try {
            axios.put("/days/" + date._id, { url: currRec.url });
          } catch (err) {
            console.log("error with editing day");
          }
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
                  <br/> <br/>
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