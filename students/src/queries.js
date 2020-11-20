const Pool = require('pg').Pool
const pool = new Pool({
  //user required for docker/deployment
//   user: 'admin',
  //for docker compose/deployment use host:'db'
//   host: 'db',
  host: 'localhost',
  database: 'students_db',
  //password required for docker/deployment
//   password: 'admin',
  port: 5432,
})

function ping(req, res) {
    // console.log('recieved Ping')
    return res.send('pong');
}

//students table--------------------------------------------------------------------------------------------------
function getStudents(req, res) {
    // console.log('in getStudents')
    pool.query('SELECT * FROM students ORDER BY id', (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows)
    })
}
function getStudentById(req, res) {
    const id = parseInt(req.params.studentId)
    pool.query('SELECT * FROM students WHERE id = $1 LIMIT 1', [id], (err, results) => {
        // console.log(`the id passed in is ${id}`);
        if (err) {
            throw err;
        }
        // console.log(JSON.stringify(results.rows[0]))
        res.status(200).json(results.rows[0])
    })
}
function addStudent(req, res) {
    const { first_name, last_name, username, password} = req.body
    pool.query('INSERT INTO students (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [first_name, last_name, username, password], function(error, results) {
        if (error) {
            throw error
        }
        // console.log(JSON.stringify(results.rows))
        //console.log(results.insertId)
        res.status(201).send(`Student added to database`)
    })
}
//courses table--------------------------------------------------------------------------------------------------
function getCourses(req, res) {
    pool.query('SELECT * FROM courses ORDER BY id', (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows)
    })
}
function postCourse(req, res) {
    const { course, teacher_first_name, teacher_last_name } = req.body
    pool.query('INSERT INTO courses (course, teacher_first_name, teacher_last_name) VALUES ($1, $2, $3)', [course, teacher_first_name, teacher_last_name], function(error, results) {
        if (error) {
            throw error
        }
        res.status(201).send(`Teacher added to database`)
    })
}
//students_courses table--------------------------------------------------------------------------------------------------
function getStudentCourses(req, res) {
    const id = parseInt(req.params.studentId)
    pool.query('SELECT * FROM students_courses AS sc INNER JOIN courses AS c ON sc.course_id = c.id WHERE student_id = $1', [id], (err, results) => {
        // console.log(`the id passed in is ${id}`);
        if (err) {
            throw err;
        }
        // console.log(JSON.stringify(results.rows[0]))
        res.status(200).json(results.rows)
    })
}



module.exports = {
    ping,
    getStudents,
    getStudentById,
    addStudent,
    getCourses,
    postCourse,
    getStudentCourses,
}
