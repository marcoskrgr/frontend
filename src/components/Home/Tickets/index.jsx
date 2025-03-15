import React from "react";

import styles from "./style.module.css";

function Tickets() {
	return (
		<div className={styles["content"]}>
			<span>saldo atual:</span>
			<div className={styles["tickets"]}>
				<img className={styles["ticket-icon"]} src="../../../src/assets/Vector.svg" />
				<span>20</span>
				<span> Tickets</span>
			</div>
		</div>
	);
}

export default Tickets;
