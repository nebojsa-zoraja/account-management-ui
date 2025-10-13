import { IBaseEntity } from "../entities/IBaseEntity";

export interface RoleInterface extends IBaseEntity {
  name: string;
  description: string;
}
