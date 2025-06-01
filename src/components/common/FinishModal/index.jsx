import React from "react";
import classNames from "classnames";
import {useNavigate} from "react-router-dom";

import Button from "../Button";

import styles from "./styles.module.css";

function FinishModal({time, showModal}) {
	const navigate = useNavigate();

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	const modalClasses = classNames(styles["all"], {
		[styles["show"]]: showModal
	});

  return (
		<div className={modalClasses}>
      <div className={styles["content"]}></div>
			<div className={styles["modal"]}>
				<div className={styles["header"]}>
					<h2>Task Finalizada!</h2>
				</div>
				<span className={styles["message"]}>Você terminou em:</span>
				<div className={styles["time"]}>
					<i class="bx bx-timer"></i>
					<span>{formatTime(time)}</span>
				</div>
				<div className={styles["buttons"]}>
					<Button
						customStyle={{width: "100%"}}
						text="Jogar novamente"
						size="medium"
						type="primary"
						onClick={() => window.location.reload()}
					/>
					<Button size="medium" icon="bx-home" type="primary" onClick={() => navigate("/map")} />
				</div>
			</div>
		</div>
	);
}

export default FinishModal;
