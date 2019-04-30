import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Art from "./Art";
import {Heading} from 'evergreen-ui';

class Main extends Component {

  render() {

    return (
      <HashRouter>
        <div>
          <Heading is='h1' size={800} align='center'>Poetry & Art</Heading>
          <ul className="header">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/art">Generate Your Own!</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/art" component={Art}/>
          </div>
        </div>
        </HashRouter>
    );
  }
}

export default Main;
