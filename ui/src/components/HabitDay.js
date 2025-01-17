import React from 'react';
import HabitWeek from './HabitWeek';

function HabitDay({updateHabitDay, date, habit, completed}) {

    function handleHabitClick() {
        console.log(habit.name, date)
        updateHabitDay(habit._id, date)
    }
    return (
        <div className="habit-day" >
            <label className="container">
                <input 
                    type="checkbox" 
                    id={`${habit.name}:${date}`} 
                    checked={completed}
                    onChange={handleHabitClick}/>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default HabitDay;