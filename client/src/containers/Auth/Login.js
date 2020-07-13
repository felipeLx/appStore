import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';

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
          })
      });
      setControls(updatedControls);
  };

  const submitHandler = async(event) => {
    event.preventDefault();
      try {
        const response = await props.onLogin( controls.email.value, controls.password.value );
        console.log(response);
          if(!response) {
            console.log('no fetch data');
          } else {
            const expirationDate = new Date().getTime();
            localStorage.setItem('token', response._id);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.email);}
      } catch(err) {
        console.log(err);
      }
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
  if ( props.isAuthenticated || props.isAdmin ) {
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
            <b>Login</b>
          </h4>
          <p className="grey-text text-darken-1">
            Ainda não tem uma conta? <Link to="/user/signup">Registrar</Link>
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
      loading: state.auth.loading,
      error: state.auth.error,
      isAuthenticated: state.auth.token !== null || state.signup.token !== null,
      isAdmin: state.auth.isAdmin,
      buildingProduct: state.productBuilder.building,
      authRedirectPath: state.signup.signupRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onLogin: ( email, password ) => dispatch( actions.login( email, password ) ),
      onSetSignupRedirectPath: () => dispatch( actions.setSignupRedirectPath( '/' ) )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);