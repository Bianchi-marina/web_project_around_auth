import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../utils/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.register(email, password);
      if (response && response.token) {
        localStorage.setItem('jwt', response.token);
        history.push('/signin');
      } else {
        console.error('Erro ao registrar. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div className="register">
      <p className="register__welcome">Inscrever-se</p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email" className="register__label">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
          required
        />
        <label htmlFor="password" className="register__label">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register__input"
          required
        />
        <div className="register__button-container">
          <button type="submit" className="register__button">
            Inscrever-se
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Já é um membro?</p>
        <Link to="/signin" className="register__signin-link">
          Faça login aqui!
        </Link>
      </div>
    </div>
  );
};

export default Register;
