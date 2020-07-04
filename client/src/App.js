import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProductsBuilder from './containers/Products/ProductsBuilder';
import './App.css';

const Product = React.lazy(() => {
  return import('./components/Product/Product');
});

const Orders = React.lazy(() => {
  return import('./components/Order/Order');
});

const app = React.memo(() => {

  let routes = (
    <Switch>
      <Route path='/api/:id' render={props => <Product {...props} />} />
      <Route path="/orders" render={props => <Orders {...props} />} />
      <Route path='/' exact render={props => <ProductsBuilder {...props} />} />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>...Loading</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
});

export default app;
