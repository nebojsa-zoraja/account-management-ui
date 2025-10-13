import { PrivateLabelingSettingsEnum } from "../../models/enums/projectEnums";

export const privateLabelingSettingsOptions = [
  { value: PrivateLabelingSettingsEnum.UNSPECIFIED, label: "Neodređeno" },
  {
    value: PrivateLabelingSettingsEnum.ENFORCE_PROJECT_RESOURCE_OWNER_POLICY,
    label: "Koristi podešavanja projekta",
  },
  {
    value: PrivateLabelingSettingsEnum.ALLOW_LOGIN_USER_RESOURCE_OWNER_POLICY,
    label: "Koristi podešavanja organizacije",
  },
];
