import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Link.module.scss";

const Link = ({
  to,
  children,
  className,
  as: Tag = RouterLink,
  disabled,
  ...rest
}) => {
  if (disabled) {
    return <span className={styles.disabled}>{children}</span>;
  }

  return (
    <Tag {...rest} to={to} className={classNames(styles.link, className)}>
      {children}
    </Tag>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default Link;
