import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import Provider from './Context/Provider';
import Home from './Components/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CustomerProducts from './Pages/CustomerProducts';
import CustomerCheckout from './Pages/CustomerCheckout';
import CustomerOrders from './Pages/CustomerOrders';
import CustomerMyOrders from './Pages/CustomerMyOrders';
import SellerOrders from './Pages/SellerOrders';
import SellerDetails from './Pages/SellerDetails';

function App() {
  return (
    // <Provider>
    <Switch>
      <Route
        path="/"
        component={ Home }
        exact
      />
      <Route
        path="/login"
        component={ Login }
        exact
      />
      <Route
        path="/register"
        component={ Register }
        exact
      />
      <Route
        path="/customer/checkout"
        component={ CustomerCheckout }
        exact
      />
      <Route
        path="/customer/products"
        component={ CustomerProducts }
        exact
      />
      <Route
        path="/customer/orders/:id"
        component={ CustomerOrders }
        exact
      />
      <Route
        path="/customer/orders"
        component={ CustomerMyOrders }
        exact
      />
      <Route
        path="/seller/orders"
        component={ SellerOrders }
        exact
      />
      <Route
        path="/seller/orders/:id"
        component={ SellerDetails }
        exact
      />
    </Switch>
    // </Provider>
  );
}

export default App;
