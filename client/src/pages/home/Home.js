//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"
export default function Home() {

    
    
    const { user } = useContext(AuthContext);

    return (
        <div>
            Welcome {user.username}!
        </div>
    )
}