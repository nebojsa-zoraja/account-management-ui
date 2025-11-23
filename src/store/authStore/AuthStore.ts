import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  userId: number | null;
  login: (username: string, token: string, userId: number) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      token: null,
      userId: null,
      login: (username: string, token: string, userId: number) => {
        set({
          isAuthenticated: true,
          username,
          token,
          userId,
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          username: null,
          token: null,
          userId: null,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
