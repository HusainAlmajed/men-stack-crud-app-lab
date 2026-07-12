const dotenv = require('dotenv').config() // to make the env file available 
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require("method-override"); // new

const app = express()

app.use(express.static('public'));

// connect us to mongodb using connection string in .env
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected' , () => {
    console.log(`Connected to the database: ${mongoose.connection.name}`)
})

const Workout = require('./models/Workouts.js')

app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method")); // new

// creating the home page
app.get('/' , async (req , res) => {

    res.render('Home.ejs')

})

app.get('/workouts/new' , async (req , res) =>
    
    res.render('New.ejs')

)

app.post('/workouts' , async (req , res) => {

    let workoutData = req.body

    if (req.body.completed === 'on') workoutData.completed = true
    else workoutData.completed = false

    //req.body gives the whole object
    // console.log(workoutData)

    await Workout.create(workoutData)

    res.redirect('/')

})

// Workout index route
app.get('/workouts' , async (req , res) => {
    
    // to save all the workouts in a variable
    const allWorkouts = await Workout.find()
    // console.log(allWorkouts)
    res.render('Index.ejs' , {
        allWorkouts: allWorkouts
    })

})

app.get('/workouts/:workoutId' , async (req , res) => {

    const foundWorkout = await Workout.findById(req.params.workoutId)
    // res.send(`This route renders the show page for fruit id: ${req.params.workoutId}`)
    // res.send(foundWorkout)

    res.render('Show.ejs' , {
        foundWorkout: foundWorkout
    })

})

app.delete('/workouts/:workoutId' , async (req , res) => {

    await Workout.findByIdAndDelete(req.params.workoutId)
    res.redirect('/workouts')

})

app.listen(3000 , () => {
    console.log('listining on port 3000!!!')
})