import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
// import api from '../../api/index';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const signup = React.memo(props => {
      
  const [controls, setControls] = useState({
    username: {
      elementType: 'input',
      elementConfig: {
          type: 'text',
          placeholder: 'Username'
      },
      value: '',
      validation: {
          required: true
      },
      valid: false,
      touched: false
    },
    email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'E-mail'
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

  
  const { buildingProduct, authRedirectPath ,onSetSignupRedirectPath } = props;

  useEffect(() => {
      if ( !buildingProduct && authRedirectPath !== '/' ) {
        onSetSignupRedirectPath();
      }
  }, [buildingProduct, authRedirectPath ,onSetSignupRedirectPath]);

  const inputChangedHandler = ( event, controlName ) => {
  const updatedControls = updateObject( controls, {
      [controlName]: updateObject( controls[controlName], {
          value: event.target.value,
          valid: checkValidity( event.target.value, controls[controlName].validation ),
          touched: true
      } )
  } );
    if(controls.username.value === 'admin') {
        window.alert('Username not allowed');
        setControls({
          username: {
            value: ''
          }
        });
    } else {setControls(updatedControls);}
  };

  const submitHandler = async( event ) => {
    event.preventDefault();
    const response = await props.onAuth(controls.username.value, controls.email.value, controls.password.value);
    if(!response) {
      console.log('no fetch data');
    } else {
      const expirationDate = new Date().getTime();
      localStorage.setItem('token', response._id);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.email);}
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
      authRedirect = <Redirect to='/' />
  }

  return (
    <div className="container">
      {authRedirect}
      {errorMessage}
      <div style={{ marginTop: "4rem", paddingTop: "70px" }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left"> </i> Home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Registrar</b>
            </h4>
            <p className="grey-text text-darken-1">
              Já tem uma conta? <Link to="/user/login">Login</Link>
            </p>
          </div>
              <form action="POST" onSubmit={submitHandler}>
                {form}
                <Button type='submit' btnType="Success">ENVIAR</Button>
              </form>
        </div>
      </div>
    </div>  
  );
});

const mapStateToProps = state => {
  return {
      loading: state.signup.loading,
      error: state.signup.error,
      isAuthenticated: state.signup.token !== null,
      buildingProduct: state.product.building,
      authRedirectPath: state.signup.signupRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onAuth: ( username, email, password ) => dispatch( actions.signup( username, email, password ) ),
      onSetSignupRedirectPath: () => dispatch( actions.setSignupRedirectPath( '/' ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( signup );