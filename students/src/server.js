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


//use google drawings to design the webpage
//finalize db format for studentDB
//add studentDBinit.sql for other people to initialize in their containers
//make students_courses table and post request handling
//get courses for a student (know the courses table post format)


const db = require('./queries')

// test connections
app.get('/ping', (req, res) => db.ping(req, res))


// APIs
//students table--------------------------------------------------------------------------------------------------
// returns all students and info
app.get('/students', (req, res) => db.getStudents(req, res))
// return student with requested id
app.get('/students/:studentId', (req, res) => db.getStudentById(req, res));
// add a student
app.post('/students', (req, res) => db.addStudent(req, res))
// example post format
    // {
    //     "first_name": "bobby",
    //     "last_name": "dubm",
    //     "username": "hello",
    //     "password": "hmmm",
    //     "credit": "5443"
    // }

//courses table--------------------------------------------------------------------------------------------------
app.get('/courses', (req, res) => db.getCourses(req, res))
app.post('/courses', (req, res) => db.postCourse(req, res))

//students_courses table with joins--------------------------------------------------------------------------------------------------
app.get('/courses/:studentId', (req, res) => db.getStudentCourses(req, res));











//need this to function
app.listen(port, () => console.log(`students server running on ${port}`));
