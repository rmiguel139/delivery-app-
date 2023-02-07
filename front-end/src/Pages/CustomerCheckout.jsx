import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { getTotalCarLocal, getUser, getCar, setCar } from '../Helpers/LocalStorage';
import { getSellers, requestSale } from '../Services/RequestPost';

function CustomerCheckout() {
  const [carState, setCarState] = useState(getCar());
  const [total, setTotal] = useState(getTotalCarLocal());
  const [sellers, setSellers] = useState();
  const [sellerSelected, setSellerSelected] = useState();
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const history = useHistory();

  const removeById = (id) => {
    const remove = carState.find((rm) => rm.id === id);
    const subtrair = Number(remove.quantity) * Number(remove.price);
    setTotal((Number(total) - subtrair).toFixed(2));
    const newCar = carState.filter((car) => car.id !== id);
    setCarState(newCar);
    setCar(newCar);
  };

  const getSeller = async () => {
    const { data } = await getSellers();
    setSellerSelected(data[0].id);
    setSellers(data);
  };

  const createSale = async () => {
    const products = carState.map(({ id, quantity }) => ({ id, quantity }));
    const data = {
      sellerId: sellerSelected,
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      products,
    };
    const { token } = getUser();
    const headers = {
      Authorization: token,
    };

    try {
      const { saleId } = await requestSale('/customer/checkout', data, { headers });
      history.push(`/customer/orders/${saleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getSeller();
    };
    asyncFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <h2> Finalizar </h2>
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
            <td>Remover Item</td>
          </tr>
        </thead>
        <tbody>
          { carState.map((item, i) => (
            <tr key={ i }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${i}`
                }
              >
                { i + 1 }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                { item.name }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                { item.quantity }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                { item.price.replace('.', ',') }
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                { ((Number(item.price) * Number(item.quantity))
                  .toFixed(2).replace('.', ',')) }
              </td>
              <td>
                <button
                  onClick={ () => removeById(item.id) }
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                >
                  Remover
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <div>
        Total: R$
        <h2 data-testid="customer_checkout__element-order-total-price">
          {total.replace('.', ',')}
        </h2>
      </div>
      <h2> Detalhes e Endereço para Entrega </h2>
      <form>
        <label htmlFor="vendedora">
          P.Vendedora Responsável
          <select
            onChange={ ({ target: { value } }) => setSellerSelected(value) }
            id="vendedora"
            defaultValue={ sellerSelected }
            data-testid="customer_checkout__select-seller"
          >
            { sellers && sellers.map((seller) => (
              <option
                key={ seller.id }
                value={ seller.id }
              >
                {seller.name}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="name"
        >
          Endereço
          <input
            type="text"
            data-testid="customer_checkout__input-address"
            name=""
            id="name"
            onChange={ ({ target: { value } }) => setAddress(value) }
          />
        </label>
        <label
          htmlFor="numero"
        >
          Número
          <input
            data-testid="customer_checkout__input-address-number"
            type="text"
            name=""
            id="number"
            onChange={ ({ target: { value } }) => setAddressNumber(value) }
          />
        </label>
        <button
          onClick={ createSale }
          type="button"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}
export default CustomerCheckout;
