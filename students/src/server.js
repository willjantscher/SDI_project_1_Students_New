//start server/db with nodemon server.js,
//start react app with npm start
    //in cd src

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const db = require('./queries')

app.get('/students', (req, res) => db.getStudents(req, res))
app.get('/ping', (req, res) => db.ping(req, res))

//need this to function
app.listen(6003, () => console.log('students server running'));
