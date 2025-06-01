import React from 'react';
import styles from './style.module.css';

function Hexagon({ size = 200, src, alt = 'Hexagon Image' }) {
  const dimensionW = typeof size === 'number' ? `${size}px` : size;
  const dimensionH = typeof size === 'number' ? `${size * 0.86602540378}px` : size;

  const borderStyle = {
    width: dimensionW,
    height: dimensionH,
  };

  return (
    <div className={styles.hexagonWrapper}>
      <div className={styles.hexagonBorder} style={borderStyle}>
        <div className={styles.hexagonContainer}>
          <img src={src} alt={alt} className={styles.hexagonImage} />
        </div>
      </div>
    </div>
  );
}

export default Hexagon;
