import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/common/Button";
import SoftExtendedLogo from "../../assets/SoftExtendedLogo.png";

import styles from "./styles.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src={SoftExtendedLogo} alt="Logo da SoftExpert" />
			<h2>404 - Página não encontrada</h2>
			<p>A página que você está tentando acessar não existe ou foi movida..</p>
      <Button text="Ir para a home"  type="primary" size="medium" onClick={() => navigate("/")}/>
		</div>
	);
}

export default NotFoundPage;
