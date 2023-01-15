import 'dotenv/config';
// import * as habits from './habits_model.mjs';
import * as habits from './habits_model.mjs';
import express, { response } from 'express';
import mongoose from 'mongoose';

const port = process.env.PORT;

// create instance of express
const app = express();

app.use(express.json());

/**
 * Add a new date/habit to the db
 */
app.post('/add-habit', async (req, res) => {
    habits.createNewHabitDay(req.body.date, [])
    .then (habit => {
        res.status(201).json(habit);
    })
    .catch (error => {
        console.error(error); 
        res.status(400).json({Error: 'Invalid Request'});
    }); 
});

// Update the date with the specified habit
app.put('/add-habit/:date', async (req, res) => {
    habits.replaceDate(req.params.date, req.body.habit)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({date: req.params.date, habits: req.body.habit})
            }
        })
})

/**
 * Retrieves all habits currently in the db.
 */
// app.get('/', (req, res) => {
//     let filter = {};
//     habits.findHabits(filter, '', 0)
//         .then(habit => {
//             if (habit !== null) {
//                 res.status(200).json(exercise)
//             } else {
//                 res.status(404).json({ Error: "Not found" })
//             }
//         }) 
//         // catch and log errors in retrieving habits
//         .catch(error => {
//             console.error(error);
//             res.status(400).json({ Error: 'Request failed.' })
//         });
// });

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`); 
});
