import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import About from "@components/Home/About";
import Button from "@components/common/Button";
import Modal from "@components/Home/Modal";
import Prizes from "@components/Home/Prizes";
import Tickets from "@components/Home/Tickets";
import {useUser} from "@helpers/context/UserContext";

import styles from "./style.module.css";

function Home() {
	const {level} = useUser();

	const navigate = useNavigate();
	const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
	const [isAwardsModalOpen, setIsAwardsModalOpen] = useState(false);

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />
			<Tickets />
			<img className={styles["logo-game"]} src="../../../src/assets/GameLogo.svg" alt="Logo do game" />
			<div className={styles["buttons"]}>
				{level == 4 && (
					<div className={styles["buttons-left"]}>
						<Button type="primary" size="medium" icon="bxs-quote-alt-left" onClick={() => navigate("/phrase")} />
					</div>
				)}
				<Button type="primary" size="large" icon="bx-play" onClick={() => navigate("/map")} />
				<div className={styles["buttons-right"]}>
					<Button type="primary" size="medium" icon="bx-trophy" onClick={() => setIsAwardsModalOpen(true)} />
					<Button type="primary" size="medium" icon="bx-help-circle" onClick={() => setIsAboutModalOpen(true)} />
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
