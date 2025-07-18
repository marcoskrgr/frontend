import React from "react";

import style from "./styles.module.css";

function Help() {
	return (
		<>
			<p>
				Bem-vindo ao jogo de palavras inspirado no Termo! 🧠 Teste suas habilidades de adivinhação e descubra a palavra secreta em até 6
				tentativas! 🌟
			</p>
			<p className={style.sectionSpacing}>Neste jogo, você vai:</p>
			<ul>
				<li>📝 Tentar adivinhar uma palavra de 5 letras.</li>
				<li>🎯 Receber dicas sobre as letras após cada tentativa.</li>
			</ul>
			<p>💡 Ideal para quem gosta de desafios de lógica e palavras, este jogo é divertido e viciante!</p>

			<p className={style.sectionSpacing}>
				<strong>Como jogar?</strong>
			</p>
			<ol>
				<li>📝 Digite uma palavra de 5 letras e confirme sua tentativa.</li>
				<li>🔍 Veja as dicas de cores para cada letra:</li>
			</ol>
			<ul>
				<li>
					🟩 <strong className={style.sectionSpacing}>Verde</strong>: A letra está correta e na posição certa.
				</li>
				<li>
					🟨 <strong className={style.sectionSpacing}>Amarelo</strong>: A letra está na palavra, mas na posição errada.
				</li>
				<li>
					⬜ <strong className={style.sectionSpacing}>Cinza</strong>: A letra não está na palavra.
				</li>
			</ul>
			<ol start="3">
				<li>🎯 Continue tentando até acertar a palavra ou esgotar as 6 tentativas.</li>
			</ol>
			<div>
				<p className={style.sectionSpacing}>Atenção ‼️</p>
				<p>A palavra vai ser do mundo tech, logo pode ser tanto em inglês quanto em português.</p>
				<p>🏁 O jogo termina quando você acerta a palavra ou usa todas as tentativas. Boa sorte e divirta-se! 🚀</p>
			</div>
		</>
	);
}

export default Help;
