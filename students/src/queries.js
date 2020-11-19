const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'db',
  database: 'students-db',
  password: 'admin',
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

module.exports = {
    getStudents,
    ping,
}
