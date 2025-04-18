import React from "react";
import Hexagon from "./HexagonMemory";
import styles from "./style.module.css";

function GridMemory() {
	const rows = [];

	for (let i = 0; i < 18; i += 7) {
		rows.push(
			<div key={`row-${i}`} className={styles["row-of-4"]}>
				{[...Array(Math.min(4, 18 - i))].map((_, idx) => (
					<Hexagon key={`hex-${i + idx}`} size={100} />
				))}
			</div>
		);

		if (i + 4 < 18) {
			rows.push(
				<div key={`row-${i + 4}`} className={styles["row-of-3"]}>
					{[...Array(Math.min(3, 18 - (i + 4)))].map((_, idx) => (
						<Hexagon key={`hex-${i + 4 + idx}`} size={100} />
					))}
				</div>
			);
		}
	}

	return (
		<div className="align">
			<div className={styles["grid-container"]}>{rows}</div>
		</div>
	);
}

export default GridMemory;
