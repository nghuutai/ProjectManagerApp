import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Member from './components/Member';
import Project from './components/Project';
import Home from './components/Home';
import Assign from './components/Assign'
import ProjectDetail from './components/ProjectDetail';

class App extends Component {
  render() {
    return (
      <Router>
        <MDBContainer>
          <Route exact path="/" component={Home} />
          <Route path="/member" component={Member} />
          <Route path="/project" component={Project} />
          <Route path="/assign" component={Assign} />
          <Route path="/projectdetail" component={ProjectDetail} />
        </MDBContainer>
      </Router>
    );
  }
}

export default App;
