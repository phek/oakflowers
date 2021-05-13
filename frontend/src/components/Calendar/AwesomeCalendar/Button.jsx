import React from "react";
import classnames from "classnames";
import styles from "./Button.module.scss";

export default function Button({ className, ...rest }) {
  return <button className={classnames(styles.button, className)} {...rest} />;
}
