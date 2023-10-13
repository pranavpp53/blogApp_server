//import env file
require('dotenv').config()


// import express
const express=require('express')
const cors=require('cors')


//import router
const router = require('./routes/router')

//import db
require('./db/connection')

//app creation
const server=express()

//connect frontent
server.use(cors())
server.use(express.json())
server.use(router)

const port=4000 || process.env.port

//export uploads folder to client
server.use('/uploads',express.static('./uploads'))

server.listen(port,()=>{
    console.log(`blog app server started at port ${port}`);
})