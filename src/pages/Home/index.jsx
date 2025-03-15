import React from "react";

import Button from "../../components/common/Button";
import styles from "./style.module.css";
import Tickets from "../../components/Home/Tickets";

function Home() {
	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />
			<Tickets />
			<img className={styles["logo-game"]} src="../../../src/assets/GameLogo.svg" alt="Logo do game" />
			<div className={styles["buttons"]}>
				<Button type="primary" size="large" />
				<div className={styles["buttons-left"]}>
					<Button type="primary" size="medium" />
					<Button type="primary" size="medium" />
				</div>
			</div>
		</div>
	);
}

export default Home;
