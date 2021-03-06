import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { login, logout } from "routes/_state/auth/Auth.actions";
import { appRoutes } from "routes/_router/App.routes";
import Link from "components/Link";
import Popup from "components/Popup";
import Button from "components/Button";
import Text from "components/Text";
import logo from "images/logo.png";
import styles from "./Navbar.module.scss";

const Navbar = ({ user, login, logout, children }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const showLoginPopup = () => {
    setLoginOpen(true);
  };

  const hideLoginPopup = () => {
    setLoginOpen(false);
  };

  const loginUser = (event) => {
    event.preventDefault();

    if (email && password) {
      login({ email: email, password: password }, hideLoginPopup).then(
        (error) => {
          if (error) {
            setError(error);
          } else {
            setError(null);
            hideLoginPopup();
          }
        }
      );
    }
  };

  const updateEmail = (event) => setEmail(event.target.value);
  const updatePassword = (event) => setPassword(event.target.value);

  return (
    <>
      <nav className={styles.navBar}>
        <div className={styles.mainNav}>
          <Link className={classNames(styles.menuItem, styles.logo)} to={appRoutes.home.path}>
            <img src={logo} alt="Logo" />
          </Link>
          <div className={styles.rightNav}>
            <Link className={styles.menuItem}  to={appRoutes.vindo.path}>
              Vindö
            </Link>
            {user ? (
              <Link as="button" className={styles.menuItem} onClick={logout}>
                Logga ut
              </Link>
            ) : (
              <Link
                as="button"
                className={styles.menuItem}
                onClick={showLoginPopup}
              >
                Logga in
              </Link>
            )}
          </div>
        </div>
        {children}
      </nav>
      {loginOpen && (
        <Popup closeFunction={hideLoginPopup}>
          <form onSubmit={loginUser}>
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
            <Button color="black-light" size="s" style={{ marginTop: 8 }}>
              Logga in
            </Button>
            {error && (
              <Text color="negative" style={{ marginTop: 8 }}>
                {error}
              </Text>
            )}
          </form>
        </Popup>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { login, logout }
)(Navbar);
