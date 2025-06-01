import React from "react";

import { useAuthStore } from "@stores/useAuth";

import styles from "./style.module.css";

function Tickets() {
	const userData = useAuthStore((state) => state.userData);

	return (
		<div className={styles["tickets"]}>
			<span>saldo atual:</span>
			<div className={styles["tickets-length"]}>
				<img className={styles["icon"]} src="../../../src/assets/Vector.svg" />
				<span>{userData.tickets}</span>
				<span> Tickets</span>
			</div>
		</div>
	);
}

export default Tickets;
