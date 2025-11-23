import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7108/accountManagementApi";

// Separate axios instance for auth that doesn't use interceptors
const authAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
});

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  accessTokenExpiration: string;
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
  accessTokenExpiration: string;
}

export const authApi = {
  login: async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await authAxios.post<LoginResponse>(
      "/auth/login",
      request
    );
    return response.data;
  },

  refresh: async (): Promise<RefreshTokenResponse> => {
    const response = await authAxios.post<RefreshTokenResponse>(
      "/auth/refresh"
    );
    return response.data;
  },

  logout: async (accessToken: string): Promise<void> => {
    await authAxios.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
};

export default authApi;
