import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as auth from "../utils/auth";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      auth
        .register(email, password)
        .then((res) => {
          if (res) {
            this.props.history.push("/singin");
          } else {
            console.log("Something went wrong.");
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
        });
    }
  }

  render() {
    return (
      <div className="register">
        <p className="register__welcome">Inscrever-se</p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <input
            placeholder="E-mail"
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="register__input"
          />

          <input
            placeholder="Senha"
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="register__input"
          />

          <div className="register__button-container">
            <button type="submit" className="register__button">
              Inscrever-se
            </button>
          </div>
        </form>

        <p className="register__signin">
          Já é um membro?{" "}
          <Link className="link" to="/signin">
            Faça o Login aqui!
          </Link>
        </p>
      </div>
    );
  }
}

export default withRouter(Register);
