export enum ApplicationAccessTokenType {
  BEARER = 0,
  JWT = 1,
}

export enum ApplicationType {
  WEB = 0,
  USER_AGENT = 1,
  NATIVE = 2,
}

export enum ApplicationClientAuthMethod {
  BASIC = 0,
  POST = 1,
  NONE = 2,
  PRIVATE_KEY_JWT = 3,
}

export enum ApplicationGrantType {
  AUTHORIZATION_CODE = 0,
  IMPLICIT = 1,
  REFRESH_TOKEN = 2,
  DEVICE_CODE = 3,
  TOKEN_EXCHANGE = 4,
}

export enum ApplicationResponseType {
  CODE = 0,
  ID_TOKEN = 1,
  ID_TOKEN_TOKEN = 2,
}
