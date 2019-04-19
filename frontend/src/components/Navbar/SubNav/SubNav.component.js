import React from "react";
import styles from "./SubNav.module.scss";

const SubNav = ({ children }) => {
  return (
    <div className={styles.subNav}>
      {children}
    </div>
  );
};

export default SubNav;
