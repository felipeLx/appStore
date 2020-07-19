import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

import Product from '../../components/Product/Product';
import BuildControls from '../../components/Product/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Product/OrderSummary/OrderSummary';
// import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import api from '../../api';

const ProductsBuilder = props => {

    const [products, setProducts] = useState([]);
    const [purchasing, setPutchasing] = useState(false);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async() => {
        try {
            await api.getAllProducts()
                .then(prds => setProducts(prds.data) );
        } catch(err) {
            console.log('Error to fetch the data in the front-end component: ' + err);
        }
    };

    // const updatePurchaseState = ( products ) => {
    //     const sum = Object.keys( products )
    //         .map( igKey => {
    //             return products[igKey];
    //         } )
    //         .reduce( ( sum, el ) => {
    //             return sum + el;
    //         }, 0 );
    //     return sum > 0;
    // };

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

    let productArray = [];
    let orderSummary = [];

    const productAdd = () => {
        setQuantity(quantity + 1)
    };

    const productRemove = () => {
        setQuantity(quantity -1);
    }

    if ( products.length > 0 ) {
        products.map(prd => {
            productArray.push(    
                 
                <Card.Body key={prd._id} style={{textAlign: 'center'}}>
                 
                <Aux>
                    <Product 
                        id={prd._id}
                        name={prd.name}
                        brand={prd.brand}
                        price={prd.price}
                        description={prd.description}
                        category={prd.category}
                        picture={prd.picture}
                    />
                    <BuildControls 
                        productAdded={productAdd}
                        productRemoved={productRemove}
                        quantity={quantity}
                        disabled={prd._id}
                        name = {prd.name}
                        purchasable={prd._id}
                        total={prd.price * quantity}
                        isAuth={props.isAuthenticated}
                        ordered={purchaseHandler}
                    />
                </Aux>
                </Card.Body>
                
            )
            
            orderSummary.push(
                <div key={prd._id}>
                <OrderSummary 
                    products={prd._id}
                    name={prd.name}
                    total={prd.price * quantity}
                    purchaseCancelled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler} />;
                </div>
            );
        })
    };

        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <div className='row row-sm-6'>
                    {productArray}
                </div>
            </Aux>
        );
};

const mapStateToProps = state => {
    return {
        error: state.product.error,
        isAuthenticated: state.auth.token !== null || state.signup.token !== null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitProducts: () => dispatch(actions.initProducts()),
        onInitPurchase:  () => dispatch(actions.purchaseInit()),
        onSetSignupRedirectPath: (path) => dispatch(actions.setSignupRedirectPath(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ProductsBuilder);