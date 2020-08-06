import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Alert from '../../components/UI/Alert/Alert';
import Product from '../../components/Product/Product';
import * as actions from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import api from '../../api';

const ProductsBuilder = props => {

    const [products, setProducts] = useState([]);
    const [purchasing] = useState(false);

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

    let productArray = [];

    const addToCart = (event) => {
        event.preventDefault();
        let prId = event.target.id.toString();
        let userId = localStorage.getItem('userId');
        let product = products.filter(p => p._id === prId);
        cartAlert(product[0].name);
        return props.onAddToOrder({product: product}, userId);
    };

    const cartAlert = name => <Alert text={`${name} adicionado ao Carrinho!`} />;
    
    const openProductHandler = (event) => {
        event.preventDefault();
        return window.location.href = `/api/${event.target.id}`; 
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
                        purchasing={purchasing}
                    />
                
                    <button type='button' style={{display: 'inline-flex', alignContent: 'space-between', padding: '10px'}} id={props.id} onClick={openProductHandler} className='btn btn-sm btn-info'>Detalhe</button>
                    <button id={prd._id} type='button' style={{display: 'inline-flex', alignContent: 'space-between', padding: '10px'}} className='btn btn-sm btn-primary' onClick={addToCart}>Comprar</button>
                
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