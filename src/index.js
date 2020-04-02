
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './variables.env' });
// require('dotenv').config({path: '.env'});
const createYogaServer = require("./createServer");
const db = require("./db");

const server = createYogaServer();
// use middleware to handle cookies (JWT)
server.express.use(cookieParser())
//decode the jwt so we can get the user id on every request
// server.express.use((req, res, next) => {
//     const APP_SECRET = 'jwtsecret123'
//     const { token } = req.cookies
//     if (token) {
//         // extract userID from token
//         const { userId } = jwt.verify('token', APP_SECRET)
//         // send the userID along with every request for easy access of the user id
//         req.userId = userId
//     }

//     next()
// });






// start the server
server.start({
    cors: {
        credentials: true,
        // origin: process.env.FRONTEND_URL
        origin: 'http://localhost:8888'
    }
}, deets => {
    console.log(`server running on port http://localhost:${deets.port}`);
});
