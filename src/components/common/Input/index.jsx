import React from 'react'
import classNames from 'classnames'

import styles from './style.module.css'

function Input({ isValid = null, label = '', customStyle = {}, ...props }) {
  const inputClass = classNames(styles.gradient, {
    [styles.invalid]: isValid === false,
    [styles.valid]: isValid,
  })

  return (
    <div className={inputClass} style={customStyle}>
      <input
        className={styles["input"]}
        placeholder={label}
        {...props}
      />
    </div>
  )
}

export default Input
