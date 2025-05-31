import React from "react";
import classNames from "classnames";

import styles from "./style.module.css";

function PlayerProfile({name, tickets}) {
	/* const profileClasses = classNames(styles["profile"], {
		[styles["big"]]: true
	});
 */
	return (
		<div className={styles["player-profile"]}>
		{/* 	<div className={styles["player-image"]}>
				{<div className={profileClasses}></div>}
			</div> */}
			<div className={styles["name-tickets"]}>
				<div className={styles["name"]}>{name}</div>
				<div className={styles["tickets"]}>
					<img className={styles["icon"]} src="../../../src/assets/Vector.svg" />
					{tickets}
				</div>
			</div>
		</div>
	);
}

export default PlayerProfile;
