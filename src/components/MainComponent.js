
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
import {postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

  
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
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (values) => dispatch(postFeedback(values)),

    fetchDishes: () => { dispatch(fetchDishes())},
    fetchComments: () => { dispatch(fetchComments())},
    fetchPromos: () => { dispatch(fetchPromos())},
    fetchLeaders: () => { dispatch(fetchLeaders())},

    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
})
class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }
    
    render() {
        const HomePage = () => {
            return(
                <Home dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading = {this.props.dishes.isLoading}
                    dishesErrMessage = {this.props.dishes.errMessage}
                    promotion = {this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading = {this.props.promotions.isLoading}
                    promosErrMessage = {this.props.promotions.errMessage}
                    leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading = {this.props.leaders.isLoading}
                    leadersErrMessage = {this.props.leaders.errMessage}
                />
            );   
        }
        const DishWithId = ({match}) => {
            return(
                <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    dishLoading = {this.props.dishes.isLoading}
                    errMessage = {this.props.dishes.errMessage}
                    comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMessage = {this.props.comments.errMessage}
                    postComment = {this.props.postComment}
                />

            );
        }
        return (
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key = {this.props.location.key} classNames='page' timeout={300}>
                        <Switch>
                            <Route path='/home' component = {HomePage}/>
                            <Route exact path='/menu' component = { () => <Menu dishes = {this.props.dishes}/>}/>
                            <Route path='/menu/:dishId' component = {DishWithId} />
                            <Route path='/contactus' component = { () => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
                            <Route path='/aboutus' component = { () => <About leaders = {this.props.leaders}/>}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
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