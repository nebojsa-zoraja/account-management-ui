import {
  ApplicationAccessTokenType,
  ApplicationType,
  ApplicationClientAuthMethod,
  ApplicationGrantType,
  ApplicationResponseType,
} from "../../models/enums/applicationEnums";

const applicationAccessTokenTypeOptions = [
  { value: ApplicationAccessTokenType.BEARER, label: "Bearer" },
  { value: ApplicationAccessTokenType.JWT, label: "JWT" },
];
export default applicationAccessTokenTypeOptions;

export const applicationTypeOptions = [
  { value: ApplicationType.WEB, label: "Web" },
  { value: ApplicationType.USER_AGENT, label: "Korisnički agent" },
  { value: ApplicationType.NATIVE, label: "Nativna" },
];

export const applicationClientAuthMethodOptions = [
  { value: ApplicationClientAuthMethod.BASIC, label: "Basic" },
  { value: ApplicationClientAuthMethod.POST, label: "Post" },
  { value: ApplicationClientAuthMethod.NONE, label: "Nijedna" },
  {
    value: ApplicationClientAuthMethod.PRIVATE_KEY_JWT,
    label: "Private Key JWT",
  },
];

export const applicationGrantTypeOptions = [
  {
    value: ApplicationGrantType.AUTHORIZATION_CODE,
    label: "Authorization Code",
  },
  { value: ApplicationGrantType.IMPLICIT, label: "Implicit" },
  { value: ApplicationGrantType.REFRESH_TOKEN, label: "Refresh Token" },
  { value: ApplicationGrantType.DEVICE_CODE, label: "Device Code" },
  { value: ApplicationGrantType.TOKEN_EXCHANGE, label: "Token Exchange" },
];

export const applicationResponseTypeOptions = [
  { value: ApplicationResponseType.CODE, label: "Code" },
  { value: ApplicationResponseType.ID_TOKEN, label: "ID Token" },
  { value: ApplicationResponseType.ID_TOKEN_TOKEN, label: "ID Token + Token" },
];
