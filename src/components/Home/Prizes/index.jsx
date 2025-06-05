import React from "react";

import Hexagon from "../../common/Hexagon";
import SoftExpertLogoBlue from "../../../assets/SoftExtendedLogoBlue.png";

import styles from "./style.module.css";

function Prizes() {

	const prizesToWin = [
		{
			id: 1,
			name: "Alexa",
			src:"https://api.store.vivo.com.br/medias/96Wx96H-22021855-1-.jpg?context=bWFzdGVyfGF6dXJlaW1hZ2VzfDg2OTB8aW1hZ2UvanBlZ3xhR1kwTDJnMVpTODRPVGc1TWpVek1EYzBPVGMwTHprMlYzZzVOa2hmTWpJd01qRTROVFZmSUNBb01Ta3VhbkJufDA5OTRiYmExMDQ0N2MzNzA4OTJkNGJhNGM2ODczYTg2OGRjY2NiOWY4ZWQzZjNhYjlmZjFlMTA5MTA5MDVlNTk",
			description: "Dispositivo inteligente com assistente virtual da Amazon, ideal para controlar sua casa por voz, ouvir músicas e obter informações em tempo real."
		},
		{
			id: 2,
			name: "Mochila",
			src:"https://images4.kabum.com.br/produtos/fotos/131924/mochila-lenovo-casual-b210-ate-15-6-para-notebook-gx40q17225_1636135061_g.jpg",
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
					<li>O ganhador deve estar seguindo a SoftExpert no Instagram.</li>
				</ol>
			</div>

			<div className={styles.prizes}>
				<h2>Prêmios disponíveis:</h2>
				{prizesToWin.map((prize, index) => (
					<div key={index} className={styles["prize-item"]}>
						<div className={styles["prize-icon"]}>
							<Hexagon src={prize.src} size={150} />
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
