import React, {Component} from 'react';
import {Nav, Navbar, NavbarBrand, Jumbotron, Collapse, NavbarToggler, NavItem } from "reactstrap";
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state= {
            isOpen: false
        }  
    }
    toggleNav() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return(
            <div>
            <Navbar dark expand='md'>
                <div className="container">
                    <NavbarToggler onClick = {this.toggleNav}></NavbarToggler>
                    <NavbarBrand className='mr-auto' ><img src='assets/images/logo.png' height='30' width='41' alt='Restaurant'/></NavbarBrand>
                    <Collapse isOpen = {this.state.isOpenNav} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className='nav-link' to='/home'><span className='fa fa-home fa-lg'></span>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/menu'><span className='fa fa-list fa-lg'></span>Menu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/aboutus'><span className='fa fa-info fa-lg'></span>About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to='/contactus'><span className='fa fa-address-card fa-lg'></span>Contact Us</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div> 
            </Navbar>
            <Jumbotron>
                <div className='container'>
                    <div classsName='row row-header'>
                        <div className='col-12 col-sm-6'>
                            <h1>Ristorante con Fusion</h1>
                            <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                        </div>
                    </div>
                </div>  
            </Jumbotron>
            </div>
        );
    }
}


export default Header;