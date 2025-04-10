import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import Modal from "../../components/Home/Modal";
import Button from "../../components/common/Button";
import Tickets from "../../components/Home/Tickets";
import About from "../../components/Home/About";
import Prizes from "../../components/Home/Prizes";

import styles from "./style.module.css";

function Home() {
	const navigate = useNavigate();
	const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
	const [isAwardsModalOpen, setIsAwardsModalOpen] = useState(false);

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />
			<Tickets />
			<img className={styles["logo-game"]} src="../../../src/assets/GameLogo.svg" alt="Logo do game" />
			<div className={styles["buttons"]}>
				<Button type="primary" size="large" icon="play" onClick={() => navigate("/map")} />
				<div className={styles["buttons-right"]}>
					<Button type="primary" size="medium" icon="trophy" onClick={() => setIsAwardsModalOpen(true)} />
					<Button type="primary" size="medium" icon="help-circle" onClick={() => setIsAboutModalOpen(true)} />
				</div>
			</div>
			<Modal title="Sobre" show={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)}>
				<About />
			</Modal>
			<Modal title="Prêmios" show={isAwardsModalOpen} onClose={() => setIsAwardsModalOpen(false)}>
				<Prizes />
			</Modal>
		</div>
	);
}

export default Home;
