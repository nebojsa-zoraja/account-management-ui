import {
  ApplicationType,
  ApplicationClientAuthMethod,
  ApplicationGrantType,
  ApplicationResponseType,
} from "../models/enums/applicationEnums";

export interface DropdownOption {
  value: number;
  label: string;
}

export const getAllowedAuthMethods = (
  appType: ApplicationType
): ApplicationClientAuthMethod[] => {
  switch (appType) {
    case ApplicationType.WEB:
      return [
        ApplicationClientAuthMethod.BASIC,
        ApplicationClientAuthMethod.POST,
        ApplicationClientAuthMethod.PRIVATE_KEY_JWT,
      ];
    case ApplicationType.USER_AGENT:
      return [ApplicationClientAuthMethod.NONE];
    case ApplicationType.NATIVE:
      return [ApplicationClientAuthMethod.NONE];
    default:
      return [];
  }
};

export const getAllowedGrantTypes = (
  appType: ApplicationType
): ApplicationGrantType[] => {
  switch (appType) {
    case ApplicationType.WEB:
      return [
        ApplicationGrantType.AUTHORIZATION_CODE,
        ApplicationGrantType.REFRESH_TOKEN,
        ApplicationGrantType.DEVICE_CODE,
        ApplicationGrantType.TOKEN_EXCHANGE,
      ];
    case ApplicationType.USER_AGENT:
      return [
        ApplicationGrantType.AUTHORIZATION_CODE,
        ApplicationGrantType.IMPLICIT,
        ApplicationGrantType.REFRESH_TOKEN,
      ];
    case ApplicationType.NATIVE:
      return [
        ApplicationGrantType.AUTHORIZATION_CODE,
        ApplicationGrantType.REFRESH_TOKEN,
        ApplicationGrantType.DEVICE_CODE,
      ];
    default:
      return [];
  }
};

export const getRecommendedGrantTypes = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _appType: ApplicationType
): ApplicationGrantType[] => {
  return [
    ApplicationGrantType.AUTHORIZATION_CODE,
    ApplicationGrantType.REFRESH_TOKEN,
  ];
};

export const getAllowedResponseTypes = (
  appType: ApplicationType
): ApplicationResponseType[] => {
  switch (appType) {
    case ApplicationType.WEB:
      return [ApplicationResponseType.CODE];
    case ApplicationType.USER_AGENT:
      return [
        ApplicationResponseType.CODE,
        ApplicationResponseType.ID_TOKEN,
        ApplicationResponseType.ID_TOKEN_TOKEN,
      ];
    case ApplicationType.NATIVE:
      return [ApplicationResponseType.CODE];
    default:
      return [];
  }
};

export const getRecommendedResponseType = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _appType: ApplicationType
): ApplicationResponseType => {
  // For all application types, CODE is the recommended response type (Authorization Code flow)
  return ApplicationResponseType.CODE;
};

export const filterAuthMethodOptions = (
  allOptions: DropdownOption[],
  appType: ApplicationType
): DropdownOption[] => {
  const allowed = getAllowedAuthMethods(appType);
  return allOptions.filter((option) => allowed.includes(option.value));
};

export const filterGrantTypeOptions = (
  allOptions: DropdownOption[],
  appType: ApplicationType
): DropdownOption[] => {
  const allowed = getAllowedGrantTypes(appType);
  return allOptions.filter((option) => allowed.includes(option.value));
};

export const filterResponseTypeOptions = (
  allOptions: DropdownOption[],
  appType: ApplicationType
): DropdownOption[] => {
  const allowed = getAllowedResponseTypes(appType);
  return allOptions.filter((option) => allowed.includes(option.value));
};

export const isAuthMethodAllowed = (
  appType: ApplicationType,
  authMethod: ApplicationClientAuthMethod
): boolean => {
  const allowed = getAllowedAuthMethods(appType);
  return allowed.includes(authMethod);
};

export const isGrantTypeAllowed = (
  appType: ApplicationType,
  grantType: ApplicationGrantType
): boolean => {
  const allowed = getAllowedGrantTypes(appType);
  return allowed.includes(grantType);
};

export const isResponseTypeAllowed = (
  appType: ApplicationType,
  responseType: ApplicationResponseType
): boolean => {
  const allowed = getAllowedResponseTypes(appType);
  return allowed.includes(responseType);
};

export const getApplicationTypeHelpText = (
  appType: ApplicationType
): string => {
  switch (appType) {
    case ApplicationType.WEB:
      return "Web aplikacije koriste Authorization Code flow sa PKCE. Podržavaju Basic, Post i Private Key JWT autentifikaciju.";
    case ApplicationType.USER_AGENT:
      return "Single Page aplikacije (SPA) koriste Authorization Code flow sa PKCE. PKCE je obavezan (bez client secret).";
    case ApplicationType.NATIVE:
      return "Nativne aplikacije (mobilne/desktop) koriste Authorization Code flow sa PKCE. PKCE je obavezan.";
    default:
      return "";
  }
};

export const getDeprecationWarning = (
  grantTypes: ApplicationGrantType[]
): string | null => {
  if (grantTypes.includes(ApplicationGrantType.IMPLICIT)) {
    return "Implicit flow je zastareo i ne preporučuje se. Koristite Authorization Code sa PKCE.";
  }
  return null;
};

export const validateResponseTypes = (
  responseTypes: ApplicationResponseType[]
): string | null => {
  const hasCode = responseTypes.includes(ApplicationResponseType.CODE);
  const hasImplicit =
    responseTypes.includes(ApplicationResponseType.ID_TOKEN) ||
    responseTypes.includes(ApplicationResponseType.ID_TOKEN_TOKEN);

  if (hasCode && hasImplicit) {
    return "Ne možete kombinovati Authorization Code flow (CODE) sa Implicit flow (ID_TOKEN). Koristite samo CODE za moderne SPA aplikacije.";
  }
  return null;
};

export const validateGrantAndResponseTypeCompatibility = (
  grantTypes: ApplicationGrantType[],
  responseTypes: ApplicationResponseType[]
): string | null => {
  const hasAuthCodeGrant = grantTypes.includes(
    ApplicationGrantType.AUTHORIZATION_CODE
  );
  const hasImplicitGrant = grantTypes.includes(ApplicationGrantType.IMPLICIT);
  const hasCodeResponse = responseTypes.includes(ApplicationResponseType.CODE);
  const hasImplicitResponse =
    responseTypes.includes(ApplicationResponseType.ID_TOKEN) ||
    responseTypes.includes(ApplicationResponseType.ID_TOKEN_TOKEN);

  if (hasAuthCodeGrant && !hasCodeResponse && !hasImplicitGrant) {
    return "AUTHORIZATION_CODE grant type zahteva CODE response type.";
  }

  if (hasImplicitGrant && !hasImplicitResponse) {
    return "IMPLICIT grant type zahteva ID_TOKEN ili ID_TOKEN_TOKEN response type.";
  }

  if (hasImplicitResponse && !hasImplicitGrant && !hasCodeResponse) {
    return "ID_TOKEN ili ID_TOKEN_TOKEN response type zahteva IMPLICIT grant type (zastarelo) ili CODE response type sa AUTHORIZATION_CODE grant type.";
  }

  return null;
};
