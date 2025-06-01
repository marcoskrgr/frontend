import React from "react";

import Hexagon from "../../common/Hexagon";
import SoftExpertLogoBlue from "../../../assets/SoftExtendedLogoBlue.png";

import styles from "./style.module.css";

function Prizes() {
	return (
		<div className={styles.container}>
			<img src={SoftExpertLogoBlue} className={styles["logo"]} alt="SoftExpert Logo" />

			<div className={styles.instructions}>
				<h2>Como a premiação funciona?</h2>
				<ol>
					<li>Os pontos que o jogador faz durante o jogo são convertidos em cupons. Quanto mais cupons, mais chances de ganhar prêmios</li>
					<li>Serão sorteados 5 prêmios por dia de codecon</li>
					<li>O jogador só pode ganhar 1 (um) dos 10 prêmios durante toda duração da codecon.</li>
				</ol>
			</div>

			<div className={styles.prizes}>
				<h2>Prêmios disponíveis:</h2>
				{[1, 1].map((num, index) => (
					<div key={index} className={styles["prize-item"]}>
						<div className={styles["prize-icon"]}>
							<Hexagon size={150} />
						</div>
						<div className={styles["prize-info"]}>
							<h3>Prêmio numero {num}</h3>
							<p>Descrição detalhada do prêmio, com informações extras sobre modelo aparência etc.</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Prizes;
