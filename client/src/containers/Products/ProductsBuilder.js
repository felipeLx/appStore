import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';

import api from '../../api/index';
import Aux from '../../hoc/Aux/Aux';

const ProductsBuilder = () => {

    const [productsList, setProductsList] = useState([]);
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [setOrder] = useState([]);

    useEffect(() => {
        api.getAllProducts()
            .then(products => {
                setProductsList(products.data);
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

    const closeOrderHandler = async(event) => {
        event.preventDefault();
        
        let total = orderQuantity * productsList[0].price;
        let newOrder = {
            total: total,
            userId: 1,
            productId: productsList[0]._id,
        }
        await api.insertOrder(newOrder)
            .then(order => {
                setOrder(order);
            })
            .catch(err => console.log(err));
    };

    const renderProducts = (product) => {
        return (
            <div key={product._id} className="col col-sm-6 col-lg-4 li">
                 <Card className="card" style={{ width: '18rem' }}>
                    <Card.Img className="card-img-top" variant="top" src={product.picture} />
                    <Card.Body className="card-body">
                        <Card.Title>Produto: {product.product}</Card.Title>
                        <NavLink to={`/api/${product._id}`} className="btn btn-primary">Detalhe</NavLink>
                        <hr />
                        <Card.Text>
                        Categoria: {product.category}
                        </Card.Text>
                        <Card.Text> 
                        R$ {product.price}
                        </Card.Text>
                        <Card.Text>
                        Quantidade: {orderQuantity}
                        </Card.Text>
                        <Card.Text>
                            <Button onClick={() => lessHandler()} className="btn btn-danger">-</Button>
                            <Button onClick={() => addHandler()} className="btn btn-primary">+</Button>
                        </Card.Text>
                        <Card.Text>
                        <Button onClick={(event) => closeOrderHandler(event)} className="btn btn-info">Adicionar ao pedido</Button>
                        </Card.Text>
                    </Card.Body>
                    </Card>
            </div>
        );
    };
    
    return (
        <div>
            <Aux>
                <hr />
                <div className="container cards">
                    <div className="row">
                        {productsList.map(product => {
                            return renderProducts(product);
                        })}
                    
                    </div>
                </div>
                
            </Aux>
        </div>
    );
};

export default ProductsBuilder;
