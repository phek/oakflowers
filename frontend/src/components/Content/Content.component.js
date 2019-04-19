import React from "react";
import PropTypes from "prop-types";
import styles from "./Content.module.scss";

const Content = ({ children, hasSubNav }) => (
  <div className={hasSubNav ? styles.withSubNav : styles.content}>
    {children}
  </div>
);

Content.propTypes = {
  children: PropTypes.node,
  hasSubNav: PropTypes.bool
};

export default Content;
