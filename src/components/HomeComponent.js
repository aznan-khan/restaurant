import React from 'react';
import { Card, CardImg, CardSubtitle, CardBody, CardText, CardTitle } from 'reactstrap';


function RenderCard({items}) {
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
function Home(props) {
    return  (
        <div className='container'>
            <div className='row align-items-start'>
                <div className='col-12 col-md m-1'>
                    <RenderCard items={props.dish}/>
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