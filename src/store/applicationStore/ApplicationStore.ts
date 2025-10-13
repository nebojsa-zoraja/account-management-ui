import { create } from "zustand";
import { ApplicationStoreInterface } from "./ApplicationStoreInterface";
import {
  defaultApplicationDetailsValues,
  defaultApplicationValues,
} from "../../models/defaults/defaultApplicationValues";

const useApplicationStore = create<ApplicationStoreInterface>((set) => ({
  isEdit: false,
  setIsEdit: (isEdit) =>
    set((state) => ({
      isEdit: typeof isEdit === "function" ? isEdit(state.isEdit) : isEdit,
    })),
  selectedApplicationId: null,
  setSelectedApplicationId: (selectedApplicationId) =>
    set((state) => ({
      selectedApplicationId:
        typeof selectedApplicationId === "function"
          ? selectedApplicationId(state.selectedApplicationId)
          : selectedApplicationId,
    })),
  isDetailsLoading: false,
  setIsDetailsLoading: (isDetailsLoading) =>
    set((state) => ({
      isDetailsLoading:
        typeof isDetailsLoading === "function"
          ? isDetailsLoading(state.isDetailsLoading)
          : isDetailsLoading,
    })),
  selectedApplication: defaultApplicationValues,
  setSelectedApplication: (selectedApplication) =>
    set((state) => ({
      selectedApplication:
        typeof selectedApplication === "function"
          ? selectedApplication(state.selectedApplication)
          : selectedApplication,
    })),
  selectedApplicationDetails: defaultApplicationDetailsValues,
  setSelectedApplicationDetails: (selectedApplicationDetails) =>
    set((state) => ({
      selectedApplicationDetails:
        typeof selectedApplicationDetails === "function"
          ? selectedApplicationDetails(state.selectedApplicationDetails)
          : selectedApplicationDetails,
    })),
}));

export default useApplicationStore;
