import React, { useState, useEffect } from 'react';
import {Card, Button} from 'react-bootstrap';
import api from '../../api/index';

import Aux from '../../hoc/Aux/Aux';
// import Product from '../../components/Product/Product';

const ProductsBuilder = () => {

    const [productsList, setProductsList] = useState([]);
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [userId, setUserId] = useState('');
    const [order,setOrder] = useState([]);

    useEffect(() => {
        api.getAllProducts()
            .then(products => {
                setProductsList(products.data);
            })
            .catch(err => console.log(err));
    }, []);
    
    const openProductHandler = async(event) => {
        event.preventDefault();
        setUserId(event.target.id);
        await api.getOneProduct(event.target.id)
                .then(res => {
                    return (
                        window.location.href = `${res.config.url}`
                    )
                })
                .catch(err => console.log(err));
    };

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
            userId: userId,
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
                        <Button id={product._id} onClick={(event) => openProductHandler(event)} variant="primary">Ver Detalhe</Button>
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
    );
};

export default ProductsBuilder;