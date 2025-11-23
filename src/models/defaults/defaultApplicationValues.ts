import {
  ApplicationInterface,
  CreateApplicationInstanceInterface,
} from "../applications/Application";
import {
  ApplicationAccessTokenType,
  ApplicationType,
  ApplicationClientAuthMethod,
  ApplicationGrantType,
  ApplicationResponseType,
} from "../enums/applicationEnums";

export const defaultApplicationValues: ApplicationInterface = {
  id: 0,
  name: "",
  projectId: 0,
  appType: ApplicationType.WEB,
  isDeleted: false,
};

export const defaultApplicationDetailsValues: CreateApplicationInstanceInterface =
  {
    name: "",
    applicationProjectId: 0,
    accessTokenRoleAssertion: false,
    accessTokenType: ApplicationAccessTokenType.BEARER,
    appType: ApplicationType.WEB,
    authMethodType: ApplicationClientAuthMethod.BASIC,
    clockSkew: "1",
    devMode: true,
    grantTypes: [ApplicationGrantType.AUTHORIZATION_CODE],
    idTokenRoleAssertion: false,
    idTokenUserinfoAssertion: false,
    responseTypes: [ApplicationResponseType.CODE],
    skipNativeAppSuccessPage: false,
    redirectUris: [],
    postLogoutRedirectUris: [],
    additionalOrigins: [],
  };
