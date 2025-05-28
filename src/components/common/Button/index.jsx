import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Loading from "./Loading";

import styles from "./style.module.css";

function Button({size, type, icon, text, onClick, isDisabled, customStyle = {}, loading}) {
	const buttonClasses = classNames(styles.btn, {
		[styles[`btn-${size}`]]: size,
		[styles[`btn-${type}`]]: type,
		[styles[`btn-disabled`]]: isDisabled
	});

	return (
		<button style={customStyle} onClick={!isDisabled && onClick} disabled={isDisabled} className={buttonClasses}>
			{icon && <i className={`bx ${icon}`}></i>}
			{!loading ? <span>{text}</span> : <Loading />}
		</button>
	);
}

Button.propTypes = {
	size: PropTypes.oneOf(["small", "medium", "large"]),
	type: PropTypes.string,
	icon: PropTypes.string,
	customStyle: PropTypes.object,
	text: PropTypes.string,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func
};

export default Button;
