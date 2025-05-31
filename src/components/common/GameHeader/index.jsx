import React, {useState, useEffect} from "react";

import {useAuthStore} from "@stores/useAuth";
import style from "./style.module.css";


function GameHeader({task, initialTime = 0}) {
	const [timer, setTimer] = useState(initialTime);

	const userData = useAuthStore((state) => state.userData);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevTimer) => prevTimer + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<div className={style["header"]}>
			<div>
				<img className={style["icon"]} src="../../../src/assets/Vector.svg" />
				<span>{userData.tickets}</span>
			</div>
			<span className={style["task"]}>{task}</span>
			<span>{formatTime(timer)}</span>
		</div>
	);
}

export default GameHeader;
