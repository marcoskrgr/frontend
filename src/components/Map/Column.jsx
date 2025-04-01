import React from "react";

import styles from "./style.module.css";

function Column({title, children, length}) {
	return (
		<div className={styles["column"]}>
			<span className={styles["title"]}>
				{length} {title}
			</span>
			<div className={styles["cards"]}>{children}</div>
		</div>
	);
}

export default Column;
