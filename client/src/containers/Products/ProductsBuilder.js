import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

import Product from '../../components/Product/Product';
import BuildControls from '../../components/Product/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Product/OrderSummary/OrderSummary';
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

    const getAllProducts = () => {
        try {
            api.getAllProducts()
                .then(prds => setProducts(prds.data.product) );
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
            const id = event.target.id;
            const purchased = products.filter(pr => pr._id === id);
            onAddToCart(purchased, id);
            

        } else {
            props.history.push('/checkout');
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
        products.forEach(prd => {
            productArray.push(    
                 
                <div key={prd._id}  style={{textAlign:'center', padding: '10px'}}>
                 
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
                        id={prd._id}
                        ordered={purchaseHandler}
                    />
                </Aux>
                </div>
                
            )
            
            orderSummary.push(
                <div key={prd._id}>
                <OrderSummary 
                    products={prd._id}
                    name={prd.name}
                    userId={props.userId}
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
                <div className='row row-sm-4 row-lg-8' style={{alignItems: 'center'}}>
                    {productArray}
                </div>
            </Aux>
        );
};

const mapStateToProps = state => {
    return {
        error: state.product.error,
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitProducts: () => dispatch(actions.initProducts()),
        onInitPurchase:  () => dispatch(actions.purchaseInit()),
        onAddToCart: (item, i) => dispatch(actions.addToCart(item, i))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ProductsBuilder);