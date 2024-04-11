import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, userEmail, onLogout }) {
  //caminho do nav>>>>>>>
  const location = useLocation();
  const isSignInPage = location.pathname === "/signin";
  const linkText = isSignInPage ? "Faça o Login" : "Entrar";
  const linkPath = isSignInPage ? "/signup" : "/signin";
  //>>>>>>>
  return (
    <header className="header">
      <img
        className="header__logo"
        src="./images/logo-vector.png"
        alt="Logo da página Around us"
      />
     <nav className="header__nav">
        {loggedIn && userEmail ? (
          <>
            <p>Bem vindo, {userEmail.email}</p>
            <button onClick={onLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to={linkPath} className="header__link">
              {linkText}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
