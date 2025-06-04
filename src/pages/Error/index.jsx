import React from "react";
import {useNavigate, useRouteError} from "react-router-dom";

import Button from "@components/common/Button";
import SoftExtendedLogo from "../../assets/SoftExtendedLogo.png";

import styles from "./styles.module.css";

function ErrorPage() {
	const navigate = useNavigate();
	const error = useRouteError();

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src={SoftExtendedLogo} alt="Logo da SoftExpert" />
			<h2>Algo deu errado</h2>
			{error instanceof Error ? <p>{error.message}</p> : <p>Ocorreu um erro inesperado.</p>}
			<p className={styles["bold"]}>Por favor, tente novamente mais tarde ou converse com quem está no estande.</p>
			<Button text="Ir para a home" type="primary" size="medium" onClick={() => navigate("/")} />
		</div>
	);
}

export default ErrorPage;
