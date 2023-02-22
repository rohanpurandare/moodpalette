//HOME PAGE FRONTEND CODE
import { React, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./home.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import emailjs from 'emailjs-com';

const notify = () => {
    toast("Make sure to fill out your Mood Palette for the day!");
}

export default function Home() {

    function sendEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    
        emailjs.sendForm('service_t3oalh7', 'template_zh4imic', e.target, 'QDfiNV70JdveqlrKq')
          .then((result) => {
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log(error.text);
          });
      }
    
    const { user } = useContext(AuthContext);

    return (
        
        <div style="text-align:center">
            Welcome {user.username}!
            <br/>
            <button onClick={notify}>Notify!</button>
            <form className="contact-form" onSubmit={sendEmail}>
                <input type="hidden" name="contact_number" />
                <label>Name</label>
                <input type="text" name="from_name" />
                <br/>
                <label>Email</label>
                <input type="email" name="from_email" />
                <br/>
                <label>Time</label>
                <input type="time" name="from_time" />
                <br/>
                <label>Subscribe</label>
                <input type="checkbox" name="from_checkbox"/>
                <br/>
                <input type="submit" value="Send" />
                </form>
            <ToastContainer/>
        </div>
        

    );
}
