import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Icon.module.scss';

function withIcon(IconComponent) {
  function Icon({ inline, className, size, style, ...rest }) {
    const Tag = inline ? 'span' : 'div';
    const viewBoxSize = IconComponent.viewBoxSize
      ? IconComponent.viewBoxSize
      : '24';
    const iconSizes = {
      s: '20px',
      m: '24px',
      l: '44px',
    };
    const containerSize = size ? iconSizes[size] : viewBoxSize + 'px';

    return (
      <Tag
        {...rest}
        className={classNames(styles.icon, {
          [styles.inline]: inline,
          [className]: className,
        })}
        style={{
          width: containerSize,
          height: containerSize,
          ...style,
        }}
      >
        <svg
          preserveAspectRatio="none"
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className={styles.svg}
          fill="currentColor"
        >
          <IconComponent />
        </svg>
      </Tag>
    );
  }

  Icon.propTypes = {
    inline: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.oneOf(['s', 'm', 'l']),
    style: PropTypes.object,
  };

  Icon.displayName = `${IconComponent.name}Icon`;
  Icon.viewBoxSize = IconComponent.viewBoxSize;

  return Icon;
}

export default withIcon;
