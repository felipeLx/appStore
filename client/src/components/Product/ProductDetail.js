// product that will be render in the scream
import React, { useState, useEffect } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

import api from '../../api/index';
import Aux from '../../hoc/Aux/Aux';
import classes from './Product.module.css';

const productDetail = React.memo(props => {
    const [product, setProduct] = useState({});
    const [orderQuantity, setOrderQuantity] = useState(0);

    const productId = props.match.params.id;

    useEffect(() => {
        openDetailHandler(productId);
    }, [productId]);

    const openDetailHandler = async(id) => {
        try{
            const product = await onOpenDetail(id);
            setProduct(product);
        } catch(err) {
            console.log('not possible to open detail: ' + err);
        }
    }


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
        let card = (
            <div key={product._id} className="col col-md-4 col-lg-2">
                <Card className="card" style={{ width: '1000%' }}>
                    <Card.Img className="card-img-top" variant="top" src={product.picture} />
                    <Card.Body>
                        <Card.Title>Id: {product._id}</Card.Title>
                        <Card.Title>Nome: {product.product}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Categoria: {product.category}</Card.Subtitle>
                        <Card.Text>Descrição: {product.description}</Card.Text>
                        <Card.Text>Preço: {product.price}</Card.Text>
                        <Card.Text>Marca: {product.brand}</Card.Text>
                            <ButtonGroup className={classes.Buttons}>
                                <Button onClick={() => lessHandler()} className="btn btn-danger">-</Button>
                                <Button onClick={() => addHandler()} className="btn btn-primary">+</Button>
                            </ButtonGroup>
                        <Card.Link href="#">Comprar</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        );
    
    
    return (
        <Aux>
        <hr />
        <div className="container">
            <div className={classes.Product}>
                {card}
            </div>
        </div>
        </Aux>
    );
});

const mapStateToProps = state => {
    return();
};

const mapDispatchToProps = dispatch => {
    onOpenDetail: (id) => dispatch(actions.openProductDetail(id));
};

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps) (productDetail));