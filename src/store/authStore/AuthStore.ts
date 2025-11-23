import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;
  tokenExpiration: string | null;
  login: (user: AuthUser, accessToken: string, tokenExpiration: string) => void;
  logout: () => void;
  setAccessToken: (accessToken: string, tokenExpiration: string) => void;
  isTokenExpired: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      tokenExpiration: null,
      login: (user: AuthUser, accessToken: string, tokenExpiration: string) => {
        set({
          isAuthenticated: true,
          user,
          accessToken,
          tokenExpiration,
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          tokenExpiration: null,
        });
      },
      setAccessToken: (accessToken: string, tokenExpiration: string) => {
        set({
          accessToken,
          tokenExpiration,
        });
      },
      isTokenExpired: () => {
        const { tokenExpiration } = get();
        if (!tokenExpiration) return true;
        return new Date(tokenExpiration) <= new Date();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
