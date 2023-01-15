import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT,
    { useNewUrlParser: true }
);

// Connect to the db
const db = mongoose.connection;
// call open event once database connection is successful
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define habitDate schema (to get all habits)
 */
 const habitDateSchema = new mongoose.Schema({
    date: { type: String, required: true},
    habits: { type: Array, required: true}
});

/**
 * Retrieve all habits currently in the db
 */
const findHabits = async (filter) => {
    const query = Habit.find(filter);
    return query.exec(); 
};

/**
 * Add a new habit to be added to the db
 */
const createNewHabitDay = async (date, habits) => {
    // create an instance of model class Habit
    const habitDate = new Habit( {date: date, habits: habits}); 
    return habitDate.save();  // call save to persist this object as a document in Mongoose
    // habitDateSchema.add({habitName: 'String'});
    // return createNewHabit.save()
};

/** 
 * Update date with new habit
 */
const replaceDate = async(date, habit) => {
    let query = date; 
    // finds the date in MongoDB
    await Habit.findOne(query); 
    const habitDate = await Habit.updateOne(
        query, 
        {
            $push: {
                habits: habit
            }
        }
    );
    console.log(habitDate.modifiedCount);
};

// Compile a model from the schema
const Habit = mongoose.model("Habit", habitDateSchema);

export { findHabits, createNewHabitDay, replaceDate}; 