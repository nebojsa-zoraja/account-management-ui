import { Dispatch, SetStateAction } from "react";
import { ProjectInterface } from "../../models/projects/Project";

export interface ProjectStoreInterface {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  selectedProjectId: number | null;
  setSelectedProjectId: Dispatch<SetStateAction<number | null>>;
  selectedProject: ProjectInterface;
  setSelectedProject: Dispatch<SetStateAction<ProjectInterface>>;
  isDetailsLoading: boolean;
  setIsDetailsLoading: Dispatch<SetStateAction<boolean>>;
}
