import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Member from './components/Member';
import Project from './components/Project';
import Nav from './components/Nav';
import Assign from './components/Assign'

class App extends Component {
  render() {
    return (
      <Router>
        <MDBContainer>
          <Route exact path="/" component={Nav} />
          <Route path="/member" component={Member} />
          <Route path="/project" component={Project} />
          <Route path="/assign" component={Assign} />
        </MDBContainer>
      </Router>
    );
  }
}

export default App;
