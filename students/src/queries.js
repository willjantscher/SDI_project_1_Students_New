const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'db',
  database: 'students',
  password: 'admin',
  port: 5432,
})

const getStudents = (req,res) => {
    pool.query('SELECT * FROM students ORDER BY id', (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows)
    })
}



module.exports = {
    getStudents,
}