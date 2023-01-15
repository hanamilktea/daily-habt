// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import AddHabits from './pages/AddHabits.js';
import HomePage from './pages/HomePage.js';

import './App.css';
import HabitWeekDisplay from './components/HabitWeekDisplay';
import { set } from 'mongoose';

function App() {

  // const LOCAL_STORAGE_KEY = 'habitApp.habits';

  // const [habits, setHabits] = useState([
  //   {name: "drink water", dates_accomp:["1/8", "1/9", "1/10", "1/11"]},
  //   {name: "run 30 minutes", dates_accomp:["1/10", "1/11", "1/12", "1/13"]},
  //   {name: "sleep 8 hours", dates_accomp: ["1/9", "1/11", "1/13"]}
  // ]);

  // Initialize state variables to be passed down 
  const [habits, setHabits] = useState([]);
  // const dates = ["1/8", "1/9", "1/10", "1/11", "1/12", "1/13", "1/14"];

  // useEffect(() => {
  //   const storedHabits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   console.log(Boolean(storedHabits));
  //   if (storedHabits) setHabits(storedHabits);
  //   // console.log(habits);
  // }, []); 

  const loadHabits = async() => {
    const response = await fetch('/');
    const storedHabits = await response.json(); 
    if (storedHabits) {setHabits(storedHabits)};  
  }

  useEffect(() => {
    console.log(habits);
    loadHabits();
    // get days completed from the habit
    // if (typeof(habits[0]) !== undefined) {
    //   for (const habit of habits) {
    //     // console.log(habit.date_accomp);
    //     if (habit.date_accomp.length() !== 0) {
    //       addHabit(habit.)
    //     }
    //   }
    // };
    // for (let i=0; i<habits.length(); i++) {
    //   if (habits[i][1].length() !== 0) {
    //     console.log(habits[i]);
    //     }
    // }
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits))
  }, [habits]);

  // Source: https://medium.com/@quynh.totuan/how-to-get-the-current-week-in-javascript-9e64d45a9a08
  // Getting days of the week when user begins adding a habit to the app
  let curr = new Date();
  let dates = [];

  for (let i=1; i<=6; i++) {
    let first = curr.getDate() - curr.getDay() + i;
    let day = new Date(curr.setDate(first)).toLocaleDateString(); 
    // for the first iteration set the date
    // if (i===1) {
    // today = new Date(); 
    // day = new Date(new Date().setDate(today.getDate().toLocaleString())); 
    // } else {
    //   today = new Date();
    //   day = new Date(new Date().setDate(today.getDate()-i).toLocaleString()); 
    // }; 
    dates.push(day); 
  };

  // console.log(dates); 

  // Records habits and their accomplished dates
  function toggleHabitDay(name, date) {
    const newHabits = [...habits]
    const habit = newHabits.find(habit => habit.name === name)
    if (habit.dates_accomp.includes(date)) {
      habit.dates_accomp.splice(habit.dates_accomp.indexOf(date), 1);
      console.log(habit.dates_accomp);
    } else {
      habit.dates_accomp.push(date)
    }
    setHabits(newHabits);
    return name;
  };

  return (

    <div className="App">
      <HabitWeekDisplay toggleHabitDay={toggleHabitDay} setHabits={setHabits} habits={habits} dates={dates} />
      <Router>
        <Route path="/add-habit"
          element={<AddHabits toggleHabitDay={toggleHabitDay} habits={habits}/>}
        />
      </Router>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
