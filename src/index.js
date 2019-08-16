
require('dotenv').config({path:'variables.env'});
const jwt =require('jsonwebtoken');
const createYogaServer = require("./createServer");
const db = require("./db");


const server = createYogaServer();

// start the server
server.start({
    cors:{
        credentials:true,
        origin: process.env.FRONTEND_URL,
    },          
}, deets  =>{
console.log(`server is now running on port http:/localhost:${deets.port}`);
})

