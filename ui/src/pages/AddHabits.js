import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import HabitDay from '../components/HabitDay';

export const AddHabits = () => {
    const [date, setDate] = useState(''); 
    const [habit, setHabit] = useState(''); 

    const navigate = useNavigate(); 

    const addHabit = async () => {
        const newHabitDay = {date, habit};
        const response = await fetch('/', {
        method: 'POST',
        body: JSON.stringify(newHabitDay),
        headers: {
            'Content-Type': 'application/json',
        }
        });
        if (response.status == 201) {
        alert('Successfully added habit to db')
        } else {
            alert('Failed to add habit')
        };
        navigate("/");
    };
}; 

export default AddHabits; 