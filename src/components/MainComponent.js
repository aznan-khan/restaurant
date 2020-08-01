
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutUsComponent';

import { Switch, Route, Redirect} from 'react-router-dom';

import { DISHES } from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
            seletedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }
    
    render() {
        const HomePage = () => {
            return(
                <Home dish = {this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion = {this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader = {this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );   
        }
        const DishWithId = ({match}) => {
            return(
                <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                />

            );
        }
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component = {HomePage}/>
                    <Route exact path='/menu' component = { () => <Menu dishes = {this.state.dishes}/>}/>
                    <Route path='/menu/:dishId' component = {DishWithId} />
                    <Route path='/contactus' component = {Contact}/>
                    <Route path='/aboutus' component = { () => <About leaders = {this.state.leaders}/>}/>
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