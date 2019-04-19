import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Heading.module.scss";

const defaultSizes = {
  1: "xl",
  2: "l",
  3: "m",
  4: "s",
  5: "xs"
};

const Heading = ({
  level = 0,
  children,
  color,
  size = defaultSizes[level] || "m",
  tight,
  className,
  ...rest
}) => {
  const Tag = level > 0 && level < 7 ? `h${level}` : "div";
  const classes = classNames(styles.heading, {
    [styles[size]]: true,
    [styles[`color_${color}`]]: color,
    [styles.tight]: tight,
    [className]: className
  });

  return (
    <Tag {...rest} className={classes}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(["text-secondary"]),
  /** If no level is set a <div /> will be rendered instead of <h* /> */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Defaults are set based on level: { 1: 'xl', 2: 'l', 3: 'm', 4: 's', 5: 'xs' } */
  size: PropTypes.oneOf(["xs", "s", "m", "l", "xl"]),
  /** Sets the line-height to the same size as font-size */
  tight: PropTypes.bool,
  className: PropTypes.string
};

export default Heading;
