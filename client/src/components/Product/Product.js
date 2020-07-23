// product that will be render in the scream
import React from 'react';
import { Card, Button } from 'react-bootstrap';

import Aux from '../../hoc/Aux/Aux';

const product = React.memo(props => {
    const {id, name, category, brand, price, description, picture} = props;

    const openProductHandler = (event) => {
        event.preventDefault();
        return (
            window.location.href = `/api/${event.target.id}`
        )
    };

    const purchaseProductHandler = () => { 
        console.log('purchaseHandler');
    };

    return(
        <>
        <Aux>
            <div className='card' style={{width: '18rem'}}>
                    <img alt='' className='card-img-top' style={{display: 'flex'}} src={picture} />
                    
                        <Card.Title>{name}</Card.Title>
                        <Card.Text><strong>Preço: R$ {price.toFixed(2)}</strong></Card.Text>
                        <Card.Subtitle className='mb-2 text-muted'>Categoria: {category}</Card.Subtitle>
                        <Card.Text>Descrição: {description}</Card.Text>
                        
                        <Card.Text>Marca: {brand}</Card.Text>
                        <Button id={id} onClick={purchaseProductHandler} variant='warning'>Comprar</Button>
                        <Button id={id} onClick={openProductHandler} variant='primary'>Detalhe</Button>
            </div>
        </Aux>
        </>
    );
});

export default product;