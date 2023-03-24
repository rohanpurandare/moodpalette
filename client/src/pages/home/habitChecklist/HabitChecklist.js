import React from 'react'
import { useContext } from "react";
import { AuthContext } from '../../../context/AuthContext';
import './habitChecklist.css';
import axios from "axios";
import { useState, useEffect } from 'react';

const HabitChecklist = () => {

const {user} = useContext(AuthContext)
const [currentUser, setUser] = useState(user);
const habits = currentUser.userHabits // all of a user's habits

useEffect(() => {
    const fetchUser = async () => {
        const res = await axios.get(`/users?username=${currentUser.username}`);
        setUser(res.data);
    };
    fetchUser();
}, [currentUser.username]);

console.log("currentUser", currentUser)

const [dbCompletedHabits, setCompHabits] = useState([])
useEffect(()=>{
    const fetchAllCompHabits = async ()=>{ // async function since making api request
        try{
            const res = await axios.get(`day/getCompletedHabits/${currentUser.username}`) // have to specify date
            let length = res.data.length
            setCompHabits(res.data[length-1].completedHabits);
           
        }catch(err){
            console.log(err)
        }
    }

    fetchAllCompHabits()
},[currentUser.username])


console.log("dbCompletedHabits", dbCompletedHabits)

//console.log("completed habits", dbCompletedHabits[0].completedHabits.length)

const checklistSubmit = async (e) => {
    e.preventDefault();
    let completedHabits = [];
    var index = 0;
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    for (let i = 0 ; i < checkboxes.length; i++) {
        if(checkboxes[i].checked){
            completedHabits[index] = habits[i];
            index++;
        }
    }


    const habitsLog = {
        username: currentUser.username,
        completedHabits: completedHabits
      };

      await axios.post("/day/addCompletedHabits", habitsLog);
      window.location.reload(false);
    
  };



  return (
  
<>

{ dbCompletedHabits.length === 0 && (
              <div>
              <br></br>
              <br></br>
              <br></br>
            <h1>My Habits</h1>
            <br></br>
            <form>
           
           <div classname='habits'>
            {habits.map((habit) => (
                <div className='habit'>
                     <h3>{habit}</h3> 
                     <input type="checkbox"/>
                </div>
               
              ))}
    
    </div>

    <br></br>

    <button className="loginButton" type="submit"  onClick={checklistSubmit}>
                  Submit
                </button>
    
    <br></br>
    <br></br>
    <br></br>

    </form>
    </div>
    )}


{ dbCompletedHabits.length > 0 && (
              <div>
              <br></br>
              <br></br>
              <br></br>
            <h1>My Completed Habits</h1>
            <br></br>
        
           
           <div classname='habits'>
            {dbCompletedHabits.map((habit) => (
                <div className='habit'>
                     <h3>{habit}</h3> 
                </div>
               
              ))}
    
    </div>
    <br></br>
    <br></br>
    <br></br>

{/* This div important for formatting? */}

    </div> 
    )}






</>


  )
}

export default HabitChecklist