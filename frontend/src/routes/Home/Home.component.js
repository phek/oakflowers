import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../state/Auth.actions";
import styles from "./Home.module.scss";

const Home = props => {
  const login = () => {
    props.signIn("Test", "Test-pw");
  };
  const logout = () => {
    props.signOut();
  };

  return (
    <div className={styles.imgWrapper}>
      <div className={styles.box}>
        <h1>Test heading</h1>
        <p>Test description to the heading</p>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
        <div>{props.authenticated.toString()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(Home);
