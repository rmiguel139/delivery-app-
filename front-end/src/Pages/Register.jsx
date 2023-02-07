import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../Services/RequestPost';
import { setUser } from '../Helpers/LocalStorage';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [renderError, setRenderError] = useState(false);

  const history = useHistory();

  const validateName = () => {
    const minName = 12;
    return name.length < minName;
  };

  const validateEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    return !email.match(regex);
  };

  const validatePassword = () => {
    const minPassword = 6;
    return password.length < minPassword;
  };

  const validateLogin = async () => {
    const result = await requestLogin('/register', { name, email, password });
    if (result.error) {
      setRenderError(result.error.message);
    } else {
      setRenderError('');
      setUser(result);
      history.push('/customer/products');
    }
  };

  return (
    <div>
      Cadastro

      <input
        type="text"
        data-testid="common_register__input-name"
        onChange={ ({ target }) => {
          setName(target.value);
        } }
      />

      <input
        type="text"
        data-testid="common_register__input-email"
        onChange={ ({ target }) => {
          setEmail(target.value);
        } }
      />

      <input
        type="password"
        data-testid="common_register__input-password"
        onChange={ ({ target }) => {
          setPassword(target.value);
        } }
      />

      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={ validateEmail() || validatePassword() || validateName() }
        onClick={ validateLogin }
      >
        Cadastrar
      </button>

      { renderError
        ? (
          <p data-testid="common_register__element-invalid_register">
            Dados Inválidos
          </p>
        )
        : undefined}
    </div>
  );
}

export default Register;
