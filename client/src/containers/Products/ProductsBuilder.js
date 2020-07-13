import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {Card, Button} from 'react-bootstrap';

import Product from '../../components/Product/Product';
import BuildControls from '../../components/Product/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Product/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';

const api = axios.create({
    baseURL: '/'
});

const ProductsBuilder = props => {

    const [purchasing, setPutchasing] = useState(false)
    // const [productsList, setProductsList] = useState([]);
    // const [orderQuantity, setOrderQuantity] = useState(0);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async() => {
        try {
            const products = await props.onInitProducts();
        } catch(err) {
            console.log('Error to fetch the data from the front-end component: ' + err);
        }
    };

    console.log(props.prds);
    const updatePurchaseState = ( products ) => {
        const sum = Object.keys( products )
            .map( igKey => {
                return products[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    };

    const purchaseHandler = () => {
        if(props.isAuthenticated) {
            setPutchasing(true);
        } else {
            props.onSetSignupRedirectPath('/checkout'); 
            props.history.push('/login');
        }
    };

    const purchaseCancelHandler = () => {
        setPutchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };
    
    const disabledInfo = {
        ...props.prds
    };
    for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let product = props.error ? <p>Products can't be loaded!</p> : <Spinner />;

    if ( props.prds ) {
        product = (
            <Aux>
                <Product products={props.prds} />
                <BuildControls 
                    productAdded={props.onProductAdded}
                    productRemoved={props.onProductRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(props.prds)}
                    isAuth={props.isAuthenticated}
                    ordered={purchaseHandler}
                    price={props.price} />
            </Aux>
        );
        orderSummary = <OrderSummary 
            products={props.prds}
            price={props.price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />;
    }

        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {product}
            </Aux>
        );
};
    
//     return (
//         <div>
//             <Aux>
//                 <hr />
//                 <div className="container cards">
//                     <div className="row">
//                         return <p>Hello World</p>
//                         {/* {productsList.map(product => {
//                             return renderProducts(product); }}) */}
                    
//                     </div>
//                 </div>
                
//             </Aux>
//         </div>
//     );
// };

const mapStateToProps = state => {
    return {
        price: state.product.totalPrice,
        error: state.product.error,
        isAuthenticated: state.auth.token !== null || state.signup.token !== null,
        prds: state.product.products,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onProductAdded: (prdName) => dispatch(actions.addProduct(prdName)),
        onProductRemoved: (prdName) => dispatch(actions.removeProduct(prdName)),
        onInitProducts: () => dispatch(actions.initProducts()),
        onInitPurchase:  () => dispatch(actions.purchaseInit()),
        onSetSignupRedirectPath: (path) => dispatch(actions.setSignupRedirectPath(path)),
    };
};

export default withErrorHandler (connect(mapStateToProps, mapDispatchToProps) (ProductsBuilder), api);

//old code
{/*
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
                        {/* Quantidade: {orderQuantity} 
                        </Card.Text>
                        <BuildControls
                            productAdded={props.onProductAdded}
                            productRemoved={props.onProductRemoved}
                            disabled={disabledInfo}
                            purchasable={updatePurchaseState(props.prds)}
                            isAuth={props.isAuthenticated}
                            ordered={purchaseHandler}
                            price={props.price} />
                        <Card.Text>
                        <Button className="btn btn-info">Adicionar ao pedido</Button>
                        </Card.Text>
                    </Card.Body>
                    </Card>
            </div> 
        */}