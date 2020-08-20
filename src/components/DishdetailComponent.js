
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, Button, BreadcrumbItem, Row, 
     Col, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const minLength = (len) => (val) => !(val) || val.length >= len;
const maxLength = (len) => (val) => (val) && val.length <= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isModalOpen: false
        }
    }
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    }
    render() {
        
        return(
            <>
                <Button outline onClick={this.toggleModal}>
                    <span> <i className='fa fa-pencil fa-lg'></i> Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        
                        <LocalForm onSubmit = {(val) => this.handleSubmit(val)} >
                            
                            <Row className='form-group'>
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model='.rating' name='rating' className='form-control'>    
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>  
                            
                            <Row className='form-group'>
                                <Label htmlFor="name" md={4}>Your name</Label>
                                <Col md={12} >
                                    <Control.text model='.name' name='name' className='form-control'
                                    validators = {{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.name'
                                        show='touched'
                                        messages={{
                                            minLength: 'Length should be more than 3',
                                            maxLength: 'Length should be less than 15'
                                        }}
                                    /> 
                                </Col>    
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea row='12' model='.comment' name='comment' className='form-control'
                                    />
                                </Col> 
                            </Row>

                            <Button type='submit' color='primary'>Submit</Button>  
                        </LocalForm>    
                    </ModalBody>
                </Modal>
            </>
        );
    }
}
class Dishdetail extends Component {
    renderDish(dish, isLoading, errMessage) {
        if(isLoading) {
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(errMessage) {
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{errMessage}</h4>
                    </div>
                </div>
            );
        }
        else {
            return (
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        
    }

    renderComments(comments, postComment, dishId) {
        var commentList = comments.map(comment => {
            return (
                <li key={comment.id} >
                    {comment.comment}
                    <br /><br />
                    -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                    <br /><br />
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                    <CommentForm dishId={dishId} postComment={postComment}/>
                </ul>
            </div>
        );
    }

    render() {
        if (this.props.dish) {
            return (
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish, this.props.dishLoading, this.props.errMessage)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.comments, this.props.postComment, this.props.dish.id) }
                        </div>   
                    </div>
                </div>
                
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

export default Dishdetail;







// import React, {Component} from "react";
// import {Card, CardImg, CardBody, CardTitle, CardText} from "reactstrap";

// class DishDetail extends Component {
    
//     formatDate(date) {
//         const option = {year: 'numeric', month: 'short', day: 'numeric' };
//         const date1 = new Date(date)
//         const newdate = date1.toLocaleDateString("en-US", option)
//         return newdate;
//     }
//     renderComment(dish) {
//         if(dish != null && dish.comments != null) {
//             const comm = dish.comments.map((comment) => {
//                 return( 
//                     <> 
//                         <li>{comment.comment}</li>
//                         <li>-- {comment.author}, 
//                 {new Intl.DateTimeFormat("en-IN", {year: "numeric", month: "short", day: "2-digit"}).format(new Date(Date.parse(comment.date)))}</li>  
//                     </>       
//                 ); 
//             });  
//             return(
//                 <ul className="list-unstyled">
//                     <h4>Comments</h4>
//                     {comm}
//                 </ul>
//             ) 
//         }
//         else
//             return(<div></div>);
//     }
//     renderDish(dish) {
//         if (dish != null) {
//             return(
//                 <Card>
//                     <CardImg width="100%" src={dish.image} alt={dish.name}/>
//                     <CardBody>
//                         <CardTitle>{dish.name}</CardTitle>
//                         <CardText>{dish.description}</CardText>
//                     </CardBody>
//                 </Card>
//             );     
//         } 
//         else
//             return(
//                 <div></div>
//             );    
//     }
//     render() {
//         const dish = this.props.dish;

//         return(
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12 col-md-5 m-1">
//                         {this.renderDish(dish)}
//                     </div> 
//                     <div className="col-12 col-md-5 m-1">
                        
//                         {this.renderComment(dish)}
//                     </div>  
//                 </div>
//             </div>
                
//         );
//     }
// }

// export default DishDetail;

