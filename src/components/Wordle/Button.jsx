import React from "react";

import styles from "./styles.module.css";

function Button({ letter, color, isActive }) {
  return (
    <div className={`${styles.cell} ${styles[color]} ${isActive ? styles.active : ""}`}>
      {letter}
    </div>
  );
}

export default Button;