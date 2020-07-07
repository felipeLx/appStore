import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import ProductsBuilder from './containers/Products/ProductsBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Product = React.lazy(() => {
  return import('./components/Product/Product');
});

const Dashboard = React.lazy(() => {
  return import('./containers/Dashboard/Dashboard');
});

const ProductsController = React.lazy(() => {
  return import('./components/Controller/ProductsController');
});

const OrdersController = React.lazy(() => {
  return import('./components/Controller/OrdersController');
});

const UsersController = React.lazy(() => {
  return import('./components/Controller/UsersController');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const Login = React.lazy(() => {
  return import('./containers/Auth/Login');
});

const app = React.memo(props => {
  const { onTryAutoSignup, onTryEdit } = props;

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
      <Route path="/dashboard" render={props => <Dashboard {...props} />} />
      <Route path="/dashboard/products" render={props => <ProductsController {...props} />} />
      <Route path="/dashboard/users" render={props => <UsersController {...props} />} />
      <Route path="/dashboard/orders" render={props => <OrdersController {...props} />} />
      <Route path="/orders" render={props => <Orders {...props} />} />
      <Route path="/user/logout" component={Logout} />
      <Route path="/user/auth" render={props => <Auth {...props} />} />
      <Route path="/user/login" render={props => <Login {...props} />} />
      <Route path='/' exact render={props => <ProductsBuilder {...props} />} />
      <Redirect to="/" />
    </Switch>
    );
  }

  // if(props.isAdmin) {
  //   routes = ( 
      // <Switch>
        // <Route path="/dashboard" component={Dashboard} />
        
      // </Switch>
  //   )
  // }

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
  isAuthenticated: state.auth.token !== null,
  // isAdmin: state.auth.isAdmin !== null
  };
};

const mapDispatchToProps = dispatch => {
  return{
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
  // onTryEdit: () => dispatch(actions.adminCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (app));