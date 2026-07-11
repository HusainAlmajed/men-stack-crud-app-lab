const dotenv = require('dotenv').config() // to make the env file available 
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')


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

app.listen(3000 , () => {
    console.log('listining on port 3000!!!')
})