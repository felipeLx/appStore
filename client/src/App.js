import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import ProductsBuilder from './containers/Products/ProductsBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import './App.css';

const Product = React.lazy(() => {
  return import('./components/Product/Product');
});

const Orders = React.lazy(() => {
  return import('./components/Order/Order');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const Login = React.lazy(() => {
  return import('./containers/Auth/Login');
});

const app = React.memo(props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/user/auth" render={props => <Auth {...props} />} />
      <Route path="/user/login" render={props => <Login {...props} />} />
      <Route path='/api/:id' render={props => <Product {...props} />} />
      <Route path='/' exact render={props => <ProductsBuilder {...props} />} />
    </Switch>
  );

  if(props.isAuthenticated) {
    routes = ( 
      <Switch>
      <Route path='/api/:id' render={props => <Product {...props} />} />
      <Route path="/orders" render={props => <Orders {...props} />} />
      <Route path="/user/logout" component={Logout} />
      <Route path="/user/auth" render={props => <Auth {...props} />} />
      <Route path="/user/login" render={props => <Login {...props} />} />
      <Route path='/' exact render={props => <ProductsBuilder {...props} />} />
      <Redirect to="/" />
    </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
});

const mapStateToProps = state => {
  return {
  isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return{
  onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (app));