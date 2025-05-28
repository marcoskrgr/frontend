import React from 'react';
import styles from './style.module.css';

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
