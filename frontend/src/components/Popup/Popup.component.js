import React from "react";
import { CrossIcon } from "components/Icon";
import styles from "./Popup.module.scss";

const Popup = ({ children, closeFunction }) => {
  return (
    <>
      <div className={styles.backdrop} onClick={closeFunction} />
      <div className={styles.dialog}>
        <CrossIcon onClick={closeFunction} className={styles.icon} />
        {children}
      </div>
    </>
  );
};

export default Popup;
