import React from "react";
import {Outlet} from "react-router-dom";

import {ToastProvider} from "../Toast/ToastProvider";

import styles from "./style.module.css";

function Frame() {
	return (
		<div className={styles["frame"]}>
			<ToastProvider>
				<div className={styles["content"]}>
					<Outlet />
				</div>
			</ToastProvider>
		</div>
	);
}

export default Frame;
