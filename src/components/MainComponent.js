
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

import { Switch, Route, Redirect} from 'react-router-dom';

import { DISHES } from '../shared/dishes';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            seletedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }
    
    render() {
        const HomePage = () => {
            return(
                <Home/>
            );   
        }
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component = {HomePage}/>
                    <Route exact path='/menu' component = { () => <Menu dishes = {this.state.dishes}/>}/>
                    <Redirect to='/home'/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}
export default Main;



// import React, {Component} from 'react';
// import {Navbar, NavbarBrand} from "reactstrap";
// import {DISHES} from "../shared/dishes.js";
// import Menu from "./MenuComponent"
// import DishDetail from "./DishdetailComponent";


// class Main extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       dishes: DISHES,
//       selectedDish: null
//     }
//   }
//   onDishSelect(dishId) {
//     this.setState({selectedDish: dishId}) 
//   } 
//   render() {
//     return (
//       <div>
//         <Navbar dark color="primary">
//           <div className="container">
//           <NavbarBrand href="https://coolcampsites.herokuapp.com/" >KHAN'S RESTORUANTA</NavbarBrand>
//           </div> 
//         </Navbar>
//         <Menu dishes = {this.state.dishes}
//             onClick={(dishId) => this.onDishSelect(dishId)}
//         />
//         <DishDetail dish = 
//         {this.state.dishes.filter(dish => dish.Id === this.state.selectedDish)[0]} />

//       </div>
//     );
//   }
// }

// export default Main;