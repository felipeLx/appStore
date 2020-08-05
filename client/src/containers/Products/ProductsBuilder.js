import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import { Card } from 'react-bootstrap';

import Product from '../../components/Product/Product';
// import BuildControls from '../../components/Product/BuildControls/BuildControls';
// import Modal from '../../components/UI/Modal/Modal';
// import OrderSummary from '../../components/Product/OrderSummary/OrderSummary';
import * as actions from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import api from '../../api';

const ProductsBuilder = props => {

    const [products, setProducts] = useState([]);
    // const [purchasing, setPurchasing] = useState(false);
    // const [fullingCart, setFullingCart] = useState(false);
    // const [cartSetup, setCartSetup] = useState({});
    // const [tempQuantity, setTempQuantity] = useState([{}]);

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

    // const purchaseHandler = (event) => {
    //     if(props.isAuthenticated) {
    //         setPurchasing(true);
    //         const id = event.target.id;
    //         const purchased = cartSetup.filter(pr => pr.productId === id);
    //         props.onAddToCart(purchased, id);
            

    //     } else {
    //         props.history.push('/users/login');
    //     }
    // };

    // const purchaseCancelHandler = () => {
    //     setPurchasing(false);
    // };

    // const purchaseContinueHandler = () => {
    //     props.onInitPurchase();
    //     props.history.push('/checkout');
    // };

    let productArray = [];
    // let orderSummary = [];

    // const productAdd = (event) => {
    //     event.preventDefault();
    //     setFullingCart(true);
    //     const idToUpdate = event.target.id;
    //     props.onAdd(idToUpdate, 1);
    // };  

    // const productRemove = (event) => {
    //     event.preventDefault();
    //     const idToUpdate = event.target.id;
    //     props.onRemove(idToUpdate, 1);
    // };

    const addToCart = (event) => {
        event.preventDefault();
        let prId = event.target.id.toString();
        let userId = localStorage.getItem('userId');
        let product = products.filter(p => p._id === prId);
        return props.onAddToOrder({product: product}, userId);
    };
    
    if(products.length > 0){
        productArray = products.map(prd => {
            return(          
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
                
                <button id={prd._id} type="button" onClick={addToCart}>+</button>
                </Aux>
                </div>
                )                
            });
    }

    return ( 
        <Aux>            
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
        userId: state.auth.userId,
        prQuantity: state.product.quantityPerId,
        orders: state.order.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitProducts: () => dispatch(actions.initProducts()),
        onInitPurchase:  () => dispatch(actions.purchaseInit()),
        onAddToOrder: (orderData, userId) => dispatch(actions.addItemToOrder(orderData, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (ProductsBuilder);