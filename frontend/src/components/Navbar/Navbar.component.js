import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login, logout } from "routes/_state/auth/Auth.actions";
import { appRoutes } from "routes/App.routes";
import logo from "images/logo.png";
import styles from "./Navbar.module.scss";

const Navbar = ({ authenticated, login, logout }) => {
  return (
    <nav className={styles.navBar}>
      <Link to={appRoutes.home.path}>
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>
      <div className={styles.rightNav}>
        <Link to={appRoutes.vindo.path} className={styles.menuItem}>
          Vindö
        </Link>
        <Link to={appRoutes.nerja.path} className={styles.menuItem}>
          Nerja
        </Link>
        {authenticated && (
          <Link to={appRoutes.aloeVera.path} className={styles.menuItem}>
            Aloe Vera
          </Link>
        )}
        {authenticated ? (
          <div className={styles.menuItem} onClick={logout}>
            Logout
          </div>
        ) : (
          <div className={styles.menuItem} onClick={login}>
            Login
          </div>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(
  mapStateToProps,
  { login, logout }
)(Navbar);
