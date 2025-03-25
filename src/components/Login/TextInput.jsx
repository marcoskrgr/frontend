import React, { useState }  from "react";
import PropTypes from "prop-types";
import styles from "./style.module.css";
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfPassword,
} from "./validTypes";

function TextInput({ id, label, isRequired, onChange, type, validType }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    let validate;
    setValue(newValue);

    switch (validType) {
      case "email":
        validate = validateEmail;
        break;
      case "phone":
        validate = validatePhone;
        break;
      case "password":
        validate = validatePassword;
        break;
      case "confpassword":
        validate = validateConfPassword;
        break;
      default:
        validate = "";
    }

    if (typeof validate === "function") {
      const validation = validate(newValue);
      if (!validation.isValid) {
        setError(validation.message);
      } else {
        setError("");
      }
    } else {
      setError("");
    }

    onChange(newValue);
  };

  return (
    <div className={styles["inputWrapper"]}>
      <label className={styles["label"]}>{error ? error : label}</label>
      <div
        className={styles["gradient"] + (error ? " " + styles["error"] : " ")}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          required={isRequired}
          className={styles["input"]}
          isValid={error ? "false" : "true"}
        />
      </div>
    </div>
  );
}

TextInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func,
    validType: PropTypes.string
};

export default TextInput;
