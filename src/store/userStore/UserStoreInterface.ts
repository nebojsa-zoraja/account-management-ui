import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "../../models/users/User";

export interface UserStoreInterface {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  selectedUserId: number | null;
  setSelectedUserId: Dispatch<SetStateAction<number | null>>;
  selectedUser: UserInterface;
  setSelectedUser: Dispatch<SetStateAction<UserInterface>>;
  isDetailsLoading: boolean;
  setIsDetailsLoading: Dispatch<SetStateAction<boolean>>;
}
