const USER = 'user';
const REGISTER = 'register';
const CAR = 'car';
const TOTAL = 'total';

export const setUser = (data) => localStorage.setItem(USER, JSON.stringify(data));

export const setRegister = (data) => localStorage.setItem(REGISTER, JSON.stringify(data));

export const getUser = () => {
  const userLocal = JSON.parse(localStorage.getItem(USER));
  if (userLocal) return userLocal;
  return null;
};

export const removeUser = () => {
  localStorage.removeItem(USER);
  localStorage.removeItem(CAR);
  localStorage.removeItem(TOTAL);
};

export const setCar = (data) => localStorage.setItem(CAR, JSON.stringify(data));

export const getCar = () => {
  if (localStorage.getItem(CAR)) {
    return JSON.parse(localStorage.getItem(CAR));
  }
  return [];
};

export const setTotalCar = (data) => localStorage.setItem(TOTAL, JSON.stringify(data));

export const getTotalCarLocal = () => {
  const subTotal = getCar().reduce((a, b) => (
    a + (Number(b.price) * Number(b.quantity))
  ), 0);
  return subTotal.toFixed(2);
};

export const quantityFilterLocal = (name) => getCar()
  .filter((localItem) => localItem.name === name).length;
