import axiosInstance from "./axiosInstance";
import { PaginatedResponse } from "../models/entities/IPaginatedResponse";

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isDeleted: boolean;
  createdOn: string;
  createdBy: string;
}

export interface CreateAdminUserRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UpdateAdminUserRequest {
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface PromoteToAdminRequest {
  password: string;
}

export interface SearchQuery {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface AdminSearchQuery extends SearchQuery {
  isAdmin?: boolean | null; // null = all users, true = admin only, false = non-admin only
}

export const adminApi = {
  getAdminUsers: async (
    query: SearchQuery = {}
  ): Promise<PaginatedResponse<AdminUser>> => {
    const params = new URLSearchParams();
    if (query.searchTerm) params.append("searchTerm", query.searchTerm);
    if (query.pageNumber) params.append("pageNumber", query.pageNumber.toString());
    if (query.pageSize) params.append("pageSize", query.pageSize.toString());

    const response = await axiosInstance.get<PaginatedResponse<AdminUser>>(
      `/admin/users?${params.toString()}`
    );
    return response.data;
  },

  getAdminUserById: async (id: number): Promise<AdminUser> => {
    const response = await axiosInstance.get<AdminUser>(`/admin/users/${id}`);
    return response.data;
  },

  getAllUsers: async (
    query: AdminSearchQuery = {}
  ): Promise<PaginatedResponse<AdminUser>> => {
    const params = new URLSearchParams();
    if (query.searchTerm) params.append("searchTerm", query.searchTerm);
    if (query.pageNumber) params.append("pageNumber", query.pageNumber.toString());
    if (query.pageSize) params.append("pageSize", query.pageSize.toString());
    if (query.isAdmin !== undefined && query.isAdmin !== null) {
      params.append("isAdmin", query.isAdmin.toString());
    }

    const response = await axiosInstance.get<PaginatedResponse<AdminUser>>(
      `/admin/all-users?${params.toString()}`
    );
    return response.data;
  },

  createAdminUser: async (
    request: CreateAdminUserRequest
  ): Promise<AdminUser> => {
    const response = await axiosInstance.post<AdminUser>(
      "/admin/users",
      request
    );
    return response.data;
  },

  updateAdminUser: async (
    id: number,
    request: UpdateAdminUserRequest
  ): Promise<AdminUser> => {
    const response = await axiosInstance.put<AdminUser>(
      `/admin/users/${id}`,
      request
    );
    return response.data;
  },

  promoteToAdmin: async (
    userId: number,
    request: PromoteToAdminRequest
  ): Promise<AdminUser> => {
    const response = await axiosInstance.post<AdminUser>(
      `/admin/users/${userId}/promote`,
      request
    );
    return response.data;
  },

  demoteFromAdmin: async (userId: number): Promise<void> => {
    await axiosInstance.post(`/admin/users/${userId}/demote`);
  },
};

export default adminApi;
