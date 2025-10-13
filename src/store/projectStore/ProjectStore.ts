import { create } from "zustand";
import { ProjectStoreInterface } from "./ProjectStoreInterface";
import { defaultProjectValues } from "../../models/defaults/defaultProjectValues";

const useProjectStore = create<ProjectStoreInterface>((set) => ({
  isEdit: false,
  setIsEdit: (isEdit) =>
    set((state) => ({
      isEdit: typeof isEdit === "function" ? isEdit(state.isEdit) : isEdit,
    })),
  selectedProjectId: null,
  setSelectedProjectId: (selectedProjectId) =>
    set((state) => ({
      selectedProjectId:
        typeof selectedProjectId === "function"
          ? selectedProjectId(state.selectedProjectId)
          : selectedProjectId,
    })),
  isDetailsLoading: false,
  setIsDetailsLoading: (isDetailsLoading) =>
    set((state) => ({
      isDetailsLoading:
        typeof isDetailsLoading === "function"
          ? isDetailsLoading(state.isDetailsLoading)
          : isDetailsLoading,
    })),
  selectedProject: defaultProjectValues,
  setSelectedProject: (selectedProject) =>
    set((state) => ({
      selectedProject:
        typeof selectedProject === "function"
          ? selectedProject(state.selectedProject)
          : selectedProject,
    })),
}));

export default useProjectStore;
