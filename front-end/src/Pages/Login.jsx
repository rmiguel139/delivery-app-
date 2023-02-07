import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../Services/RequestPost';
import { getUser, setUser } from '../Helpers/LocalStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [renderError, setRenderError] = useState('');
  const history = useHistory();

  const validateEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    return !email.match(regex);
  };

  const validatePassword = () => {
    const minPassword = 6;
    return password.length < minPassword;
  };

  const redirectLogin = (role) => {
    const customerUrl = '/customer/products';
    const sellerUrl = '/seller/orders';
    switch (role) {
    case 'customer':
      history.push(customerUrl);
      break;
    case 'seller':
      history.push(sellerUrl);
      break;
    case 'administrator':
    default:
      break;
    }
  };

  const validateLogin = async () => {
    const result = await requestLogin('/login', { email, password });
    if (result.error) {
      setRenderError(result.error.message);
    } else {
      setRenderError('');
      setUser(result);
      if (!result) return false;
      redirectLogin(result.role);
    }
  };

  const stillLoggedIn = () => {
    const result = getUser();
    if (!result) return false;
    redirectLogin(result.role);
  };

  useEffect(() => {
    stillLoggedIn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <input
        type="text"
        data-testid="common_login__input-email"
        onChange={ ({ target }) => {
          setEmail(target.value);
        } }
      />

      <input
        type="password"
        data-testid="common_login__input-password"
        onChange={ ({ target }) => {
          setPassword(target.value);
        } }
      />

      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ validateEmail() || validatePassword() }
        onClick={ validateLogin }
      >
        Login
      </button>

      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>

      { renderError
        && (
          <p data-testid="common_login__element-invalid-email">
            {renderError}
          </p>
        )}
    </div>
  );
}

export default Login;
