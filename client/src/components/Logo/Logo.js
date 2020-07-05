import React from 'react';

import brandLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={brandLogo} alt="MyLogo" />
    </div>
);

export default logo;