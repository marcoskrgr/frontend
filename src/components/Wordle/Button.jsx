import React from "react";

import styles from "./styles.module.css";

function Button({ letter, color }) {
  return (
    <div className={`${styles.cell} ${styles[color]}`}>
      {letter}
    </div>
  );
}

export default Button;