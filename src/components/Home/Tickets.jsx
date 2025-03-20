import React from "react";

import styles from "./style.module.css";

function Tickets() {
	return (
		<div className={styles["tickets"]}>
			<span>saldo atual:</span>
			<div className={styles["tickets-length"]}>
				<img className={styles["icon"]} src="../../../src/assets/Vector.svg" />
				<span>20</span>
				<span> Tickets</span>
			</div>
		</div>
	);
}

export default Tickets;
