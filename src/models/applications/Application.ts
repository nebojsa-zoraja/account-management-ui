import { IBaseEntity } from "../entities/IBaseEntity";
import {
  ApplicationAccessTokenType,
  ApplicationType,
  ApplicationClientAuthMethod,
  ApplicationGrantType,
  ApplicationResponseType,
} from "../enums/applicationEnums";

export interface ApplicationInterface extends IBaseEntity {
  name: string;
  projectId: number;
}

export interface CreateApplicationInstanceInterface {
  name: string;
  applicationProjectId: number;
  accessTokenRoleAssertion: boolean;
  accessTokenType: ApplicationAccessTokenType;
  appType: ApplicationType;
  authMethodType: ApplicationClientAuthMethod;
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
}
