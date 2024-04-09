class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao registrar usuário');
      }
      return response.json();
    })
    .catch(err => {
      throw new Error(err.message || 'Erro ao registrar usuário');
    });
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      return data;
    })
    .catch(err => {
      throw new Error(err.message || 'Erro ao fazer login');
    });
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Token inválido');
      }
      return response.json();
    })
    .catch(err => {
      throw new Error(err.message || 'Erro ao verificar token');
    });
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isLoggedIn() {
    return !!localStorage.getItem('jwt');
  }
}

const auth = new Auth({
  baseUrl: "https://register.nomoreparties.co",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});

export default auth;