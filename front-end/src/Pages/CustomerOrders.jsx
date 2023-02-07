import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { getCustomerOrderById, changeStatus } from '../Services/RequestPost';
import { getUser } from '../Helpers/LocalStorage';

function CustomerOrders() {
  const [carState, setCarState] = useState();
  const [total, setTotal] = useState();
  const [seller, setSeller] = useState();
  const [statusState, setStatusState] = useState();
  const location = useLocation();
  const LABEL = 'customer_order_details__element-order-details-label-delivery-status';

  const getOrderByIdFunc = async () => {
    const { token } = getUser();
    const { pathname } = location;
    const idUrl = pathname.split('/')[3];
    const { data } = await getCustomerOrderById(token, idUrl);
    setCarState(data.products);
    const { id, sellerName, totalPrice, status, saleDate } = data;
    const sellerObj = { id, sellerName, totalPrice, status, saleDate };
    setSeller(sellerObj);
    setTotal(totalPrice);
    setStatusState(status);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getOrderByIdFunc();
    };
    asyncFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStatusBtn = async () => {
    const { token } = getUser();
    const { pathname } = location;
    const idUrl = pathname.split('/')[3];
    const { data } = await changeStatus(token, idUrl);
    setStatusState(data.status);
  };

  const renderSalle = ({ id, sellerName, saleDate }) => {
    const size = -4;
    const idH1 = (`000${id}`).slice(size);
    return (
      <>
        <label
          htmlFor="id"
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          <h1 id="id">{`Pedido ${idH1}`}</h1>
        </label>
        <label
          htmlFor="sellerName"
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          <h3>{`P. Vend: ${sellerName}`}</h3>
        </label>
        <label
          htmlFor="saleDate"
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          <h1>{ saleDate }</h1>
        </label>
        <label
          htmlFor="status"
          data-testid={ LABEL }
        >
          <h1>{ statusState }</h1>
        </label>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ changeStatusBtn }
          disabled={ statusState !== 'Em Trânsito' }
        >
          Marcar como entregue
        </button>
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <h2>Detalhes do Pedido</h2>
      { seller && renderSalle(seller) }
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
          </tr>
        </thead>
        <tbody>
          { carState && carState.map((item, i) => (
            <tr key={ i }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                { i + 1 }
              </td>
              <td
                data-testid={ `customer_order_details__element-order-table-name-${i}` }
              >
                { item.name }
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-quantity-${i}` }
              >
                { item.quantity }
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-unit-price-${i}` }
              >
                { item.price.replace('.', ',') }
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-sub-total-${i}` }
              >
                { item.subTotal.toFixed(2).replace('.', ',') }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <div>
        Total: R$
        <h2 data-testid="customer_order_details__element-order-total-price">
          {total && total.replace('.', ',')}
        </h2>
      </div>
    </div>
  );
}
export default CustomerOrders;
