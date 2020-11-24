//Student Microservice app
//Will Jantscher
//https://github.com/willjantscher/SDI_Project_1_Students
//the react front end runs on localhost:6002 or 6003 on docker
//https://app.diagrams.net/#G1Lv49geXhtRD7t88zu8SpjHmqQDpfSxgc
//npm install
//npm install express --save
//npm run start


import './App.css';
import React from 'react'
import loadingGif from './Loading2.gif'
import studyingGif from './Studying.gif'
import ProfilePicture from './ProfilePicture'


//import the pictures
import dog_0 from './Profile_pictures/dog_0.jpg'
import dog_1 from './Profile_pictures/dog_1.jpg'
import dog_2 from './Profile_pictures/dog_2.jpg'
import dog_3 from './Profile_pictures/dog_3.jpg'
import dog_4 from './Profile_pictures/dog_4.jpg'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

// used for testing
// const testPort = 6004;
// const dockerPort = 6003;
//change port if working off local db or dockerizing
// const port = testPort;


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentInfo: {
        id: "",
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        profile_picture: 0
      },
      studentQuery: false,
      studentCourses: [],
      courseQuery: false,
      images: 
      [
        dog_0,
        dog_1,
        dog_2,
        dog_3,
        dog_4
      ]
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
                    <h1>
                      Welcome {this.state.studentInfo.first_name} {this.state.studentInfo.last_name}
                    </h1>
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
                <div>
                <div>Your Classes:</div>
                <table id="classes" className="classy">
                  <thead>
                    <tr>
                      <td>Class</td>
                      <td>Instructor</td>
                    </tr>
                  </thead>
                  <tbody>{output}</tbody>
                </table>
                </div>
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

  // do componenet did mount to get page setup with info for current student passed in as a cookie
  componentDidMount() { 
    //for testing, simulate a login requestm (include react localhost for others sending)
    // fetch('/login?username=superman&password=helloMe', { credentials: 'include' }) //this will set a cookie with the student id
    //   .then(() => {
    //     var studentId = cookies.get('student_id');
    //     // console.log(studentId)
    //     return(studentId)
    //   })
    //   .then((res) => {
    //     fetch(`/students/${res}`)
    //       .then((res) => res.json())
    //         .then((res) => {
    //           // console.log(res)
    //           this.setState({studentInfo : res})
    //       })
    //       fetch(`/courses/${res}`)
    //         .then((res) => res.json())
    //           .then((res) => {
    //             console.log(res)
    //             this.setState({studentCourses : res})
    //             this.setState({courseQuery : true})
    //         })
    //   })

      // below code for app
  var studentId = cookies.get('student_id');
  fetch(`/students/${studentId}`)
    .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        this.setState({studentInfo : res})
    })
    fetch(`/courses/${studentId}`)
      .then((res) => res.json())
        .then((res) => {
          // console.log(res)
          this.setState({studentCourses : res})
          this.setState({courseQuery : true})
      })
  }

  // handleHoverProfilePicture(event) {
  //   event.preventDefault()
  //   console.log('here I am')
  // }

  //select a new profile picture
  handleSelectProfilePicture = (event) => {
    event.preventDefault()
    // console.log('picture selected')
    let tempInfo = this.state.studentInfo;
    tempInfo.profile_picture = parseInt(event.target.value);
    // console.log(tempInfo)
    this.setState({studentInfo: tempInfo}, () => {
      // console.log(this.state.studentInfo.profile_picture)
      fetch(`/profilepic?id=${this.state.studentInfo.id}&profilepic=${this.state.studentInfo.profile_picture}`)
        .then((res) => console.log(`profile picture updated`))
    })
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
            <img src={this.state.images[this.state.studentInfo.profile_picture]} height='100' overflow='hidden' border-radius='100' alt="profile pic" />
            
            <ProfilePicture
              // onHoverProfilePicture={this.handleHoverProfilePicture}
              onSelectProfilePicture={this.handleSelectProfilePicture}
              currentPicture={this.state.studentInfo.profile_picture}
            />
            {/* {console.log(Cookies.get())} */}
            <br></br>
            {this.Courses()}  
          </div>
          
        </header>
      </div>
    );
  }
}

export default App;




