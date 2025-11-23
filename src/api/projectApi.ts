import axiosInstance from "./axiosInstance";
import { ProjectInterface } from "../models/projects/Project";
import { PrivateLabelingSettingsEnum } from "../models/enums/projectEnums";
import { PaginatedResponse, SearchParams } from "./userAccountApi";
import { RoleInterface } from "../models/roles/Role";

export interface ProjectDTO {
  id: number;
  name: string;
  projectRoleAssertion: boolean;
  projectRoleCheck: boolean;
  hasProjectCheck: boolean;
  privateLabelingSetting: PrivateLabelingSettingsEnum;
  isDeleted: boolean;
}

export interface UpsertProjectDTO {
  name: string;
  projectRoleAssertion: boolean;
  projectRoleCheck: boolean;
  hasProjectCheck: boolean;
  privateLabelingSetting: PrivateLabelingSettingsEnum;
}

export interface ApplicationRoleDTO {
  applicationProjectId: number;
  applicationName: string;
  accessRoleId: number;
  accessRoleName: string;
}

const mapProjectDTOToProjectInterface = (
  dto: ProjectDTO
): ProjectInterface => ({
  id: dto.id,
  name: dto.name,
  projectRoleAssertion: dto.projectRoleAssertion,
  projectRoleCheck: dto.projectRoleCheck,
  hasProjectCheck: dto.hasProjectCheck,
  privateLabelingSetting: dto.privateLabelingSetting,
  isDeleted: dto.isDeleted,
});

const mapProjectInterfaceToUpsertDTO = (
  project: ProjectInterface
): UpsertProjectDTO => ({
  name: project.name || "",
  projectRoleAssertion: project.projectRoleAssertion ?? false,
  projectRoleCheck: project.projectRoleCheck ?? false,
  hasProjectCheck: project.hasProjectCheck ?? false,
  privateLabelingSetting:
    project.privateLabelingSetting ?? PrivateLabelingSettingsEnum.UNSPECIFIED,
});

const mapApplicationRoleDTOToRoleInterface = (
  dto: ApplicationRoleDTO
): RoleInterface => ({
  id: dto.accessRoleId,
  name: dto.accessRoleName,
  description: "",
  isDeleted: false,
});

export const projectApi = {
  getAllProjects: async (
    params: SearchParams = {}
  ): Promise<PaginatedResponse<ProjectInterface>> => {
    const { searchTerm = "", pageNumber = 1, pageSize = 10 } = params;
    const response = await axiosInstance.get<PaginatedResponse<ProjectDTO>>(
      "/ApplicationProject",
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
      items: response.data.items.map(mapProjectDTOToProjectInterface),
    };
  },

  getProjectById: async (id: number): Promise<ProjectInterface> => {
    const response = await axiosInstance.get<ProjectDTO>(
      `/ApplicationProject/${id}`
    );
    return mapProjectDTOToProjectInterface(response.data);
  },

  createProject: async (
    project: ProjectInterface
  ): Promise<ProjectInterface> => {
    const createDTO = mapProjectInterfaceToUpsertDTO(project);
    const response = await axiosInstance.post<ProjectDTO>(
      "/ApplicationProject",
      createDTO
    );
    return mapProjectDTOToProjectInterface(response.data);
  },

  updateProject: async (
    id: number,
    project: ProjectInterface
  ): Promise<ProjectInterface> => {
    const updateDTO = mapProjectInterfaceToUpsertDTO(project);
    const response = await axiosInstance.put<ProjectDTO>(
      `/ApplicationProject/${id}`,
      updateDTO
    );
    return mapProjectDTOToProjectInterface(response.data);
  },

  getProjectRoles: async (projectId: number): Promise<RoleInterface[]> => {
    const response = await axiosInstance.get<ApplicationRoleDTO[]>(
      `/ApplicationProject/${projectId}/roles`
    );
    return response.data.map(mapApplicationRoleDTOToRoleInterface);
  },

  searchProjectRoles: async (
    projectId: number,
    searchTerm: string = ""
  ): Promise<RoleInterface[]> => {
    const response = await axiosInstance.get<ApplicationRoleDTO[]>(
      `/ApplicationProject/${projectId}/roles/search`,
      {
        params: {
          searchTerm,
        },
      }
    );
    return response.data.map(mapApplicationRoleDTOToRoleInterface);
  },

  addRolesToProject: async (
    projectId: number,
    roleIds: number[]
  ): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>(
      `/ApplicationProject/addApplicationProjectRoles/${projectId}`,
      roleIds
    );
    return response.data;
  },

  removeRoleFromProject: async (
    projectId: number,
    roleId: number
  ): Promise<boolean> => {
    const response = await axiosInstance.delete<boolean>(
      `/ApplicationProject/${projectId}/roles/${roleId}`
    );
    return response.data;
  },

  deleteProject: async (projectId: number): Promise<boolean> => {
    const response = await axiosInstance.delete<boolean>(
      `/ApplicationProject/${projectId}`
    );
    return response.data;
  },

  deactivateProject: async (projectId: number): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>(
      `/ApplicationProject/${projectId}/deactivate`
    );
    return response.data;
  },

  reactivateProject: async (projectId: number): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>(
      `/ApplicationProject/${projectId}/reactivate`
    );
    return response.data;
  },
};

export default projectApi;
