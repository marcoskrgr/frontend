import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {validateEmail, validatePhone, validatePassword, formatPhone} from "./validTypes";
import styles from "./style.module.css";
import classNames from "classnames";

const Input = ({id, type, label, isRequired, alignCenter, value, onChange}) => {
	const [inputValue, setInputValue] = useState(value);
	const [error, setError] = useState("");

	const validate = (val) => {
		let err = "";
		let newValue = val;

		switch (id) {
			case "email":
				err = !validateEmail(val) ? "E-mail inválido" : "";
				break;
			case "phone":
				newValue = formatPhone(val);
				err = !validatePhone(newValue) ? "Telefone inválido" : "";
				break;
			case "password":
				err = !validatePassword(val) ? "A senha deve ter pelo menos 10 dígitos, letras e números!" : "";
				break;
			case "confPass":
				break;
			default:
				break;
		}

		setError(err);
		onChange(id, newValue, err);
	};

	const handleChange = (e) => {
		const val = e.target.value;
		setInputValue(val);
	};

  
	useEffect(() => {
		if (inputValue.length > 3) {
			validate(inputValue);
		}
	}, [handleChange]);

/* 	const hasError = error; */

  const inputClass = classNames(styles.gradient, {
    [styles.invalid]: error,
    [styles.valid]: !error,
  });

	return (
		<div className={styles["inputWrapper"]}>
			<label className={styles["label"]}>{error ?? label}</label>
			<div className={inputClass}>
				<input
					id={id}
					type={type}
					required={isRequired}
					value={inputValue}
					onChange={handleChange}
					className={styles["input"]}
					style={alignCenter ? {textAlign: "center"} : {}}
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
	onChange: PropTypes.func.isRequired
};

export default Input;
