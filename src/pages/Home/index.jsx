import React, { useState } from "react";

import Button from "../../components/common/Button";
import Tickets from "../../components/Home/Tickets";
import styles from "./style.module.css";
import Modal from "../../components/Home/Modal";

function Home() {
	const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
	const [isAwardsModalOpen, setIsAwardsModalOpen] = useState(false);

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />
			<Tickets />
			<img className={styles["logo-game"]} src="../../../src/assets/GameLogo.svg" alt="Logo do game" />
			<div className={styles["buttons"]}>
				<Button type="primary" size="large" icon="play"/>
				<div className={styles["buttons-right"]}>
					<Button type="primary" size="medium" icon="trophy" onClick={() => setIsAwardsModalOpen(true)} />
					<Button type="primary" size="medium" icon="help-circle" onClick={() => setIsAboutModalOpen(true)} />
				</div>
			</div>
			<Modal title="Sobre" show={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)}>Sobre o jogo</Modal>
			<Modal title="Prêmios" show={isAwardsModalOpen} onClose={() => setIsAwardsModalOpen(false)}>Prêmios</Modal>
		</div>
	);
}

export default Home;
