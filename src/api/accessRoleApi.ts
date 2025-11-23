import axiosInstance from "./axiosInstance";
import { RoleInterface } from "../models/roles/Role";
import { PaginatedResponse, SearchParams } from "./userAccountApi";

export interface AccessRoleDTO {
  id: number;
  name: string;
  description: string;
}

export interface UpsertAccessRoleDTO {
  name: string;
  description: string;
}

export interface ImpactedProjectDTO {
  projectId: number;
  projectName: string;
}

export interface ImpactedUserGroupDTO {
  userGroupId: number;
  userGroupName: string;
  projectId: number;
  projectName: string;
}

export interface RoleDeletionImpactDTO {
  affectedProjects: ImpactedProjectDTO[];
  affectedUserGroups: ImpactedUserGroupDTO[];
  totalAffectedProjects: number;
  totalAffectedUserGroups: number;
  canDelete: boolean;
}

const mapAccessRoleDTOToRoleInterface = (
  dto: AccessRoleDTO
): RoleInterface => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  isDeleted: false,
});

const mapRoleInterfaceToUpsertDTO = (
  role: RoleInterface
): UpsertAccessRoleDTO => ({
  name: role.name || "",
  description: role.description || "",
});

export const accessRoleApi = {
  getAllRoles: async (
    params: SearchParams = {}
  ): Promise<PaginatedResponse<RoleInterface>> => {
    const { searchTerm = "", pageNumber = 1, pageSize = 10 } = params;
    const response = await axiosInstance.get<PaginatedResponse<AccessRoleDTO>>(
      "/AccessRole",
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
      items: response.data.items.map(mapAccessRoleDTOToRoleInterface),
    };
  },

  getRoleById: async (id: number): Promise<RoleInterface> => {
    const response = await axiosInstance.get<AccessRoleDTO>(
      `/AccessRole/${id}`
    );
    return mapAccessRoleDTOToRoleInterface(response.data);
  },

  createRole: async (role: RoleInterface): Promise<RoleInterface> => {
    const createDTO = mapRoleInterfaceToUpsertDTO(role);
    const response = await axiosInstance.post<AccessRoleDTO>(
      "/AccessRole",
      createDTO
    );
    return mapAccessRoleDTOToRoleInterface(response.data);
  },

  updateRole: async (
    id: number,
    role: RoleInterface
  ): Promise<RoleInterface> => {
    const updateDTO = mapRoleInterfaceToUpsertDTO(role);
    const response = await axiosInstance.put<AccessRoleDTO>(
      `/AccessRole/${id}`,
      updateDTO
    );
    return mapAccessRoleDTOToRoleInterface(response.data);
  },

  searchRolesUnpaginated: async (
    searchTerm: string = ""
  ): Promise<RoleInterface[]> => {
    const response = await axiosInstance.get<AccessRoleDTO[]>(
      "/AccessRole/search",
      {
        params: {
          searchTerm,
        },
      }
    );
    return response.data.map(mapAccessRoleDTOToRoleInterface);
  },

  getRoleDeletionImpact: async (id: number): Promise<RoleDeletionImpactDTO> => {
    const response = await axiosInstance.get<RoleDeletionImpactDTO>(
      `/AccessRole/${id}/impact`
    );
    return response.data;
  },

  deleteRole: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/AccessRole/${id}`);
  },
};

export default accessRoleApi;
