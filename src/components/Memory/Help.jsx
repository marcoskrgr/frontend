import React from 'react';
import style from './style.module.css';

function Help() {
  return (
    <>
      <p>
        Este jogo foi criado para desafiar sua memória enquanto se diverte com logos de linguagens que todo dev ama (ou odeia 👀).
      </p>
      <p className={style.sectionSpacing}>
        No jogo da memória, você encontrará cartas com logos como:
      </p>
      <ul>
        <li>💛 JavaScript</li>
        <li>🐍 Python</li>
        <li>☕ Java</li>
        <li>💙 TypeScript</li>
        <li>🔷 C#</li>
        <li>🟧 HTML/CSS</li>
        <li>🦀 Rust, 🐘 PHP e mais...</li>
      </ul>
      <p className={style.sectionSpacing}><strong>Como jogar?</strong></p>
      <ul>
        <li>🃏 Clique em uma carta para revelá-la.</li>
        <li>🔁 Em seguida, clique em outra para tentar encontrar o par correspondente.</li>
        <li>✅ Se acertar, o par permanece aberto.</li>
        <li>❌ Se errar, as cartas voltam a ficar escondidas após alguns segundos.</li>
      </ul>
      <p className={style.sectionSpacing}>
        🏁 O jogo termina quando todos os pares forem encontrados. Boa sorte e que seu cérebro seja tão rápido quanto seu código! 🚀
      </p>
    </>
  );
}

export default Help;
