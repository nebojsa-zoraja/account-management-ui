import { IBaseEntity } from "../entities/IBaseEntity";

export interface Group extends IBaseEntity {
  name: string;
  description: string;
  projectId: number;
  userIds: number[];
}
