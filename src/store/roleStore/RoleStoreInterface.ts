import { Dispatch, SetStateAction } from "react";
import { RoleInterface } from "../../models/roles/Role";

export interface RoleStoreInterface {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  selectedRoleId: number | null;
  setSelectedRoleId: Dispatch<SetStateAction<number | null>>;
  selectedRole: RoleInterface;
  setSelectedRole: Dispatch<SetStateAction<RoleInterface>>;
  isDetailsLoading: boolean;
  setIsDetailsLoading: Dispatch<SetStateAction<boolean>>;
}
