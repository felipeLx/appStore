// product that will be render in the scream
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import api from '../../api/index';
import Aux from '../../hoc/Aux/Aux';
import ProductHandle from './ProductHandle/ProductHandle';
import classes from './Product.module.css';



const product = React.memo(props => {
    const [product, setProduct] = useState('');
    const [orderQuantity, setOrderQuantity] = useState(0);

    useEffect(() => {
        api.getOneProduct(props.match.params.id)
                .then(product => {
                    setProduct(product.data);
                })
                .catch(err => console.log(err));
    }, []);

    const addHandler = () => {
        let quantity = orderQuantity + 1;
        setOrderQuantity(quantity);
    };

    const lessHandler = () => {
        let quantity = orderQuantity - 1;
        if(quantity <= 0) {
            quantity = 0;
        }
        setOrderQuantity(quantity);
    };

    const productHandler = () => {
        return(
        <div className="col">
            <Card style={{ width: '18rem' }}>
                {/* <Card.Picture>
                    {product.picture}
                </Card.Picture> */}
                <Card.Body>
                    <Card.Title>{product.product}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
                    <Card.Text>
                    {product.description}
                    </Card.Text>
                    <Card.Text>
                        <Button onClick={() => lessHandler()} className="btn btn-danger">-</Button>
                        <Button onClick={() => addHandler()} className="btn btn-primary">+</Button>
                    </Card.Text>
                    <Card.Link href="#">Comprar</Card.Link>
                </Card.Body>
            </Card>
        </div>
        );
    };
    
    return (
        <Aux>
        <hr />
        <div className={classes.Product}>
            <div className="row">
                {productHandler()}
            </div>
        </div>
        </Aux>
    );
});

export default product;