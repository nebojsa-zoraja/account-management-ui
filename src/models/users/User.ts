import { IBaseEntity } from "../entities/IBaseEntity";
import { UserGender } from "../enums/userEnums";

export interface UserInterface extends IBaseEntity {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  gender?: UserGender;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
}
