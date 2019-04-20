import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Button.module.scss";

function Button({
  as: Tag,
  kind,
  size,
  color,
  children,
  disabled,
  fullWidth,
  className,
  onClick,
  loading,
  icon,
  iconPosition,
  ...rest
}) {
  const classes = classNames(
    styles.button,
    {
      [styles.border]: kind === "border",
      [styles.filled]: kind === "filled",
      [styles.ghost]: kind === "ghost",
      [styles.small]: size === "s",
      [styles.fullWidth]: fullWidth,
      [styles.withIcon]: icon,
      [styles.iconRight]: icon && iconPosition === "right",
      [styles.loading]: loading,
      [styles[color]]: color,
      [styles.disabled]: disabled
    },
    className
  );

  const iconWithSize = icon => {
    return React.cloneElement(icon, { size: size });
  };

  return (
    <Tag
      {...rest}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          {icon && (
            <div className={styles.iconWrapper}>{iconWithSize(icon)}</div>
          )}
          {children}
        </>
      )}
    </Tag>
  );
}

Button.defaultProps = {
  as: "button",
  color: "primary",
  kind: "filled",
  size: "m",
  iconPosition: "left"
};

Button.propTypes = {
  as: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]),
  kind: PropTypes.oneOf(["border", "filled", "ghost"]),
  size: PropTypes.oneOf(["s", "m"]),
  color: PropTypes.oneOf(["primary", "secondary", "black-light"]),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
