import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./style.module.css";

function Button({size, type, icon, text, onClick}) {
	const buttonClasses = classNames(styles.btn, {
		[styles[`btn-${size}`]]: size,
		[styles[`btn-${type}`]]: type
	});

	return (
		<button onClick={onClick} className={buttonClasses}>
			{icon && <i className={`bx bx-${icon}`}></i>}
			{text}
		</button>
	);
}

Button.propTypes = {
	size: PropTypes.string,
	type: PropTypes.string,
	icon: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func
};

export default Button;
