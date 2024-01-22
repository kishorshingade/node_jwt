const express = require('express')
const app = express()
const userRoute = require('./Routes/userRoute')
require('./db_connection/dbconnection')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(userRoute)

module.exports = app