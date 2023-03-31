import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'
import React from 'react';
import Popup from 'reactjs-popup';
import './calendar.css';
import {Slider } from '@mui/material';
import { AuthContext } from "../../../context/AuthContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ChromePicker } from 'react-color'
import axios from "axios";
import "reactjs-popup/dist/index.css";
import SpotifyWebApi from 'spotify-web-api-js';
import { useContext, useState } from "react";


function App() {
//userContext for storing/accessing user specific data 
// use the auth context to get this user //from AuthContext.js

const spotifyApi = new SpotifyWebApi();

const [currRec, setCurrRec] = useState("");
const { user } = useContext(AuthContext);
console.log(user)
//const {date} = useState();

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
 //to store the retrieved data
 const [userData, setUserData] = useState({
  username: "",
  date: "",
  color: "",
  vibe: 0,
  journal: "",
  emotion: ""
 })
 

const getUserData = async (e) => {
  console.log("DATE:", date.toDateString());
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

const getRecs = async () => {
  const res = await axios.get("/spotify/fetchAccessToken", {})
  const resTwo = await axios.get(`day/getDailyData/${user.username}/${date.toDateString()}`)
    const latestres = resTwo.data[resTwo.data.length - 1];
  .then((res) => {
    
    spotifyApi.setAccessToken(res.data.accessToken);
    
    return spotifyApi.getRecommendations({
      limit:5,
      market:"ES",
      seed_artists:"4NHQUGzhtTLFvgF5SZesLK",
      seed_genres:"rock,pop,classical",
      seed_tracks:"0c6xIDDpzE81m2q797ordA",
      target_danceability:.5,
    }).then((response) => {
        console.log("THIS IS MY REC:FUCK", response)
        setCurrRec({
          name: response.tracks[0].name,
          albumArt: response.tracks[0].album.images[0].url,
          artist: response.tracks[0].artists[0].name,
          url: response.tracks[0].external_urls.spotify
        }) 
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


// to handle submission of data to the backend API
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user: ", user.username, " date: ", date.toDateString, " color: ", color, " vibe: ", vibe, " journal: ", journal, " emotion: ", emotion);
    const apiData = {
      username: user.username,
      date: date.toDateString(),
      color: color.hex,
      vibe: vibe,
      journal: journal,
      emotion: emotion,
    };
    if (emotion == null) { 
      setOpenExtra(true) 
    }
    else {
      if (emotion !== "") {
        setOpenExtra(false);
        console.log(apiData);
        await axios.post("/day/addDayInputs", apiData).then((response) => {
          console.log(response.data);
          // handle successful response
        })
        .catch((error) => {
          //console.error(error);
          console.log(error);
          // handle error response
        });
      }
      //await axios.post("/day/addDayInput", apiData);
    }
    console.log("done")
    return "";
};

 //to specify popups
 const handleDateClick = (clickedDate) => {
  if (clickedDate.toDateString() === new Date().toDateString()) {
    setOpen(true);
    setDate(clickedDate);
  } else if (clickedDate < new Date()) {
    setDate(clickedDate);
    setOpenPast(true);
  }

  // set apiData with the data you want to send to the API
  // setApiData({
  //   username: user.username,
  //   date: clickedDate.toDateString(),
  //   color: color.hex,
  //   vibe: vibe,
  //   journal: journal,
  //   emotion: emotion,
  // });
};

const marks = [
  { value: 0, label: '0'},
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

return (
 <div className="app">
   <h1 className="header"> {user.username}'s Calendar !! </h1>
   <div className="calendar-container">
     <Calendar 
        onChange={setDate} 
        value={date}
        tileClassName={({date, view}) => {
          if (view === 'month' && date <= new Date()) {
            return "react-calendar__tile--prev";
          }
        }}
        
        //adding click event to each date in calendar 
        //tileContent prop takes a function that returns a date button to be rendered in each date tile
        tileContent={({ date, view }) => {
          if (date > new Date()) {
            return null;
          }
          if (view === 'month'){
            return (
              <button onClick={() => handleDateClick(date)}>
                {date.getDate()}
              </button>
          );}
        }}
        />
   </div>
        <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
            <h2>{date.toDateString()}</h2><br />
            <p>Color of the day: </p><br />
            <center>
              <ChromePicker color={color} onChange={updatedColor => setColor(updatedColor)} disableAlpha={true}/>
            </center> <br />
            <p>Vibe Meter: </p>
            <Slider
                  aria-label="Restricted values"
                  defaultValue={25}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={marks}
                  max={50}
                  min={0}
                  onChange={(value) => {setVibe(value.target.value)}}
              />
            <p>Thought Log: </p>
            <textarea rows="4" cols="104" value={journal} onChange={(event) => setText(event.target.value)}></textarea>
            <div style={{ width: "100%", textAlign: "center" }}>
                <button style={{ display: "block", marginTop: "20px", float: "right" }} onClick={() => {
                  setOpen(false);
                  setOpenExtra(true);
                }}>Next</button>
            </div>
        </Popup>
        <Popup open={openPast} closeOnDocumentClick onClose={() => setOpenPast(false)} onOpen={(e) => getUserData(e)}>
          <h2>Past Date Popup: {date.toDateString()}</h2><br />
          <p>Vibe Meter: {userData.vibe} </p>
          <p>Journal: {userData.journal} </p>
          <p>Emotion: {userData.emotion} </p>

            <button onClick={() => setOpenPast(false)}>Close</button>
          
        </Popup>
        <Popup open={openExtra} closeOnDocumentClick onClose={() => setOpenExtra(false)}>
          <h2>Select your mood</h2>
          <br />
            <Container fluid="md">
                <Row>
                    <button class = "emoji-button" onClick={() => setEmotion("Happy")}>🙂</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Sad")}>🙁</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Stressed")}>😫</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Angry")}>😡</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Bored")}>😑</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Confused")}>🤔</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Sick")}>🤢</button>
                </Row>
                <Row>
                    <button class = "emoji-button" onClick={() => setEmotion("Calm")}>😌</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Hopeful")}>🙏</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Worried")}>😬</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Annoyed")}>😒</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Proud")}>👏</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Satisfied")}>😊</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Tired")}>🥱</button>
                </Row>
                <Row>
                    <button class = "emoji-button" onClick={() => setEmotion("Loving")}>🥰</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Scared")}>😨</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Meh")}>😶</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Distraught")}>😭</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Excited")}>🤩</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Exhausted")}>💀</button>
                    <button class = "emoji-button" onClick={() => setEmotion("Shocked")}>🤯</button>
                </Row>
              </Container>
            <br />
            <h3>Your current mood: {emotion}</h3>
            <br />
            <button onClick={() => {
                setOpenExtra(false);
                setOpen(true);
            }}>Back</button>
            <button style={{float: "right"}} onClick={handleSubmit}>Done</button>
            {console.log("color", color, "vibe", vibe, "journal", journal, "emotion", emotion)}
        </Popup>
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
  </div>
  )
}


export default App;
