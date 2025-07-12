import React, {useState} from "react";

import Hexagon from "../../common/Hexagon";
import SoftExpertLogoBlue from "../../../assets/SoftExtendedLogoBlue.png";
import Button from "@components/common/Button";

import styles from "./style.module.css";

function Term({onConfirm, onReject}) {
	const [confirmTerm, setConfirmTerm] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.instructions}>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis deleniti quaerat corporis culpa consequatur aliquam autem
					excepturi, eligendi similique commodi quos, illo sit voluptatem accusamus minus eveniet, ut qui officiis.
				</p>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis deleniti quaerat corporis culpa consequatur aliquam autem
					excepturi, eligendi similique commodi quos, illo sit voluptatem accusamus minus eveniet, ut qui officiis. Lorem ipsum, dolor sit
					amet consectetur adipisicing elit. Perferendis deleniti quaerat corporis culpa consequatur aliquam autem excepturi, eligendi
					similique commodi quos, illo sit voluptatem accusamus minus eveniet, ut qui officiis. Lorem ipsum, dolor sit amet consectetur
					adipisicing elit. Perferendis deleniti quaerat corporis culpa consequatur aliquam autem excepturi, eligendi similique commodi
					quos, illo sit voluptatem accusamus minus eveniet, ut qui officiis.
				</p>

			</div>
			<checkbox className={styles.checkbox}>
				<input type="checkbox" id="confirmTerm" onChange={(e) => setConfirmTerm(e.target.checked)} />
				<label htmlFor="confirmTerm">Concordo com os termos e condições</label>
			</checkbox>
			<div className={styles.buttons}>
				<Button text="Prosseguir" customStyle={{width: "100%"}} isDisabled={!confirmTerm} type="primary" size="small" onClick={onConfirm} />
			</div>
		</div>
	);
}

export default Term;
