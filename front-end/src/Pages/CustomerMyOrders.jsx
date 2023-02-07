import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { getSalles } from '../Services/RequestPost';
import { getUser } from '../Helpers/LocalStorage';

function CustomerMyOrders() {
  const [salles, setSalles] = useState();
  const history = useHistory();

  const getSallesFunc = async () => {
    const { token } = getUser();
    const { data } = await getSalles(token);
    setSalles(data);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getSallesFunc();
    };
    asyncFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSalles = () => salles.map(({ id, totalPrice, status, saleDate }) => {
    const size = -4;
    const idH1 = (`000${id}`).slice(size);
    return (
      <button
        type="button"
        key={ id }
        onClick={ () => history.push(`/customer/orders/${id}`) }
      >
        <h1
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {`Pedido ${idH1}`}
        </h1>
        <h3
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </h3>
        <h3
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { saleDate }
        </h3>
        <h3
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          { totalPrice.replace('.', ',') }
        </h3>
      </button>
    );
  });

  return (
    <div>
      <NavBar />

      { salles && renderSalles() }
    </div>
  );
}

export default CustomerMyOrders;
