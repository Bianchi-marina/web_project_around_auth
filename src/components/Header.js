import React from "react";
import { NavLink, useHistory,  useLocation } from "react-router-dom";

function Header({ loggedIn, userEmail, handleLogout }) {
  const history = useHistory();
  const location = useLocation();
  
  const isSignInPage = location.pathname === "/signup";
  const isSignUpPage = location.pathname === "/signin";

  const signOut = () => {
    handleLogout();
    localStorage.removeItem('jwt');
    history.push('/signin'); 
  };

  const RenderMenuItems = () => {
    if (isSignInPage) {
      return (
        <NavLink className="menu__item" activeClassName="menu__item_active" to="/signin">
          Entrar
        </NavLink>
      );
    } else if (isSignUpPage) {
      return (
        <NavLink className="menu__item" activeClassName="menu__item_active" to="/signup">
          Faça o login
        </NavLink>
      );
    } else if (loggedIn) {
      return (
        <>
          <span className="menu__item">{userEmail}</span>
          <button onClick={signOut} className="menu__item menu__button">
            Sair
          </button>
        </>
      );
    }
    
    return null; 
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
