import React from "react";
import styles from "./Popup.module.scss";

const Popup = ({ children, closeFunction }) => {
  return (
    <>
      <div className={styles.backdrop} onClick={closeFunction} />
      <div className={styles.dialog}>{children}</div>
    </>
  );
};

export default Popup;
