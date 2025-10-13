import { IBaseEntity } from "../entities/IBaseEntity";

export interface UserInterface extends IBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}
