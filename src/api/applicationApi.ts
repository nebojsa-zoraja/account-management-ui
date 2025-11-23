import axiosInstance from "./axiosInstance";
import {
  ApplicationInterface,
  CreateApplicationInstanceInterface,
} from "../models/applications/Application";
import {
  ApplicationAccessTokenType,
  ApplicationType,
  ApplicationClientAuthMethod,
  ApplicationGrantType,
  ApplicationResponseType,
} from "../models/enums/applicationEnums";

export interface ApplicationInstanceDTO {
  id: number;
  name: string;
  applicationProjectId: number;
  accessTokenRoleAssertion: boolean;
  accessTokenType: ApplicationAccessTokenType;
  type: ApplicationType;
  authorizationMethodType: ApplicationClientAuthMethod;
  clockSkew: string;
  devMode: boolean;
  grantTypes: ApplicationGrantType[];
  idTokenRoleAssertion: boolean;
  idTokenUserinfoAssertion: boolean;
  responseTypes: ApplicationResponseType[];
  skipNativeAppSuccessPage: boolean;
  redirectUris: string[];
  postLogoutRedirectUris: string[];
  additionalOrigins: string[];
  isDeleted: boolean;
}

const mapApplicationInstanceDTOToApplicationInterface = (
  dto: ApplicationInstanceDTO
): ApplicationInterface => ({
  id: dto.id,
  name: dto.name,
  projectId: dto.applicationProjectId,
  appType: dto.type,
  isDeleted: dto.isDeleted,
});

const mapApplicationInstanceDTOToCreateInterface = (
  dto: ApplicationInstanceDTO
): CreateApplicationInstanceInterface => ({
  name: dto.name,
  applicationProjectId: dto.applicationProjectId,
  accessTokenRoleAssertion: dto.accessTokenRoleAssertion,
  accessTokenType: dto.accessTokenType,
  appType: dto.type,
  authMethodType: dto.authorizationMethodType,
  clockSkew: dto.clockSkew,
  devMode: dto.devMode,
  grantTypes: dto.grantTypes,
  idTokenRoleAssertion: dto.idTokenRoleAssertion,
  idTokenUserinfoAssertion: dto.idTokenUserinfoAssertion,
  responseTypes: dto.responseTypes,
  skipNativeAppSuccessPage: dto.skipNativeAppSuccessPage,
  redirectUris: dto.redirectUris,
  postLogoutRedirectUris: dto.postLogoutRedirectUris,
  additionalOrigins: dto.additionalOrigins,
});

export const applicationApi = {
  getApplicationsByProjectId: async (
    projectId: number
  ): Promise<ApplicationInterface[]> => {
    const response = await axiosInstance.get<ApplicationInstanceDTO[]>(
      `/ApplicationInstance/project/${projectId}`
    );
    return response.data.map(mapApplicationInstanceDTOToApplicationInterface);
  },

  getApplicationById: async (
    id: number
  ): Promise<{
    application: ApplicationInterface;
    details: CreateApplicationInstanceInterface;
  }> => {
    const response = await axiosInstance.get<ApplicationInstanceDTO>(
      `/ApplicationInstance/${id}`
    );
    return {
      application: mapApplicationInstanceDTOToApplicationInterface(
        response.data
      ),
      details: mapApplicationInstanceDTOToCreateInterface(response.data),
    };
  },

  createApplication: async (
    applicationData: CreateApplicationInstanceInterface
  ): Promise<ApplicationInterface> => {
    const response = await axiosInstance.post<ApplicationInstanceDTO>(
      "/ApplicationInstance",
      applicationData
    );
    return mapApplicationInstanceDTOToApplicationInterface(response.data);
  },

  updateApplication: async (
    id: number,
    applicationData: CreateApplicationInstanceInterface
  ): Promise<ApplicationInterface> => {
    const response = await axiosInstance.put<ApplicationInstanceDTO>(
      `/ApplicationInstance/${id}`,
      applicationData
    );
    return mapApplicationInstanceDTOToApplicationInterface(response.data);
  },

  deleteApplication: async (id: number): Promise<boolean> => {
    const response = await axiosInstance.delete<boolean>(
      `/ApplicationInstance/${id}`
    );
    return response.data;
  },

  deactivateApplication: async (id: number): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>(
      `/ApplicationInstance/${id}/deactivate`
    );
    return response.data;
  },

  reactivateApplication: async (id: number): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>(
      `/ApplicationInstance/${id}/reactivate`
    );
    return response.data;
  },
};

export default applicationApi;
