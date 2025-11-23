import axiosInstance from "./axiosInstance";
import { Group } from "../models/groups/Group";
import { PaginatedResponse, SearchParams } from "./userAccountApi";

export interface UserGroupDTO {
  id: number;
  applicationProjectId: number;
  applicationProjectName: string;
  name: string;
  description: string;
  isDeleted: boolean;
  memberCount: number;
}

export interface CreateUserGroupDTO {
  applicationProjectId: number;
  name: string;
  description: string;
}

export interface UserGroupSearchFilterDTO {
  applicationProjectId?: number;
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
}

export interface ApplicationRoleDTO {
  applicationProjectId: number;
  applicationName: string;
  accessRoleId: number;
  accessRoleName: string;
}

const mapUserGroupDTOToGroup = (dto: UserGroupDTO): Group => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  projectId: dto.applicationProjectId,
  isDeleted: dto.isDeleted,
  userIds: [],
});

const mapGroupToCreateDTO = (group: Group): CreateUserGroupDTO => ({
  applicationProjectId: group.projectId,
  name: group.name || "",
  description: group.description || "",
});

const mapGroupToUpdateDTO = (group: Group): UserGroupDTO => ({
  id: group.id,
  applicationProjectId: group.projectId,
  applicationProjectName: "",
  name: group.name || "",
  description: group.description || "",
  isDeleted: group.isDeleted,
  memberCount: 0,
});

export interface GroupWithProjectName extends Group {
  projectName: string;
  memberCount: number;
}

const mapUserGroupDTOToGroupWithProjectName = (
  dto: UserGroupDTO
): GroupWithProjectName => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  projectId: dto.applicationProjectId,
  isDeleted: dto.isDeleted,
  userIds: [],
  projectName: dto.applicationProjectName,
  memberCount: dto.memberCount,
});

export const groupApi = {
  getAllGroups: async (
    params: SearchParams = {}
  ): Promise<PaginatedResponse<GroupWithProjectName>> => {
    const { searchTerm = "", pageNumber = 1, pageSize = 10 } = params;
    const searchFilter: UserGroupSearchFilterDTO = {
      searchTerm,
      pageNumber,
      pageSize,
    };
    const response = await axiosInstance.get<PaginatedResponse<UserGroupDTO>>(
      "/UserGroup",
      {
        params: searchFilter,
      }
    );
    return {
      ...response.data,
      items: response.data.items.map(mapUserGroupDTOToGroupWithProjectName),
    };
  },

  getGroupById: async (id: number): Promise<Group> => {
    const response = await axiosInstance.get<UserGroupDTO>(`/UserGroup/${id}`);
    return mapUserGroupDTOToGroup(response.data);
  },

  createGroup: async (group: Group): Promise<Group> => {
    const createDTO = mapGroupToCreateDTO(group);
    const response = await axiosInstance.post<UserGroupDTO>(
      "/UserGroup/create",
      createDTO
    );
    return mapUserGroupDTOToGroup(response.data);
  },

  updateGroup: async (group: Group): Promise<boolean> => {
    const updateDTO = mapGroupToUpdateDTO(group);
    const response = await axiosInstance.put<boolean>("/UserGroup", updateDTO);
    return response.data;
  },

  deleteGroup: async (groupId: number): Promise<boolean> => {
    const response = await axiosInstance.delete<boolean>(
      `/UserGroup/${groupId}`
    );
    return response.data;
  },

  getUsersInGroup: async (groupId: number): Promise<number[]> => {
    const response = await axiosInstance.get<{ id: number }[]>(
      `/UserGroup/${groupId}/users`
    );
    return response.data.map((user) => user.id);
  },

  addUsersToGroup: async (
    groupId: number,
    userIds: number[]
  ): Promise<boolean> => {
    const response = await axiosInstance.put<boolean>(
      `/UserGroup/addUsers/${groupId}`,
      userIds
    );
    return response.data;
  },

  removeUsersFromGroup: async (
    groupId: number,
    userIds: number[]
  ): Promise<boolean> => {
    const response = await axiosInstance.put<boolean>(
      `/UserGroup/removeUsers/${groupId}`,
      userIds
    );
    return response.data;
  },

  getRolesInGroup: async (groupId: number): Promise<ApplicationRoleDTO[]> => {
    const response = await axiosInstance.get<ApplicationRoleDTO[]>(
      `/UserGroup/${groupId}/roles`
    );
    return response.data;
  },

  addRolesToGroup: async (
    groupId: number,
    accessRoleIds: number[]
  ): Promise<boolean> => {
    const response = await axiosInstance.put<boolean>(
      `/UserGroup/addRoles/${groupId}`,
      accessRoleIds
    );
    return response.data;
  },

  removeRolesFromGroup: async (
    groupId: number,
    accessRoleIds: number[]
  ): Promise<boolean> => {
    const response = await axiosInstance.put<boolean>(
      `/UserGroup/removeRoles/${groupId}`,
      accessRoleIds
    );
    return response.data;
  },
};

export default groupApi;
