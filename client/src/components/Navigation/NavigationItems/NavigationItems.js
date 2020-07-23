import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
// import ThemeButton from '../../ThemeContext/ThemeButton';

const navigationItems = (props) => {

    return(
        <ul className={classes.navigationItems}>
            <NavigationItem link="/api" exact>Produtos</NavigationItem>
            {props.isAuthenticated && !props.isAdmin
                ? <NavigationItem link="/dashboard">Dashboard</NavigationItem>
                : null }
            {props.isAdmin && props.isAuthenticated
                ? <NavigationItem link="/dashboard">Dashboard</NavigationItem>
                : null}
            {!props.isAuthenticated
                ? <NavigationItem link="/users/login">Login</NavigationItem>
                : <NavigationItem link="/users/logout">Logout</NavigationItem>}
            {/* <ThemeButton /> */}
        </ul>
    );  
};

export default navigationItems;