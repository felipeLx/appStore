import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

const productHandle = React.memo(props => {
    const [isAdmin, setIsAdmin] = useState(false);
    const { onTryEdit, id } = props;

    useEffect(() => {
        setIsAdmin(props.isAdmin)
        onTryEdit();
      }, [onTryEdit]);

    return(
        <div>
            <h1>{id}</h1>
        </div>
    );
});

const mapStateToProps = state => {
    return {
    isAdmin: state.auth.isAdmin === true
    };
};

const mapDispatchToProps = dispatch => {
    return{
    onTryEdit: () => dispatch(actions.adminCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(productHandle);
