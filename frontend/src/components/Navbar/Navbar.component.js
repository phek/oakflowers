import React, { useState } from "react";
import { connect } from "react-redux";
import { login, logout } from "routes/_state/auth/Auth.actions";
import { appRoutes } from "routes/_router/App.routes";
import Link from "components/Link";
import Popup from "components/Popup";
import Button from "components/Button";
import Text from "components/Text";
import logo from "images/logo.png";
import styles from "./Navbar.module.scss";

const Navbar = ({ authenticated, error, login, logout, children }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showLoginPopup = () => {
    setLoginOpen(true);
  };

  const hideLoginPopup = () => {
    setLoginOpen(false);
  };

  const loginUser = () => {
    if (email && password) {
      login({ email: email, password: password }, hideLoginPopup);
    }
  };

  const updateEmail = event => setEmail(event.target.value);
  const updatePassword = event => setPassword(event.target.value);

  return (
    <>
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
              <Link
                as="button"
                className={styles.menuItem}
                onClick={showLoginPopup}
              >
                <span className={styles.menuItem}>Login</span>
              </Link>
            )}
          </div>
        </div>
        {children}
      </nav>
      {loginOpen && (
        <Popup closeFunction={hideLoginPopup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
          <label htmlFor="password">Lösenord</label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={updatePassword}
          />
          <Button
            color="black-light"
            size="s"
            onClick={loginUser}
            style={{ marginTop: 8 }}
          >
            Logga in
          </Button>
          {error && (
            <Text color="negative" style={{ marginTop: 8 }}>
              {error}
            </Text>
          )}
        </Popup>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  error: state.auth.error
});

export default connect(
  mapStateToProps,
  { login, logout }
)(Navbar);
