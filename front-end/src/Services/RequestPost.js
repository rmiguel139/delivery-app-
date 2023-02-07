import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

export const requestLogin = (endpoint, body) => api.post(endpoint, body)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const validateLogin = (endpoint, token) => api.post(endpoint, {
  headers: {
    Authorization: token,
  },
});

export const getProducts = (endpoint, token) => api.get(endpoint, {
  headers: {
    Authorization: token,
  },
});

export const requestSale = (endpoint, body, headers) => api
  .post(endpoint, body, headers)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const getSellers = () => api.get('/user/sellers');

export const getCustomerOrderById = (token, id) => api.get(`/customer/orders/${id}`, {
  headers: {
    Authorization: token,
  },
});

export const getSellerOrderById = (token, id) => api.get(`/seller/orders/${id}`, {
  headers: {
    Authorization: token,
  },
});

export const changeStatus = (token, id) => api.get(`/customer/orders/finish/${id}`, {
  headers: {
    Authorization: token,
  },
});

export const getSalles = (token) => api.get('/customer/orders', {
  headers: {
    Authorization: token,
  },
});

export const getSallesSeller = (token) => api.get('/seller/orders', {
  headers: {
    Authorization: token,
  },
});

export const changeStatusSeller = (endpoint, token, id) => api
  .get(`/seller/orders/${endpoint}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
