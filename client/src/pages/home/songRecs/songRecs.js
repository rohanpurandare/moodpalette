function SongRecs() {

  const [currRec, setCurrRec] = useState("");

  const { user } = useContext(AuthContext);
  console.log(user)

  const {date} = useState();

/*const getRecs = () => {
    fetchNewSpotifyToken();
    spotifyApi.setAccessToken(user.spotifyAccessToken);
	@@ -42,29 +66,80 @@ function SongRecs() {
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
	@@ -86,7 +161,9 @@ function SongRecs() {
                <button className="songButton" onClick={getRecs}>Song of the Day!</button>
                <div className="song">
                <a href={currRec.url}><img src={currRec.albumArt}/></a>
                  <br/> <br/>
                  <span className="recsDesc">
                  {currRec.name}
                  <br/> <br/>
	@@ -99,4 +176,4 @@ function SongRecs() {
  );
}

export default SongRecs
