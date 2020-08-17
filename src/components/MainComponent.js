
import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutUsComponent';

import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addComment} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        seletedDish: state.selectedDish
    };
}
const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
})
class Main extends Component {
    constructor(props) {
        super(props);
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }
    
    render() {
        const HomePage = () => {
            return(
                <Home dish = {this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion = {this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader = {this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );   
        }
        const DishWithId = ({match}) => {
            return(
                <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    addComment = {this.props.addComment}
                />

            );
        }
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component = {HomePage}/>
                    <Route exact path='/menu' component = { () => <Menu dishes = {this.props.dishes}/>}/>
                    <Route path='/menu/:dishId' component = {DishWithId} />
                    <Route path='/contactus' component = {Contact}/>
                    <Route path='/aboutus' component = { () => <About leaders = {this.props.leaders}/>}/>
                    <Redirect to='/home'/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));



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