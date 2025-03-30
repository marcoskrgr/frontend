import React from "react";
import classNames from "classnames";

import styles from "./style.module.css";

function PlayerProfile() {
	const profileClasses = classNames(styles["profile"], {
		[styles["big"]]: true
	});

	return (
		<div className={styles["player-profile"]}>
			<div className={styles["player-image"]}>
				<div className={profileClasses}></div>
			</div>
			<div className={styles["name-tickets"]}>
				<div className={styles["name"]}>JORGE BENITEZ</div>
				<div className={styles["tickets"]}>
					<img className={styles["icon"]} src="../../../src/assets/Vector.svg" />
					12
				</div>
			</div>
		</div>
	);
}

export default PlayerProfile;
