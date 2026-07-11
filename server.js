const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()


app.listen(3000 , () => {
    console.log('listining on port 3000!!!')
})