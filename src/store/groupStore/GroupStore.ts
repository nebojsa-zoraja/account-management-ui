import { create } from "zustand";
import { GroupStoreInterface } from "./GroupStoreInterface";
import { defaultGroupValues } from "../../models/defaults/defaultGroupValues";

const useGroupStore = create<GroupStoreInterface>((set) => ({
  isEdit: false,
  setIsEdit: (isEdit) =>
    set((state) => ({
      isEdit: typeof isEdit === "function" ? isEdit(state.isEdit) : isEdit,
    })),
  selectedGroupId: null,
  setSelectedGroupId: (selectedGroupId) =>
    set((state) => ({
      selectedGroupId:
        typeof selectedGroupId === "function"
          ? selectedGroupId(state.selectedGroupId)
          : selectedGroupId,
    })),
  isDetailsLoading: false,
  setIsDetailsLoading: (isDetailsLoading) =>
    set((state) => ({
      isDetailsLoading:
        typeof isDetailsLoading === "function"
          ? isDetailsLoading(state.isDetailsLoading)
          : isDetailsLoading,
    })),
  selectedGroup: defaultGroupValues,
  setSelectedGroup: (selectedGroup) =>
    set((state) => ({
      selectedGroup:
        typeof selectedGroup === "function"
          ? selectedGroup(state.selectedGroup)
          : selectedGroup,
    })),
}));

export default useGroupStore;
