import React from "react";
import logo from "images/logo.png";
import styles from "./Navbar.module.scss";

const Navbar = () => (
  <nav className={styles.navBar}>
    <img className={styles.logo} src={logo} />
  </nav>
);

export default Navbar;
