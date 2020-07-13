import React, { useState } from 'react';
import { Card, Button, Form, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import ProductsController from '../../components/Controller/Products/ProductsController';
import UsersController from '../../components/Controller/Users/UsersController';
import OrdersController from '../../components/Controller/Orders/OrdersController';

const UserDashboard = () => {
    const [showOrders, setShowOrders] = useState(false);
    const [showUser, setShowUser] = useState(false);

    const userHandler = () => {
        setShowUser(!showUser);
        setShowOrders(false);
    };

    const ordersHandler = () => {
        setShowOrders(!showOrders);
        setShowUser(false);
    };

    let form = '';

    const createUserHandler = () => {
        console.log('createUserHandler = Dashboard');   
    };
    
    return(
        <div className="container">
            <div className="row">
                <div  className="col-md-4 col-lg-2">
                    <Card>
                        <Card.Title>Pedidos</Card.Title>
                        <Button onClick={() => ordersHandler()} variant="secondary">Ver</Button>
                    </Card>
                </div>
                <div className="col-md-4 col-lg-2">
                    <Card>
                        <Card.Title>Usuários</Card.Title>
                        <Button onClick={() => userHandler()} variant="primary">Ver</Button>
                    </Card>
                </div>
            </div>
            <div className="row">
                {showUser && <UsersController />}
            </div>
            <div className="row">
                {showOrders && <OrdersController />}
            </div>
        </div>
    );
};

export default UserDashboard;