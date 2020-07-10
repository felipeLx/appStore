import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    
    <ul className={classes.navigationItems}>
        <NavigationItem link="/" exact>Produtos</NavigationItem>
        {props.isAuthenticated 
            ? <NavigationItem link="/order">Pedidos</NavigationItem>
            : null }
        {props.isAuthenticated 
            ? <NavigationItem link="/dashboard">Dashboard</NavigationItem>
            : null}
        {!props.isAuthenticated 
            ? <NavigationItem link="/user/login">Login</NavigationItem>
            : <NavigationItem link="/user/logout">Logout</NavigationItem>}
    </ul>
    
);

export default navigationItems;