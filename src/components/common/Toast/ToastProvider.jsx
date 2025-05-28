import {createContext, useContext, useState, useCallback} from "react";
import styles from "./styles.module.css";

const ToastContext = createContext();
let id = 0;

export const ToastProvider = ({children}) => {
	const [toasts, setToasts] = useState([]);

	const addToast = useCallback((message, type = "default", duration = 3000) => {
		const newToast = {id: id++, message, type};
		setToasts((prev) => [...prev, newToast]);

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
		}, duration);
	}, []);

	return (
		<ToastContext.Provider value={{addToast}}>
			{children}
			<div className={styles.toastContainer}>
				{toasts.map((toast) => (
					<div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = () => useContext(ToastContext);
