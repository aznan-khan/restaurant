import React from 'react';
import logo from './logo.svg';
import {Navbar, NavbarBrand} from "reactstrap";
import './App.css';
import { render } from 'react-dom';

function App() {
  // render() {
  return (
    <div className="App">
      <Navbar dark color="primary">
        <div className="container">
        <NavbarBrand href="https://coolcampsites.herokuapp.com/" >KHAN'S RESTORUANTA</NavbarBrand>
        </div> 
      </Navbar>
    </div>
  );
  // }
}

export default App;
