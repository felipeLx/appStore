// product that will be render in the scream
import React from 'react';
import { Card } from 'react-bootstrap';

import Aux from '../../hoc/Aux/Aux';

const product = props => (
    <>
    <Aux>
        <div className='card' style={{width: '18rem'}}>
                <img alt='' className='card-img-top' style={{display: 'flex'}} src={props.picture} />
                
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text><strong>Preço: R$ {props.price.toFixed(2)}</strong></Card.Text>
                    <Card.Subtitle className='mb-2 text-muted'>Categoria: {props.category}</Card.Subtitle>
                    <Card.Text>Descrição: {props.description}</Card.Text>
                    
                    <Card.Text>Marca: {props.brand}</Card.Text>
                    
        </div>
    </Aux>
    </>
);

export default product;