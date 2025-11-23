import axiosInstance from "./axiosInstance";
import { UserInterface } from "../models/users/User";
import { UserGender } from "../models/enums/userEnums";

export interface UserAccountDTO {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: UserGender;
  isDeleted: boolean;
}

export interface CreateUserAccountDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: UserGender;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SearchParams {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface UserImportResult {
  rowNumber: number;
  email: string;
  username: string;
  success: boolean;
  errorMessage?: string;
  userData?: UserAccountDTO;
}

export interface BulkImportResult {
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  results: UserImportResult[];
}

const mapUserAccountDTOToUserInterface = (
  dto: UserAccountDTO
): UserInterface => ({
  id: dto.id,
  firstName: dto.firstName,
  lastName: dto.lastName,
  username: dto.username,
  email: dto.email,
  phoneNumber: dto.phoneNumber,
  gender: dto.gender,
  isDeleted: dto.isDeleted,
});

const mapUserInterfaceToUserAccountDTO = (
  user: UserInterface
): UserAccountDTO => ({
  id: user.id,
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  username: user.username || "",
  email: user.email || "",
  phoneNumber: user.phoneNumber || "",
  gender: user.gender ?? UserGender.Unspecified,
  isDeleted: user.isDeleted,
});

const mapUserInterfaceToCreateDTO = (
  user: UserInterface
): CreateUserAccountDTO => ({
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  username: user.username || "",
  email: user.email || "",
  password: user.password || "",
  phoneNumber: user.phoneNumber || "",
  gender: user.gender ?? UserGender.Unspecified,
});

export const userAccountApi = {
  getAllUsers: async (
    params: SearchParams = {}
  ): Promise<PaginatedResponse<UserInterface>> => {
    const { searchTerm = "", pageNumber = 1, pageSize = 10 } = params;
    const response = await axiosInstance.get<PaginatedResponse<UserAccountDTO>>(
      "/UserAccount",
      {
        params: {
          searchTerm,
          pageNumber,
          pageSize,
        },
      }
    );
    return {
      ...response.data,
      items: response.data.items.map(mapUserAccountDTOToUserInterface),
    };
  },

  getUserById: async (id: number): Promise<UserInterface> => {
    const response = await axiosInstance.get<UserAccountDTO>(
      `/UserAccount/${id}`
    );
    return mapUserAccountDTOToUserInterface(response.data);
  },

  createUser: async (user: UserInterface): Promise<UserInterface> => {
    const createDTO = mapUserInterfaceToCreateDTO(user);
    const response = await axiosInstance.post<UserAccountDTO>(
      "/UserAccount",
      createDTO
    );
    return mapUserAccountDTOToUserInterface(response.data);
  },

  updateUser: async (
    id: number,
    user: UserInterface
  ): Promise<UserInterface> => {
    const updateDTO = mapUserInterfaceToUserAccountDTO(user);
    const response = await axiosInstance.put<UserAccountDTO>(
      `/UserAccount/${id}`,
      updateDTO
    );
    return mapUserAccountDTOToUserInterface(response.data);
  },

  deactivateUser: async (id: number): Promise<void> => {
    await axiosInstance.post(`/UserAccount/${id}/deactivate`);
  },

  reactivateUser: async (id: number): Promise<void> => {
    await axiosInstance.post(`/UserAccount/${id}/reactivate`);
  },

  importUsersFromCsv: async (file: File): Promise<BulkImportResult> => {
    const formData = new FormData();
    formData.append("file", file);

    // Override default Content-Type to let browser set multipart/form-data with boundary
    const response = await axiosInstance.post<BulkImportResult>(
      "/UserAccount/import-csv",
      formData,
      {
        headers: {
          "Content-Type": undefined,
        },
      }
    );
    return response.data;
  },
};

export default userAccountApi;
