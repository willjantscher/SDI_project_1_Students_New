//start server/db with nodemon server.js,
//start react app with npm start
    //in cd src
// const fs = require("fs")
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const port = 6004;

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const db = require('./queries')

// test connections
app.get('/ping', (req, res) => db.ping(req, res))


// APIs
// returns all students and info
app.get('/students', (req, res) => db.getStudents(req, res))

app.post('/students',  (req, res) => db.addStudent(req, res))
// example post format
    // {
    //     "first_name": "bobby",
    //     "last_name": "dubm",
    //     "username": "hello",
    //     "password": "hmmm",
    //     "credit": "5443"
    // }

    
//need this to function
app.listen(port, () => console.log(`students server running on ${port}`));
