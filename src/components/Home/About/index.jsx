import React, {useState, useEffect} from "react";

import Hexagon from "../../common/Hexagon";
import {credits} from "./credits";
import SoftExpertLogoBlue from "../../../assets/SoftExtendedLogoBlue.png";

import styles from "./style.module.css";

function About() {
	const [hexagonSize, setHexagonSize] = useState(window.innerWidth > 2000 ? 500 : 100);

	useEffect(() => {
		const handleResize = () => {
			setHexagonSize(window.innerWidth > 1000 ? 500 : 100);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className={styles["container"]}>
			<img className={styles["logo"]} src={SoftExpertLogoBlue} alt="Logo da SoftExpert" />
			<div className={styles["desc-container"]}>
				<p className={styles["desc"]}>
					Este jogo foi desenvolvido para ser apresentado em eventos, trazendo uma experiência interativa e envolvente para os
					participantes. Criado com o objetivo de testar conhecimentos de forma dinâmica e divertida, o jogo desafia os jogadores com
					perguntas sobre a <p className={styles["strong-blue"]}>SoftExpert</p>, tecnologia, programação e inovações do mundo digital.
				</p>
			</div>
			<div className={styles["titleCredits"]}>
				<p>E que rolem os créditos!</p>
			</div>
			<div className={styles["displayCredits"]}>
				{credits.map((credit, index) => (
					<div key={index} className={index % 2 === 0 ? styles["credit-left"] : styles["credit-right"]}>
						{index % 2 === 0 ? (
							<>
								<div className={styles["hex"]}>
									<Hexagon size={hexagonSize} src={credit.profile} />
								</div>
								<div className={styles["text"]}>
									<p className={styles["name"]}>{credit.name}</p>
									<p className={styles["position"]}>{credit.position}</p>
								</div>
							</>
						) : (
							<>
								<div className={styles["text"]}>
									<p className={styles["name"]}>{credit.name}</p>
									<p className={styles["position"]}>{credit.position}</p>
								</div>
								<div className={styles["hex"]}>
									<Hexagon size={hexagonSize} src={credit.profile} />
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default About;
