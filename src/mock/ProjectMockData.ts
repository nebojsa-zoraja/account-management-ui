import { PrivateLabelingSettingsEnum } from "../models/enums/projectEnums";
import { ProjectInterface } from "../models/projects/Project";
import { ProjectRoleInterface } from "../models/projects/ProjectRoles";

export const projects: ProjectInterface[] = [
  {
    id: 1,
    isDeleted: false,
    hasProjectCheck: true,
    projectRoleAssertion: true,
    projectRoleCheck: true,
    privateLabelingSetting: PrivateLabelingSettingsEnum.UNSPECIFIED,
    name: "Zero Cash",
  },
  {
    id: 2,
    isDeleted: false,
    hasProjectCheck: true,
    projectRoleAssertion: true,
    projectRoleCheck: true,
    privateLabelingSetting: PrivateLabelingSettingsEnum.UNSPECIFIED,
    name: "Redmine",
  },
  {
    id: 3,
    isDeleted: false,
    hasProjectCheck: true,
    projectRoleAssertion: true,
    projectRoleCheck: true,
    privateLabelingSetting: PrivateLabelingSettingsEnum.UNSPECIFIED,
    name: "Tiac Vacations",
  },
];

export const projectRoles: ProjectRoleInterface[] = [
  {
    projectId: 1,
    roleId: 1,
    isDeleted: false,
  },
  {
    projectId: 1,
    roleId: 2,
    isDeleted: false,
  },
  {
    projectId: 1,
    roleId: 3,
    isDeleted: false,
  },
  {
    projectId: 2,
    roleId: 2,
    isDeleted: false,
  },
  {
    projectId: 2,
    roleId: 4,
    isDeleted: false,
  },
  {
    projectId: 3,
    roleId: 3,
    isDeleted: false,
  },
  {
    projectId: 3,
    roleId: 5,
    isDeleted: false,
  },
];
