import { useState, useCallback } from 'react';

import Grid from '@components/Wordle';
import Keyboard from '@components/Wordle/Keyboard.jsx';
import GameHeader from '@components/common/GameHeader';

import styles from '@components/Wordle/styles.module.css';

const CONFIG = {
  MAX_ATTEMPTS: 6,
  WORD_LENGTH: 5,
  SECRET_WORD: 'LIVRO',
};

const GameOverMessage = ({ gameState, secretWord }) => (
  gameState !== 'playing' && (
    <div className={styles.message} role="alert" aria-live="assertive">
      {gameState === 'won' ? 'Parabéns! Você acertou!' : `Fim de jogo! Palavra: ${secretWord}`}
    </div>
  )
);

export default function Wordle() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState('playing');

  const handleKeyPress = useCallback(
    (key) => {
      if (gameState !== 'playing') return;

      const normalizedKey = key.toUpperCase();
      if (normalizedKey === 'ENTER') {
        if (currentGuess.length === CONFIG.WORD_LENGTH) {
          const newGuesses = [...guesses, currentGuess];
          setGuesses(newGuesses);
          setCurrentGuess('');

          if (currentGuess === CONFIG.SECRET_WORD) {
            setGameState('won');
          } else if (newGuesses.length === CONFIG.MAX_ATTEMPTS) {
            setGameState('lost');
          }
        }
      } else if (normalizedKey === 'BACKSPACE') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < CONFIG.WORD_LENGTH && /^[A-Z]$/.test(normalizedKey)) {
        setCurrentGuess((prev) => prev + normalizedKey);
      }
    },
    [currentGuess, gameState, guesses]
  );

  const getLetterColor = (letter, index, guess) => {
    if (letter === CONFIG.SECRET_WORD[index]) return 'green';
    const letterCount = CONFIG.SECRET_WORD.split('').filter((l) => l === letter).length;
    const guessedCount = guess
      .slice(0, index + 1)
      .split('')
      .filter((l) => l === letter).length;
    if (CONFIG.SECRET_WORD.includes(letter) && guessedCount <= letterCount) return 'goldenrod';
    return 'gray';
  };

  return (
    <div className={styles.wordleContainer}>
      <GameHeader task="Task 3" />
      <Grid guesses={guesses} currentGuess={currentGuess} getLetterColor={getLetterColor} />
      <Keyboard onKeyPress={handleKeyPress} guesses={guesses} getLetterColor={getLetterColor} />
      <GameOverMessage gameState={gameState} secretWord={CONFIG.SECRET_WORD} />
    </div>
  );
}