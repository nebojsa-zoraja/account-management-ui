import { create } from "zustand";
import { RoleStoreInterface } from "./RoleStoreInterface";
import { defaultRoleValues } from "../../models/defaults/defaultRoleValues";

const useRoleStore = create<RoleStoreInterface>((set) => ({
  isEdit: false,
  setIsEdit: (isEdit) =>
    set((state) => ({
      isEdit: typeof isEdit === "function" ? isEdit(state.isEdit) : isEdit,
    })),
  selectedRoleId: null,
  setSelectedRoleId: (selectedRoleId) =>
    set((state) => ({
      selectedRoleId:
        typeof selectedRoleId === "function"
          ? selectedRoleId(state.selectedRoleId)
          : selectedRoleId,
    })),
  isDetailsLoading: false,
  setIsDetailsLoading: (isDetailsLoading) =>
    set((state) => ({
      isDetailsLoading:
        typeof isDetailsLoading === "function"
          ? isDetailsLoading(state.isDetailsLoading)
          : isDetailsLoading,
    })),
  selectedRole: defaultRoleValues,
  setSelectedRole: (selectedRole) =>
    set((state) => ({
      selectedRole:
        typeof selectedRole === "function"
          ? selectedRole(state.selectedRole)
          : selectedRole,
    })),
}));

export default useRoleStore;
