//start server/db with nodemon server.js,
//start react app with npm start
    //in cd src
const fs = require("fs")
const bodyParser = require('body-parser')

const express = require('express');
// const cors = require('cors');
const app = express();
var cookieParser = require('cookie-parser')

// const path = require('path');

const port = 6004;

// app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cookieParser())

//allow cors

// app.use(cors());

// app.options('/cookie', function (req, res) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.end();
//   });
// app.use(function(req, res) {
//     res.header("Access-Control-Allow-Origin", "http://localhost");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   });


// app.use(function(req, res, next) {  
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// }); 

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
    //     "credit": "5443",
    //     "profile_picture: 1"
    // }
//update profile picture in database
app.get('/profilepic', (req, res) => db.updateProfilePic(req, res))
//http://localhost:6004/profilepic



//login query
//will take in username and password
//respond with true or false
//if true, set cookie
app.get('/login', (req, res) => db.studentLogin(req, res))
//http://localhost:6004/login?username=something&password=something


//courses table--------------------------------------------------------------------------------------------------
app.get('/courses', (req, res) => db.getCourses(req, res))
app.post('/courses', (req, res) => db.postCourse(req, res))

//students_courses table with joins--------------------------------------------------------------------------------------------------
//get classes that student is in
app.get('/courses/:studentId', (req, res) => db.getStudentCourses(req, res));
//add a class for a student
app.post('/students_courses', (req, res) => db.postCourse(req, res))
//
// {
//     "student_id": 1,
//     "course_id": 2
// }
app.get('/cookie', (req, res) => db.getCookie(req, res))








//need this to function
app.listen(port, () => console.log(`students server running on ${port}`));
