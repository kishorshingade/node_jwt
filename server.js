require('dotenv').config()
const host  = process.env.host
const port = process.env.port
const http = require('http')
const app = require('./app')

const  myServer = http.createServer(app)

myServer.listen(port,()=>{
    console.log(`server started on http://${host}:${port}`)
})