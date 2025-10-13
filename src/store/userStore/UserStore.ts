import { create } from "zustand";
import { UserStoreInterface } from "./UserStoreInterface";
import { defaultUserValues } from "../../models/defaults/defaultUserValues";

const useUserStore = create<UserStoreInterface>((set) => ({
  isEdit: false,
  setIsEdit: (isEdit) =>
    set((state) => ({
      isEdit: typeof isEdit === "function" ? isEdit(state.isEdit) : isEdit,
    })),
  selectedUserId: null,
  setSelectedUserId: (selectedUserId) =>
    set((state) => ({
      selectedUserId:
        typeof selectedUserId === "function"
          ? selectedUserId(state.selectedUserId)
          : selectedUserId,
    })),
  isDetailsLoading: false,
  setIsDetailsLoading: (isDetailsLoading) =>
    set((state) => ({
      isDetailsLoading:
        typeof isDetailsLoading === "function"
          ? isDetailsLoading(state.isDetailsLoading)
          : isDetailsLoading,
    })),
  selectedUser: defaultUserValues,
  setSelectedUser: (selectedUser) =>
    set((state) => ({
      selectedUser:
        typeof selectedUser === "function"
          ? selectedUser(state.selectedUser)
          : selectedUser,
    })),
}));

export default useUserStore;
