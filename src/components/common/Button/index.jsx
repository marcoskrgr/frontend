import React, {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Loading from "./Loading";
import styles from "./style.module.css";

function Button({size, type, icon, text, onClick, isDisabled, customStyle = {}, loading, dropdownOptions = null, onSelectOption}) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const buttonClasses = classNames(styles.btn, {
		[styles[`btn-${size}`]]: size,
		[styles[`btn-${type}`]]: type,
		[styles["btn-disabled"]]: isDisabled
	});

	const handleClick = (e) => {
		if (isDisabled) return;
		if (dropdownOptions) {
			setIsOpen((prev) => !prev);
		} else {
			onClick?.(e);
		}
	};

	const handleSelect = (option) => {
		onSelectOption?.(option);
		setIsOpen(false);
	};

	return (
		<div ref={dropdownRef} style={{position: "relative", display: "inline-block"}}>
			<button style={customStyle} onClick={handleClick} disabled={isDisabled} className={buttonClasses}>
				{icon && <i className={`bx ${icon}`}></i>}
				{!loading ? <span>{text}</span> : <Loading />}
			</button>

			{isOpen && dropdownOptions && (
				<div className={styles["dropdown-menu"]}>
					{dropdownOptions.map((opt) => (
						<div key={opt.value} className={styles["dropdown-item"]} onClick={() => handleSelect(opt)}>
							<span>{opt.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

Button.propTypes = {
	size: PropTypes.oneOf(["small", "medium", "large"]),
	type: PropTypes.string,
	icon: PropTypes.string,
	customStyle: PropTypes.object,
	text: PropTypes.string,
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
	dropdownOptions: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			value: PropTypes.any
		})
	),
	onSelectOption: PropTypes.func
};

export default Button;
