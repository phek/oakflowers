import React from "react";
import { connect } from "react-redux";
import { login, logout } from "routes/_state/auth/Auth.actions";
import { appRoutes } from "routes/_router/App.routes";
import Link from "components/Link/Link.component";
import logo from "images/logo.png";
import styles from "./Navbar.module.scss";

const Navbar = ({ authenticated, login, logout, children }) => {
  const loginUser = () => {
    login({ email: "test", password: "test" });
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.mainNav}>
        <Link to={appRoutes.home.path}>
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>
        <div className={styles.rightNav}>
          <Link to={appRoutes.vindo.path}>
            <span className={styles.menuItem}>Vindö</span>
          </Link>
          <Link to={appRoutes.nerja.path} className={styles.menuItem}>
            <span className={styles.menuItem}>Nerja</span>
          </Link>
          {authenticated && (
            <Link to={appRoutes.aloeVera.path} className={styles.menuItem}>
              <span className={styles.menuItem}>Aloe Vera</span>
            </Link>
          )}
          {authenticated ? (
            <Link as="button" className={styles.menuItem} onClick={logout}>
              <span className={styles.menuItem}>Logout</span>
            </Link>
          ) : (
            <Link as="button" className={styles.menuItem} onClick={loginUser}>
              <span className={styles.menuItem}>Login</span>
            </Link>
          )}
        </div>
      </div>
      {children}
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
