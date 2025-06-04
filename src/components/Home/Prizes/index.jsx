import React from "react";

import Hexagon from "../../common/Hexagon";
import SoftExpertLogoBlue from "../../../assets/SoftExtendedLogoBlue.png";

import styles from "./style.module.css";

function Prizes() {

	const prizesToWin = [
		{
			id: 1,
			name: "Alexa",
			description: "Dispositivo inteligente com assistente virtual da Amazon, ideal para controlar sua casa por voz, ouvir músicas e obter informações em tempo real."
		},
		{
			id: 2,
			name: "Mochila",
			description: "Mochila espaçosa e durável, com compartimento para notebook e bolsos organizadores, ideal para estudos, trabalho ou viagens curtas."
		}
	];

	return (
		<div className={styles.container}>
			<img src={SoftExpertLogoBlue} className={styles["logo"]} alt="SoftExpert Logo" />

			<div className={styles.instructions}>
				<h2>Como a premiação funciona?</h2>
				<ol>
					<li>Os pontos que o jogador faz durante o jogo são convertidos em cupons. Quanto mais cupons, mais chances de ganhar prêmios</li>
					<li>Serão sorteados 2 prêmios</li>
					<li>O jogador só pode ganhar 1 (um) dos 2 prêmios durante todo o evento.</li>
				</ol>
			</div>

			<div className={styles.prizes}>
				<h2>Prêmios disponíveis:</h2>
				{prizesToWin.map((prize, index) => (
					<div key={index} className={styles["prize-item"]}>
						<div className={styles["prize-icon"]}>
							<Hexagon size={150} />
						</div>
						<div className={styles["prize-info"]}>
							<h3>{prize.name}</h3>
							<p>{prize.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Prizes;
