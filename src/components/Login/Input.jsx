import React from "react";
import styles from "./style.module.css";

const Input = ({ id, type, label, isRequired, value, onChange, error }) => {
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
          data-isvalid={hasError ? "false" : "true"}
        />
      </div>
    </div>
  );
};

export default Input;
