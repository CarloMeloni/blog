const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

//APP
const app = express()

//DATABASE
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
    .then(() => { console.log('DB CONNECTED!') })

//MIDDLEWARES
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//CORS
if(process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

//ROUTES
app.get('/api', (req, res) => {
    res.json({ time: Date().toString() })
})

//PORT
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
