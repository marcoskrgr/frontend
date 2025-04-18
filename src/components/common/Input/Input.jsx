import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";

const Input = ({ id, type, inputMode, label, isRequired, alignCenter, value, onChange, error }) => {
  const hasError = !!error;

  return (
    <div className={styles["inputWrapper"]}>
      <label className={styles["label"]}>
        {hasError ? error : label}
      </label>
      <div className={`${styles["gradient"]} ${hasError ? styles["error"] : ""}`}>
        <input
          id={id}
          type={type}
          required={isRequired}
          value={value}
          onChange={e => onChange(id, e.target.value)}
          className={styles["input"]}
          inputMode={inputMode}
          style={alignCenter ? {textAlign: 'center'} : {}}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  inputMode: PropTypes.string,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  alignCenter: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default Input;
