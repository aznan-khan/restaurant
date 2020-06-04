import React, {Component} from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from "reactstrap";
import './App.css';
import Menu from "./components/MenuComponent"
import { render } from 'react-dom';

class App extends Component{
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
          <NavbarBrand href="https://coolcampsites.herokuapp.com/" >KHAN'S RESTORUANTA</NavbarBrand>
          </div> 
        </Navbar>
        <Menu />
      </div>
    );
  }
}

export default App;
