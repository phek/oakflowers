import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import styles from "./ImageHeader.module.scss";

const ImageHeader = ({ images }) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setSelected(selected => {
          if (images && selected < images.length - 1) {
            return selected + 1;
          } else {
            return 0;
          }
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <div className={styles.imgWrapper}>
      {images.map((src, index) => {
        const imgClasses = classNames({
          [styles.img]: true,
          [styles.selected]: index === selected
        });

        return (
          <div className={imgClasses} key={src}>
            <img src={src} alt="Header" />
          </div>
        );
      })}
    </div>
  );
};

export default ImageHeader;
