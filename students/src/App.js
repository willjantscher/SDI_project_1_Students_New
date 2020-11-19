//Student Microservice app
//Will Jantscher
//https://github.com/willjantscher/SDI_Project_1_Students
//the react front end runs on localhost:6001

//npm install
//npm install express --save

//npm run start


import './App.css';
import React from 'react'
// const express = require('express')
// const somthing = express()


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  //do componenet did mount to get page setup with info for current student passed in as a cookie

  
  render () {
    return (
      <div className="App">
        <header className="App-header">
          Student
        </header>
      </div>
    );
  }
}

export default App;




