const Pool = require('pg').Pool
const pool = new Pool({
    //user required for docker/deployment
  //user: 'admin',
  // for docker compose/deployment use 
  //host: 'db'
  host: 'localhost',
  database: 'students_db',
  //password required for docker/deployment
  //password: 'admin',
  port: 5432,
})

function ping(req,res) {
    console.log('recieved Ping')
    return res.send('pong');
}

function getStudents(req,res) {
    console.log('in getStudents')
    pool.query('SELECT * FROM students ORDER BY id', (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows)
    })
}

function addStudent(req,res) {
    const { first_name, last_name, username, password, credit} = req.body
    pool.query('INSERT INTO students (first_name, last_name, username, password, credit) VALUES ($1, $2, $3, $4, $5) RETURNING *', [first_name, last_name, username, password, credit], function(error, results) {
        if (error) {
            throw error
        }
        // console.log(JSON.stringify(results.rows))
        //console.log(results.insertId)
        res.status(201).send(`Student added to database`)
    })
}

module.exports = {
    ping,
    getStudents,
    addStudent,
}
