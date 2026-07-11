const dotenv = require('dotenv').config() // to make the env file available 
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// connect us to mongodb using connection string in .env
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected' , () => {
    console.log(`Connected to the database: ${mongoose.connection.name}`)
})


// creating the home page
app.get('/' , async (req , res) => {

    res.render('Home.ejs')

})

app.listen(3000 , () => {
    console.log('listining on port 3000!!!')
})