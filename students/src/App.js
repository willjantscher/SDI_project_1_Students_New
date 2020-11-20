//Student Microservice app
//Will Jantscher
//https://github.com/willjantscher/SDI_Project_1_Students
//the react front end runs on localhost:600

//npm install
//npm install express --save
//npm run start



import './App.css';
import React from 'react'
import loadingGif from './Loading2.gif'
import studyingGif from './Studying.gif'

// used for testing
const testPort = 6004;
// const dockerPort = 6003;
//change port if working off local db or dockerizing
const port = testPort;


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentInfo: {
        id: 1,
        first_name: "",
        last_name: "",
        username: "",
        password: ""
      },
      studentQuery: false,
      studentCourses: [],
      courseQuery: false
    }
  }

  //greet the student by name when loggin in
  Welcome() {
    // console.log(this.state.studentInfo.first_name)
    return (
      <div>
        {(() => {
           switch (this.state.studentInfo.first_name) {
              case "":
                  return (
                    <div>
                      <div>Connecting to Server</div>
                      <br></br>
                      <img src={loadingGif} width="100" alt="loading" />
                    </div>
                  )
              default:
                  return (
                    <h1>Welcome {this.state.studentInfo.first_name} {this.state.studentInfo.last_name}</h1>
                  )
           }
        })()}
      </div>   
    )
  }
  //return the courses the student is currently enrolled (in a table? reference docker_shopping_app)
  Courses() {
    return (
      <div>
      {(() => {
        switch (this.state.courseQuery) {
            case true:
              // console.log('courses found')
              let output = this.state.studentCourses.map((course) => {
                return (
                  <tr key={course.id}>
                    <td>{course.course}</td>
                    <td>{course.teacher_first_name} {course.teacher_last_name}</td>
                  </tr>
                )
              })
              return(
                <table id="classes" class="classy">
                  <thead>
                    <th>Your Classes</th>
                    <tr>
                      <td>Class</td>
                      <td>Instructor</td>
                    </tr>
                  </thead>
                  <tbody>{output}</tbody>
                </table>
              )
            default:
              // console.log('searching database for courses')
                return (
                    <div>
                    <div>Querying Database</div>
                    <br></br>
                    <img src={loadingGif} width="100" alt="loading" />
                  </div>
                )
        }
      })()}
    </div>
    )   
  }

  //do componenet did mount to get page setup with info for current student passed in as a cookie
  componentDidMount() { 
    //for testing, providing a simulated id that will be passed in via a cookie
    let id = 2;
    //load the student's data from the student_db when loading this page
    fetch(`http://localhost:${port}/students/${id}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({studentInfo : result})
        // console.log(result)
      })
    //load the courses the student is taking from student_db
    fetch(`http://localhost:${port}/courses/${id}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({studentCourses : result})
        this.setState({courseQuery : true})
      })
    // const json = response.json();
    // console.log(json);
    // this.setState({studentInfo: json});
  }


  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={studyingGif} width="400" alt="loading" />
          <br></br>
          <br></br>
          <br></br>
          <div>
            {this.Welcome()}
            <br></br>
            {this.Courses()}  
          </div>
        </header>
      </div>
    );
  }
}

export default App;




