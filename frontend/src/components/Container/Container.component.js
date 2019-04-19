import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Container.module.scss";

const Container = ({ children, withBg }) => {
  const classes = classNames({
    [styles.container]: true,
    [styles.withBg]: withBg
  });
  return <div className={classes}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node,
  withbg: PropTypes.bool
};

export default Container;
