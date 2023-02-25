//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
import Calendar from "./calendar/calendar"
import NavBar from "../navbar/index"
import GetDailyQuote from "./quotes/dailyQuote";
export default function Home() {

    
    
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            {<NavBar></NavBar>}
            { <Calendar></Calendar> }
            { <GetDailyQuote></GetDailyQuote> }
        </div>
    )
}