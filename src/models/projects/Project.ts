import { ApplicationInterface } from "../applications/Application";
import { IBaseEntity } from "../entities/IBaseEntity";
import { PrivateLabelingSettingsEnum } from "../enums/projectEnums";

export interface ProjectInterface extends IBaseEntity {
  name: string;
  projectRoleAssertion: boolean;
  projectRoleCheck: boolean;
  hasProjectCheck: boolean;
  privateLabelingSetting: PrivateLabelingSettingsEnum;
  assignedApplications?: ApplicationInterface[];
}
