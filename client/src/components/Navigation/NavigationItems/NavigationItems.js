import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

// const totalPrice = cart => {
//     return cart.reduce(
//       (accum, product) => accum + product.price * product.quantity,
//       0
//     );
// };

const navigationItems = (props) => {
    return(
        <ul className={classes.navigationItems}>
            <NavigationItem link="/api" exact>Produtos</NavigationItem>
            {props.isAuthenticated && !props.isAdmin
                ? <NavigationItem link="/dashboard">Dashboard</NavigationItem>
                : null }
            {props.isAuthenticated && !props.isAdmin
                ? <NavigationItem link={`/orders/${props.userId}`}>Seu Carrinho</NavigationItem>
                : null }
            {props.isAdmin && props.isAuthenticated
                ? <NavigationItem link="/dashboard">Dashboard</NavigationItem>
                : null}
            {!props.isAuthenticated
                ? <NavigationItem link="/users/login">Login</NavigationItem>
                : <NavigationItem link="/users/logout">Logout</NavigationItem>}
            {/* {props.isAuthenticated
                ? 
                    <NavigationItem link="/cart">
                        <div className="Cart-Info">
                        <span className="Cart-Item-Counter">{props.cart.length}</span>
                        <i className="fa fa-shopping-bag"></i>
                        <p>Cart: ${totalPrice(props.cart)}</p>
                        </div>
                    </NavigationItem>
                :   null
            } */}
        </ul>
    );  
};

const mapStateToProps = state => ({
    userId: state.auth.userId
  });

export default connect(mapStateToProps)(navigationItems); 