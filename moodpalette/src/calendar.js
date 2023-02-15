import {useState} from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './calendar.css';

function App() {
 const [date, setDate] = useState(new Date())
 //to specify popups for specific dates
 const [open, setOpen] = useState(false)
 const [openPast, setOpenPast] = useState(false)
 //to save text within the textbox
 const [text, setText] = useState("");

 const handleDateClick = (clickedDate) => {
  if (clickedDate.toDateString() === new Date().toDateString()) {
    setOpen(true);
    setDate(clickedDate);
  } else if (clickedDate < new Date()) {
    setOpenPast(true);
    setDate(clickedDate);
  }
};

return (
 <div className="app">
   <h1 className="header"> Mood Palette Calendar !! </h1>
   <div className="calendar-container">
     <Calendar 
        onChange={setDate} 
        value={date}
        
        tileClassName={({date, view}) => {
          if (date <= new Date()) {
            return "react-calendar__tile--prev";
          }
        }}
        
        //adding click event to each date in calendar 
        //tileContent prop takes a function that returns a date button to be rendered in each date tile
        tileContent={({ date, view }) => {
          // check if the date is in the future
          const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
          ];
          let decadeStart = ((date.getFullYear() / 10).toFixed(0) * 10) + 1;
          let decadeEnd = decadeStart + 9;
          if (date > new Date()) {
            return null;
          }
          if (view === 'month'){
            return (
              <button onClick={() => handleDateClick(date)}>
                {date.getDate()}
              </button>
          
            );
          }
          else if (view === 'year') {
            return(
              <button>
                {monthNames[date.getMonth()]}
              </button>
            )
          }
          else if (view === 'decade') {
            return(
              <button>
                {date.getFullYear()}
              </button>
            )
          }
          else {
            return(
              <button>
                {decadeStart} - {decadeEnd}
              </button>
            )
          }
        }}
        />
   </div>
   <div className="popup-container">
        <Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
          <div className="popup-content">
            <h2>{date.toDateString()}</h2>
            <p>Color of the day: </p>
            <p>Vibe Meter: </p>
            <p>Thought Log: </p>
            <textarea rows="4" cols="40" value={text} onChange={(event) => setText(event.target.value)}></textarea>
            <div style={{ width: "100%", textAlign: "center" }}>
                <button style={{ display: "block", marginTop: "20px" }} onClick={() => setOpen(false)}>Done</button>
            </div>
          </div>
        </Popup>
      </div>
   <div className="popup-container2">
        <Popup open={openPast} closeOnDocumentClick onClose={() => setOpenPast(false)}>
          <div className="popup-content">
          <h2>Past Date Popup</h2>
            <p>The selected past date is: {date.toDateString()}</p>
            <button onClick={() => setOpenPast(false)}>Close</button>
          </div>
        </Popup>
      </div>
 </div>
  )
}


export default App;
