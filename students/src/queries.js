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


function getCookie(req, res) {
    // res.cookie('test', 4)
    // res.cookie( 'testing','something', { httpOnly: false });
    // res.cookie('student_id', 3)
    let output = req.cookies.student_id
    console.log(output)
    // let cookie = '5'
    res.cookie('AAAAAAAAAA', 12)
        // .header('Access-Control-Allow-Origin','http://localhost:6002')
        // .header('Access-Control-Allow-Headers','http://localhost:6002')
        // .header('Access-Control-Allow-Credentials', true)
        // .header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.json('yay')
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
//update db value for student id with profile pic number
function updateProfilePic(req, res) {
    // console.log('hello there')
    let id = parseInt(req.query.id)
    let profilepic = parseInt(req.query.profilepic)
    // console.log(id, profilepic)
    pool.query('UPDATE students SET profile_picture = $2 WHERE id = $1', [id, profilepic], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).send('profile picture updated')
    })

}
// http://localhost:6004/profilepic?id=1&profilepic=1
function studentLogin(req, res) {
    let username = req.query.username
    let password = req.query.password
    res.cookie('anothertest', 'stuff')
    pool.query('SELECT * FROM students WHERE username = $1 AND password = $2', [username, password], (err, result) => {
        if (err) {
            throw err
        }
        //uf user and pass checks out
        if (result.rows[0]) {
            console.log(result.rows[0].id)
            res.cookie('01001', 00000)
            res.cookie('student_id', result.rows[0].id)
            //send back student_id
            res.status(200).send(`${result.rows[0].id}`)
        }
        else {
            res.status(403).send('0')
        }
    })
    //send back student id
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
        res.status(201).send(`Course added to database`)
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
function postCourse(req, res) {
    const { student_id, course_id } = req.body
    pool.query('INSERT INTO students_courses (student_id, course_id) VALUES ($1, $2)', [student_id, course_id], function(error, results) {
        if (error) {
            throw error
        }
        res.status(201).send(`Student signed up for course`)
    })
    // console.log(student_id, course_id)
}





module.exports = {
    ping,
    getStudents,
    getStudentById,
    addStudent,
    getCourses,
    postCourse,
    getStudentCourses,
    updateProfilePic,
    studentLogin,
    postCourse,
    getCookie
}
