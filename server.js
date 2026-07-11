const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// creating the home page

app.get('/' , async (req , res) => {

    res.render('Home.ejs')

})

app.listen(3000 , () => {
    console.log('listining on port 3000!!!')
})