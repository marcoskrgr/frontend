import React from "react";
import {useNavigate} from "react-router-dom";

import Modal from "@components/Home/Modal";
import Ticket from "../../../assets/Vector.svg";
import Button from "../Button";
import {useAuthStore} from "@stores/useAuth";

import style from "./style.module.css";

export default function GameHeader({task, ContentHelp, isHelpOpen, setIsHelpOpen}) {
	const userData = useAuthStore((state) => state.userData);
	const navigate = useNavigate();

	const options = [
		{label: "Voltar para o mapa", value: "map"},
		{label: "Ajuda", value: "help"}
	];

	const handleSelectOption = (opt) => {
		switch (opt.value) {
			case "map":
				navigate("/map");
				break;
			case "help":
				setIsHelpOpen(true);
				break;
			default:
				break;
		}
	};

	return (
		<div className={style.header}>
			<Button dropdownOptions={options} onSelectOption={handleSelectOption} type="primary" size="medium" icon="bx-menu" />
			<span className={style.task}>{task}</span>
			<div className={style["tickets"]}>
				<img className={style["icon"]} src={Ticket} />
				<span className={style.ticket}>{userData?.tickets}</span>
			</div>

			<Modal onClose={() => setIsHelpOpen(false)} show={isHelpOpen} title="Ajuda">
				<div className={style.modalContent}>
					<ContentHelp />
				</div>
			</Modal>
		</div>
	);
}
