import React from 'react';
import { Link } from 'react-router-dom';
import { getUser, removeUser } from '../Helpers/LocalStorage';
import '../CSS/NavBar.css';

function NavBarS() {
  return (
    <div className="navBar">
      <Link
        to="/seller/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Pedidos
      </Link>

      <h3
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { getUser().name }
      </h3>

      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ removeUser }
      >
        Sair
      </Link>
    </div>
  );
}

export default NavBarS;
