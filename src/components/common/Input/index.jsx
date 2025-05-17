import React from "react";
import classNames from "classnames";

import styles from "./style.module.css";

function Input({ id, label, value, onChange, error, isValid, customStyle = {}, ...props }) {
  const inputClass = classNames(styles.gradient, {
    [styles.invalid]: isValid === false || error,
    [styles.valid]: isValid === true && !error,
  });

  return (
    <div className={styles["wrapper"]}>
      <label className={styles.label} htmlFor={id}>
        {error || label}
      </label>
      <div className={inputClass} style={customStyle}>
        <input id={id} className={styles.input} value={value} onChange={(e) => onChange(id, e.target.value)} {...props} />
      </div>
    </div>
  );
}

export default Input;
