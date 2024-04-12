import React from "react";
import { NavLink, useHistory } from "react-router-dom";

function Header({ loggedIn, userEmail, handleLogout }) {
  const history = useHistory();

  const signOut = () => {
    handleLogout();
    localStorage.removeItem('jwt');
    history.push('/signin'); 
  };

  const RenderMenuItems = () => {
    if (!loggedIn) {
    
      return (
        <>
          <NavLink className="menu__item" activeClassName="menu__item_active" to="/signin">
            Entrar
          </NavLink>
          <NavLink className="menu__item" activeClassName="menu__item_active" to="/signup">
            Faça o Login
          </NavLink>
        </>
      );
    } else {
    
      return (
        <>
          <span className="menu__item">{userEmail}</span>
          <button onClick={signOut} className="menu__item menu__button">
            Sair
          </button>
        </>
      );
    }
  };

  return (
    <header className="header">
      <img
        className="header__logo"
        src="./images/logo-vector.png"
        alt="Logo da página Around us"
      />
      <nav className="menu">
        <RenderMenuItems />
      </nav>
    </header>
  );
}

export default Header;
