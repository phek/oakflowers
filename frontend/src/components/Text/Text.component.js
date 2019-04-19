import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Text.module.scss';

const Text = ({
  children,
  cursive,
  inline,
  size,
  nowrap,
  color,
  bold,
  normal,
  uppercase,
  tight,
  weight,
  className,
  ...rest
}) => {
  const Tag = inline ? 'span' : 'p';
  const classes = classNames(styles.text, {
    [styles[size]]: size,
    [styles[color]]: color,
    [styles.bold]: bold,
    [styles.normal]: normal,
    [styles.uppercase]: uppercase,
    [styles.cursive]: cursive,
    [styles.nowrap]: nowrap,
    [styles.tight]: tight,
    [styles[weight]]: weight,
    [className]: className,
  });

  return (
    <Tag {...rest} className={classes}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'text-primary',
    'text-secondary',
    'text-disabled',
    'white',
    'primary',
    'positive',
    'negative',
  ]),
  size: PropTypes.oneOf(['xs', 's', 'm', 'l']),
  weight: PropTypes.oneOf(['normal', 'bold']),
  uppercase: PropTypes.bool,
  cursive: PropTypes.bool,
  inline: PropTypes.bool,
  nowrap: PropTypes.bool,
  /** Sets the line-height to the same size as font-size */
  tight: PropTypes.bool,
  className: PropTypes.string,
};

export default Text;
