import React from 'react'
import classNames from 'classnames'

import styles from './style.module.css'

function Input({ isValid = true, label = '', customStyle = {}, ...props }) {
  const inputClass = classNames(styles.input, {
    [styles.invalid]: !isValid,
  })

  return (
    <div className={styles.wrapper} style={customStyle}>
      <input
        className={inputClass}
        placeholder={label}
        {...props}
      />
    </div>
  )
}

export default Input
