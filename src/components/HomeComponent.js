import React from 'react';
import { Card, CardImg, CardSubtitle, CardBody, CardText, CardTitle } from 'reactstrap';
import {Loading} from './LoadingComponent';


function RenderCard({items, isLoading, errMessage}) {
    // if (items == null){

    //     return(<div></div>);
        
    //     }
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
        return(
            <Card>
                <CardImg src={items.image}/>
                <CardBody>
                    <CardTitle>{items.title}</CardTitle>
                    {items.designation ? <CardSubtitle>{items.designation}</CardSubtitle>: null}
                    <CardText>{items.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}
function Home(props) {
    return  (
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-1'>
                    <RenderCard items={props.dish}
                        isLoading = {props.dishesLoading}
                        errMessage = {props.dishesErrMessage}/>
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard items={props.promotion}/>
                </div>
                <div className='col-12 col-md m-1'>
                    <RenderCard items={props.leader}/>
                </div>
                
            </div>
        </div>
    );
}

export default Home;