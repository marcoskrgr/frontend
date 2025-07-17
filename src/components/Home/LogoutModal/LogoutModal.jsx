import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Button from "@components/common/Button";
import {useAuthStore} from "@stores/useAuth";

import styles from "./style.module.css";

function LogoutModal({show, onClose}) {
	const clearAuth = useAuthStore((state) => state.clearAuth);

	const handleLogout = () => {
		clearAuth();
		onClose();
		window.location.reload();
	};

	const modalClasses = classNames(styles["modal"], {
		[styles["show"]]: show
	});

	const backgroundClasses = classNames(styles["background"], {
		[styles["show"]]: show
	});

	return (
		<>
			<div className={backgroundClasses}></div>
			<div className={modalClasses}>
				<div className={styles["header"]} onClick={onClose}>
					<h2>Deseja sair mesmo?</h2>
					<i className="bx bx-x" onClick={onClose}></i>
				</div>
				<div className={styles["content"]}>
					<p>Só vamos considerar um resultado.</p>
					<Button type="primary" size="medium" customStyle={{width: "100%"}} onClick={handleLogout} text="Desconectar conta" />
				</div>
			</div>
		</>
	);
}

LogoutModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};

export default LogoutModal;
