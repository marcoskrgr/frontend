import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./style.module.css";

function Modal({title, children, show, onClose}) {
	const modalClasses = classNames(styles["modal"], {
		[styles["show"]]: show
	});

	return (
		<div className={modalClasses}>
			<div className={styles["header"]} onClick={onClose}>
				<h2>{title}</h2>
				<i className="bx bx-x" onClick={onClose}></i>
			</div>
			<div className={styles["content"]}>{children}</div>
		</div>
	);
}

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};

export default Modal;
