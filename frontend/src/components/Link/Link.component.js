import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Link.module.scss";

const Link = ({ to, children, as, ...rest }) => {
  const Tag = as ? as : RouterLink;

  return (
    <Tag {...rest} to={to} className={styles.link}>
      {children}
    </Tag>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node
};

export default Link;
