import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import ProductsBuilder from './containers/Products/ProductsBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Product from './components/Product/Product';
import * as actions from './store/actions/index';

const AdminDashboard = React.lazy(() => {
  return import('./containers/Dashboard/AdminDashboard');
});

const UserDashboard = React.lazy(() => {
  return import('./containers/Dashboard/UserDashboard');
});


const ProductsController = React.lazy(() => {
  return import('./components/Controller/Products/ProductsController');
});

const OrdersController = React.lazy(() => {
  return import('./components/Controller/Orders/OrdersController');
});

const UsersController = React.lazy(() => {
  return import('./components/Controller/Users/UsersController');
});

const OrderController = React.lazy(() => {
  return import('./components/Controller/Orders/OrderController');
});

const UserController = React.lazy(() => {
  return import('./components/Controller/Users/UserController');
});


const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Signup = React.lazy(() => {
  return import('./containers/Auth/Signup');
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
          <Route path="/user/signup" render={props => <Signup {...props} />} />
          <Route path="/user/login" render={props => <Login {...props} />} />
          <Route path='/api/:id' render={props => <Product {...props} />} />
          <Route path='/' exact render={props => <ProductsBuilder {...props} />} />
          <Redirect to="/" />
      </Switch>
  );

  if(props.isAuthenticated && !props.isAdmin) {
    routes = ( 
      <Switch>
          <Route path='/api/:id' exact component={Product} />
          <Route path="/dashboard" render={props => <UserDashboard {...props} />} />
          <Route path="/dashboard/user" render={props => <UserController {...props} />} />
          <Route path="/dashboard/orders" render={props => <OrderController {...props} />} />
          <Route path="/user/logout" component={Logout} />
          <Route path='/' exact render={props => <ProductsBuilder {...props} />} />
          <Redirect to="/" />
      </Switch>
    );
  }

  if(props.isAdmin) {
    routes = ( 
      <Switch>
          <Route path='/api/:id' exact component={Product} />
          <Route path="/" exact render={props => <ProductsBuilder {...props} />} />
          <Route path="/user/logout" component={Logout} />
          <Route path='/dashboard' render={props => <AdminDashboard {...props} />} />
          <Route path="/dashboard/products" render={props => <ProductsController {...props} />} />
          <Route path="/dashboard/user" render={props => <UsersController {...props} />} />
          <Route path="/dashboard/orders" render={props => <OrdersController {...props} />} />
          <Redirect to="/dashboard" />
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
    isAuthenticated: state.signup.token !== null || state.auth.token !== null,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (app));