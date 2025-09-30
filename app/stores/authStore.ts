import { create } from "zustand";
import { persist } from "zustand/middleware";

// zustand/middleware/persist 활용하여, zustand 상태를 localStorage와 동기화 했음 

interface AuthState {
	isAuthenticated: boolean;
	user: { name?: string; username?: string; isSub?: boolean } | null;
	login: (user: AuthState["user"]) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			login: (user) =>
				set({
					isAuthenticated: true,
					user,
				}),
			logout: () =>
				set({
					isAuthenticated: false,
					user: null,
				}),
		}),
		{
			name: "auth-storage",
		}
	)
);
