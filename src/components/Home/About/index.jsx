import React from "react";
import Hexagon from "../../common/Hexagon";
import styles from "./style.module.css";

function About() {
  const credits = [
    { name: "João Da Silva", position: "Desenvolvedor FrontEnd" },
    { name: "Maria De Fátima", position: "Desenvolvedor FrontEnd" },
    { name: "Pedro Guzini", position: "Desenvolvedor FrontEnd" },
    { name: "Ana Maria", position: "Desenvolvedor FrontEnd" },
    { name: "Lucas Antonete", position: "Desenvolvedor FrontEnad" }
  ];
  
  return (
    <>
      <div className={styles["logo"]}>
        <img
          className={styles["logo-soft"]}
          src="../../../src/assets/SoftExtendedLogoBlue.png"
          alt="Logo da SoftExpert"
        />
      </div>
      
      <div className={styles["desc-container"]}>
        <div className={styles["desc"]}>
          O <span className={styles["strong-blue"]}>QuizGame</span> foi
          desenvolvido para ser apresentado no evento da Codecon 2025,
          trazendo uma experiência interativa e envolvente para os
          participantes. Criado com o objetivo de testar conhecimentos de
          forma dinâmica e divertida, o jogo desafia os jogadores com
          perguntas sobre tecnologia, programação e inovações do mundo
          digital.
        </div>
      </div>
      <div className={styles["titleCredits"]}>
        <p>E que rolem os créditos</p>
      </div>
      <div className={styles["displayCredits"]}>
        {credits.map((credit, index) => (
          <div
            key={index}
            className={
              index % 2 === 0
                ? styles["credit-left"]
                : styles["credit-right"]
            }
          >
            {index % 2 === 0 ? (
              <>
                <div className={styles["hex"]}>
                  <Hexagon size={100} />
                </div>
                <div className={styles["text"]}>
                  <div className={styles["name"]}>{credit.name}</div>
                  <div className={styles["position"]}>{credit.position}</div>
                </div>
              </>
            ) : (
              <>
                <div className={styles["text"]}>
                  <div className={styles["name"]}>{credit.name}</div>
                  <div className={styles["position"]}>{credit.position}</div>
                </div>
                <div className={styles["hex"]}>
                  <Hexagon size={100} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default About;