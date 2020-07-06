import React, { useState } from 'react';
import { Card, Button, Form, ButtonGroup } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';

import ProductsController from '../../components/Controller/ProductsController';
import UsersController from '../../components/Controller/UsersController';
import OrdersController from '../../components/Controller/OrdersController';

const Dashboard = () => {
    // const history = useHistory();
    const [createProduct, setCreateProduct] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [newProduct, setNewProduct] = useState({
        product: '',
        brand: '',
        price: '',
        description: ''
    });

    const productsHandler = () => {
        setShowProducts(!showProducts);
        setShowOrders(false);
        setShowUsers(false);
    };

    const usersHandler = () => {
        setShowUsers(!showUsers);
        setShowOrders(false);
        setShowProducts(false);
    };

    const ordersHandler = () => {
        setShowOrders(!showOrders);
        setShowProducts(false);
        setShowUsers(false);
    };

    let form = '';

    const createUserHandler = () => {
        console.log('createUserHandler = Dashboard');   
    };

    const createHandler = () => {
        setCreateProduct(!createProduct);
        return (
            form = (
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Nome do Produto</Form.Label>
                        <Form.Control type="text" placeholder="Nome popular do produto" />
                    </Form.Group>

                    <Form.Group controlId="formBrand">
                        <Form.Label>Marca ou Fabricante</Form.Label>
                        <Form.Control type="text" placeholder="Marca ou Fabricante" />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type="text" placeholder="Preço de venda" />
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Descrição ou Características</Form.Label>
                        <Form.Control type="text" placeholder="ex. Borracha de 15cm, duas cores, flexível" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={() => createUserHandler()}>
                        ENVIAR
                    </Button>
                </Form>
            )
        )
    };
    
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <Card>
                        <Card.Title>Produtos</Card.Title>
                        <ButtonGroup>
                            <Button onClick={() => productsHandler()} className="btn btn-primary">Ver Produtos</Button>
                            <Button onClick={() => createHandler()} className="btn btn-warning">Novo Produto</Button>
                        </ButtonGroup>
                    </Card>
                </div>
                <div className="col">
                    <Card>
                        <Card.Title>Pedidos</Card.Title>
                        <Button onClick={() => ordersHandler()} variant="secondary">Ver</Button>
                        {/* <Button onClick={() => createHandler()} className="btn btn-warning">Novo Produto</Button> */}
                    </Card>
                </div>
                <div className="col">
                    <Card>
                        <Card.Title>Usuários</Card.Title>
                        <Button onClick={() => usersHandler()} variant="primary">Ver</Button>
                        {/* <Button onClick={() => createHandler()} className="btn btn-warning">Novo Usuário</Button> */}
                    </Card>
                </div>
            </div>
            <div className="row">
                {createProduct && {form}}
            </div>
            <div className="row">
                {showProducts && <ProductsController />}
            </div>
            <div className="row">
                {showUsers && <UsersController />}
            </div>
            <div className="row">
                {showOrders && <OrdersController />}
            </div>
        </div>
    );
};

export default Dashboard;