import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './style.module.css';

function Button({size, type, icon, text}) {

  const buttonClasses = classNames(styles.btn, {
    [styles[`btn-${size}`]]: size,
    [styles[`btn-${type}`]]: type
  });

  return (
    <div>
      <button className={buttonClasses}>
        {/* usar boxicon */}
        <i class='bx bx-play'></i>
        {/* {icon && <i className={`fas fa-${icon}`}></i>} */}
        {text}
      </button>
    </div>
  )
}

Button.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string 
}

export default Button
