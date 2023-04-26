import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./habitChecklist.css";
import axios from "axios";
import { useState, useEffect } from "react";

const HabitChecklist = () => {
  const { user } = useContext(AuthContext);
  const [currentUser, setUser] = useState(user);
  const habits = currentUser.userHabits; // all of a user's habits
  //console.log("size", habits.length)

  const date = new Date().toDateString()
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${currentUser.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser.username]);

  console.log("currentUser", currentUser);


  const [dbCompletedHabits, setCompHabits] = useState([]);
  useEffect(() => {
    const fetchAllCompHabits = async () => {
      // async function since making api request
      try {
        const res = await axios.get(
          `day/getCompletedHabits/${currentUser.username}/${date}`
        ); // have to specify date
        let length = res.data.length;
        setCompHabits(res.data[length - 1].completedHabits);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllCompHabits();
  }, [currentUser.username]);

  console.log("dbCompletedHabits", dbCompletedHabits);

  //console.log("completed habits", dbCompletedHabits[0].completedHabits.length)

  const checklistSubmit = async (e) => {
    e.preventDefault();
    let completedHabits = [];
    var index = 0;
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        completedHabits[index] = habits[i];
        index++;
      }
    }

    const habitsLog = {
      username: currentUser.username,
      completedHabits: completedHabits,
      allHabits: habits,
      date: new Date().toDateString(),
    };


    console.log(completedHabits);
    /*if(!edit){
        await axios.post("/day/addCompletedHabits", habitsLog);
      }else{

        await axios.put("/day/updateCompletedHabits/"+ currentUser.username, {
            completedHabits: completedHabits
          });
        
      }*/

    
  //  await axios.delete("/day/deleteUpdateHack/:username/:date");
    const res = await axios.delete(`day/deleteUpdateHack/${currentUser.username}/${date}`);
		console.log(res)
    await axios.post("/day/addCompletedHabits", habitsLog);

    // fetch user
    // update local storage
    window.location.reload(false);
  };

  // user.spotifyAccessToken = res.data.access_token;
  // user.spotifyRefreshToken = res.data.refresh_token;

  // // update user object in local (browser) storage
  // const newUser = JSON.parse(localStorage.getItem("user"));
  // newUser["spotifyAccessToken"] = res.data.access_token;

  const onEditClick = (e) => {
    setEdit(true);
  };

  return (
    <>
      {((habits && dbCompletedHabits.length === 0 && habits.length!==0) || edit) && (
               
        <div>
          <h1 className="homeHeader">My Habits</h1>
          <br></br>
          <form>
            <div className="habits">
              {habits.map((habit) => (
                <div className="habit" key={habit}>
                  <input type="checkbox" />
                  <label>{habit}</label>
                </div>
              ))}
            
            </div>

            <br></br>

            <button
              className="loginButton"
              type="submit"
              onClick={checklistSubmit}
            >
              Submit
            </button>

            <br></br>
            <br></br>
            <br></br>
          </form>
        </div>
        )}
      

      {dbCompletedHabits && dbCompletedHabits.length > 0 && !edit && (
        <div>
          <h1 className="homeHeader">My Completed Habits</h1>
          <br></br>

          <div className="habits">
      

      <ul>
      {habits.map((habit) => (
        <li
          key={habit.id}
          style={dbCompletedHabits.includes(habit) ? { textDecoration: 'line-through' ,fontSize:20 } : {fontSize:20}}
        >
          {habit}
        </li>
      ))}
     </ul>

            <br></br>
            <button  
            style={{ marginRight: "10px"}}
            className="loginButton" type="submit" onClick={onEditClick}>
              Edit
            </button>
          </div>
          <br></br>
          <br></br>
          <br></br>

          {/* This div important for formatting? */}
        </div>
      )}
    </>
  );
};

export default HabitChecklist;
