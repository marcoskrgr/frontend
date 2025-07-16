import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useAuthStore = create(
	persist(
		(set) => ({
			token: null,
			userData: null,
			tasksStatus: {},
			wasLastTaskMarked: false,

			setToken: (token) => set({token}),
			setUserData: (userData) => set({userData}),

			// Gambiarra......
			markLastTaskAsPlayed: () => set({wasLastTaskMarked: true}),

			clearAuth: () =>
				set({
					token: null,
					userData: null,
					tasksStatus: {},
					wasLastTaskMarked: false
				})
		}),
		{
			name: "auth-storage"
		}
	)
);
