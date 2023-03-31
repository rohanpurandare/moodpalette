//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import Calendar from "./calendar/calendar"
import NavBar from "../navbar/index"
import GetDailyQuote from "./quotes/dailyQuote";
import SpotifyAuth from "./spotify/spotifyAuth";
import SongRecs from "./songRecs/songRecs"

export default function Home() {

    
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            {/*{ <SpotifyAuth></SpotifyAuth> }*/} {/*TODO: figure out a better way to do this*/}
            { <NavBar></NavBar> }
            { <Calendar></Calendar> }
            { <GetDailyQuote></GetDailyQuote> }
            { <SongRecs></SongRecs> }
         </div>
    )
}