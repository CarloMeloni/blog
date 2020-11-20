const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

//APP
const app = express()

//MIDDLEWARES
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//CORS
app.use(cors())

//ROUTES
app.get('/api', (req, res) => {
    res.json({ time: Date().toString() })
})

//PORT
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
