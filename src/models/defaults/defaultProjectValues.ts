import { PrivateLabelingSettingsEnum } from "../enums/projectEnums";
import { ProjectInterface } from "../projects/Project";

export const defaultProjectValues: ProjectInterface = {
  id: 0,
  name: "",
  isDeleted: false,
  hasProjectCheck: true,
  projectRoleAssertion: true,
  projectRoleCheck: true,
  privateLabelingSetting: PrivateLabelingSettingsEnum.UNSPECIFIED,
  assignedApplications: [],
};
