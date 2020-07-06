import React, { useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import api from '../../api/index';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const login = React.memo(props => {
      
  const [controls, setControls] = useState({
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    },
    password: {
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'Password'
        },
        value: '',
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
  }
  });

  const [isSignup, setIsSignup] = useState(true);

  const { buildingProduct, authRedirectPath ,onSetAuthRedirectPath } = props;

  useEffect(() => {
  if ( !buildingProduct && authRedirectPath !== '/' ) {
      onSetAuthRedirectPath();
  }
  }, [buildingProduct, authRedirectPath ,onSetAuthRedirectPath]);

  const inputChangedHandler = ( event, controlName ) => {
  const updatedControls = updateObject( controls, {
      [controlName]: updateObject( controls[controlName], {
          value: event.target.value,
          valid: checkValidity( event.target.value, controls[controlName].validation ),
          touched: true
      } )
  } );
  setControls(updatedControls);
  };

  const submitHandler = ( event ) => {
  event.preventDefault();
  props.onLogin( controls.email.value, controls.password.value, isSignup );
  };

  const formElementsArray = [];
  for ( let key in controls ) {
      formElementsArray.push( {
          id: key,
          config: controls[key]
      } );
  };

  let form = formElementsArray.map( formElement => (
      <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={( event ) => inputChangedHandler( event, formElement.id )} />
  ));

  if ( props.loading ) {
      form = <Spinner />
  }

  let errorMessage = null;

  if ( props.error ) {
      errorMessage = (
          <p>{props.error.message}</p>
      );
  }

  let authRedirect = null;
  if ( props.isAuthenticated ) {
      authRedirect = <Redirect to={props.authRedirectPath} />
  }

    return (
      
        <div className="container">
        <div style={{ marginTop: "4rem", paddingTop: "70px" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left"> </i> Home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b>
              </h4>
              <p className="grey-text text-darken-1">
                Ainda não tem uma conta? <Link to="/user/auth">Registrar</Link>
              </p>
            </div>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
              {form}
              <Button btnType="Success">ENVIAR</Button>
            </form>
          </div>
        </div>
        </div>
    );
});

const mapStateToProps = state => {
  return {
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null,
      buildingProduct: state.productBuilder.building,
      authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onLogin: ( email, password, isSignup ) => dispatch( actions.login( email, password, isSignup ) ),
      onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( login );