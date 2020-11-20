//Student Microservice app
//Will Jantscher
//https://github.com/willjantscher/SDI_Project_1_Students
//the react front end runs on localhost:600

//npm install
//npm install express --save
//npm run start


import './App.css';
import React from 'react'
// import superagent from "superagent";

// const express = require('express')
// const app = express()
// const cookieParser = require('cookie-parser');
// app.use(cookieParser())
// app.use(bodyParser.json())

// fetch = require('node-fetch')
// fs = require('fs');
// await = require('await');
// async = require('async');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentInfo: {
        id: 1,
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        credit: ""
      },
    }
  } 

  Welcome() {
    // console.log(this.state.studentInfo.first_name)
    return (
      <div>
        {(() => {
           switch (this.state.studentInfo.first_name) {
              case undefined:
                  return (
                    <div>Not logged in</div>
                  )
              default:
                  return (
                    <div>Welcome {this.state.studentInfo.first_name} {this.state.studentInfo.last_name}</div>
                  )
           }
        })()}
      </div>   
    )
  }


  //do componenet did mount to get page setup with info for current student passed in as a cookie
  componentDidMount() { 
    //for testing, providing a simulated id that will be passed in via a cookie
    let id = 3;
    //load the student's data from the student_db when loading this page
    fetch(`http://localhost:6004/students/${id}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({studentInfo : result})
        // console.log(result)
      })
    // const json = response.json();
    // console.log(json);
    // this.setState({studentInfo: json});
  }


  render () {
    return (
      <div className="App">
        <header className="App-header">
          {/* welcome the student */}
          {this.Welcome()}
        </header>
      </div>
    );
  }
}

export default App;




