const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({

    name: String,
    description: String,
    workoutType: String,
    weight: Number,
    completed:Boolean
})

const Workout = mongoose.model('Workout' , workoutSchema)
module.exports = Workout