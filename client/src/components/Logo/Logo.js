import React from 'react';

import brandLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <a href='/'><img src={brandLogo} alt="MyLogo" /></a>
    </div>
);

export default logo;