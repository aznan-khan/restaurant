import React, {Component} from "react";
import {Card, CardImg, CardBody, CardTitle, CardText} from "reactstrap";

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
    formatDate(date) {
        const option = {year: 'numeric', month: 'short', day: 'numeric' };
        const date1 = new Date(date)
        const newdate = date1.toLocaleDateString("en-US", option)
        return newdate;
    }
    renderComment(dish) {
        if(dish != null && dish.comments != null) {
            const comm = dish.comments.map((comment) => {
                return( 
                    <li> 
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, 
                {new Intl.DateTimeFormat("en-IN", {year: "numeric", month: "short", day: "2-digit"}).format(new Date(Date.parse(comment.date)))}</li>  
                    </li>       
                ); 
            });  
            return(
                <ul className="list-unstyled">
                    <h4>Comments</h4>
                    {comm}
                </ul>
            ) 
        }
        else
            return(<div></div>);
    }
    renderDish(dish) {
        if (dish != null) {
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );     
        } 
        else
            return(
                <div></div>
            );    
    }
    render() {
        const dish = this.props.dishSelected;

        return(
            <div class="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                    </div> 
                    <div className="col-12 col-md-5 m-1">
                        
                        {this.renderComment(dish)}
                    </div>  
                </div>
            </div>
                
        );
    }
}

export default DishDetail;