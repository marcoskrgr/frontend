import React from "react";
import classNames from "classnames";

import styles from "./style.module.css";

function Tag({ label }) {
  const tagClasses = classNames(styles["tag"], { 
    [styles["bug"]]: label === "BUG",
    [styles["task"]]: label === "TASK",
    [styles["refactor"]]: label === "REFACTOR",
  });

  return (
    <div className={tagClasses}>
      {label}
    </div>
  );
}

export default Tag;
