import React from "react";
import classNames from "classnames";

import Button from "../Button";

import styles from "./style.module.css";

function Input({
	id,
	label,
	value,
	onChange,
	error,
	isValid,
	customStyle = {},
	showButton = false,
	type = "text",
	min,
	max,
	...props
}) {
	const inputClass = classNames(styles.gradient, {
		[styles.invalid]: isValid === false || error,
		[styles.valid]: isValid === true && !error
	});

	const isNumberInput = type === "number";

	const handleStep = (step) => {
		const numericValue = parseFloat(value) || 0;
		const newValue = numericValue + step;

		if ((min !== undefined && newValue < min) || (max !== undefined && newValue > max)) {
			return;
		}

		onChange({ target: { value: newValue } });
	};

	return (
		<div className={styles.wrapper}>
			<label className={styles.label} htmlFor={id}>
				{label}
			</label>
			<div className={styles["input-wrapper"]}>
				<div className={inputClass} style={customStyle}>
					{type === "long_text" ?
						<textarea
							id={id}
							className={styles.input}
							value={value}
							style={{ height: "300px", resize: "none", padding: "10px" }}
							onChange={onChange}
							{...props}
						/>
						: <input
							id={id}
							type={type}
							className={styles.input}
							value={value}
							min={isNumberInput ? min : undefined}
							max={isNumberInput ? max : undefined}
							onChange={onChange}
							{...props}
						/>}
				</div>
				{isNumberInput && showButton && (
					<div className={styles["buttons"]}>
						<Button onClick={() => handleStep(-1)} icon={"bx-minus"} type="tertiary" size="medium" />
						<Button onClick={() => handleStep(1)} icon={"bx-plus"} type="tertiary" size="medium" />
					</div>
				)}
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
}

export default Input;
