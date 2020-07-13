import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = React.memo(props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

        return (
            <Aux>
                <Toolbar
                    isAuth={props.isAuthenticated}
                    isAdmin={props.isAdmin} 
                    drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={props.isAuthenticated} 
                    isAdmin={props.isAdmin} 
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
        )
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.signup.token !== null || state.auth.token !== null,
        isAdmin: state.auth.isAdmin
    };
};

export default connect (mapStateToProps) (layout);