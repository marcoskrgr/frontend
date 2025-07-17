import React from "react";

import Hexagon from "../../common/Hexagon";
import SoftExpertLogoBlue from "../../../assets/SoftExtendedLogoBlue.png";

import styles from "./style.module.css";

function Prizes() {
	const prizesToWin = [
		{
			id: 1,
			name: "Kindle",
			src: "https://a-static.mlcdn.com.br/800x560/kindle-11a-16gb-modelo-2024-com-tela-antirreflexo-luz-frontal-ajustavel-e-bateria-de-longa-duracao-cor-verde-b0cp31qs6r-amazon-amazon/mirandacomputacao/48997/1e910d8dd8c9ca518fc1ade77fd19245.jpeg",
			description: "Kindle 11ª (16GB modelo 2024), com Tela Antirreflexo, Luz Frontal Ajustável e Bateria de Longa Duração - Cor Verde."
		},
		{
			id: 2,
			name: "Mini Projetor",
			src: "https://imgs.search.brave.com/_cLKn4Y-juz9xWioeNpeTnYYREnwDhwNTdY2rxAh2G8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzQxQlJoRWxGcmRM/LmpwZw",
			description: "Mini Projetor Portátil 4k Android Full Hd Smart Wifi Cinema Cor Branco."
		},
		{
			id: 3,
			name: "Fone de Ouvido",
			src: "https://a-static.mlcdn.com.br/800x560/fone-de-ouvido-jbl-tune-520bt-sem-fio-com-microfone-cores/supryshop/jbl520btpreto/b5af5aba577ac3628bcea3210f5d4d4d.jpeg",
			description: "JBL, Fone de Ouvido On ear, Tune 520BT - Preto."
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
