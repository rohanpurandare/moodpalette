import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect  } from "react";
import NavBar from "../navbar/index";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpotifyWebApi from 'spotify-web-api-js';

import emailjs from 'emailjs-com';
import SpotifyGenres from "./genre";

const spotifyApi = new SpotifyWebApi();

export default function Profile() {
  const [playlistID, setPlaylistID] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("January"); 
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const currDate = new Date().toDateString();
  const month = 3; //TODO change to db var


  useEffect(() => {
    async function getPlaylistId() {
      try {
        const monthString = selectedMonth;
        console.log("monthString",monthString);
        //const res = await axios.get(`/song/getPlaylistId/${user.username}/s${monthString}`);
        
        const currDate = new Date().toDateString()
        const currMonth = (currDate.split(" "))[1]
        const res = await axios.get(`/song/getPlaylistId/${user.username}/${currMonth}`);
        console.log("currMonth",currMonth);

        if (res) {
          setPlaylistID({id: res.data.playlistId});
        }
      } catch (err) {
        console.log("boooo");
      }
    }
    getPlaylistId();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    const selectedLabel = e.target.options[e.target.selectedIndex].text;
    setSelectedMonth(selectedLabel);
  };

  const monthOptions = [
    { value: 1, label: "Jan" },
    { value: 2, label: "Feb" },
    { value: 3, label: "Mar" },
    { value: 4, label: "Apr" },
    { value: 5, label: "May" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Aug" },
    { value: 9, label: "Sep" },
    { value: 10, label: "Oct" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dec" },
  ];

  return (
    <>
      <NavBar />
      <br />
      <br />
      <center>
        <h2>View your past playlists!</h2>
        <br />
        <select value={selectedMonth} onChange={handleMonthChange}>
          {monthOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <iframe
          src={"https://open.spotify.com/embed/playlist/" + playlistID.id + "?utm_source=generator"}
          width="75%"
          height="352"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </center>
      <br />
      <br />
    </>
  );
}
