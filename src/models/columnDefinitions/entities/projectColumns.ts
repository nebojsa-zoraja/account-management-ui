import { Dispatch, SetStateAction } from "react";
import useProjectStore from "../../../store/projectStore/ProjectStore";
import { IColumnDefinition } from "../IColumnDefinition";
import { ProjectInterface } from "../../projects/Project";

export const projectColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
): IColumnDefinition<ProjectInterface>[] => {
  const { setIsEdit, setSelectedProjectId } = useProjectStore.getState();
  return [
    {
      accessor: "name",
      header: "Naziv projekta",
    },
    {
      accessor: "id",
      header: "Izmeni",
      type: "edit",
      setIsEdit: setIsEdit,
      setIsOpen: setIsOpen,
      setSelectedId: setSelectedProjectId,
    },
  ];
};
