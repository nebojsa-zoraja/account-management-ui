import { Dispatch, SetStateAction } from "react";
import { ApplicationInterface } from "../../applications/Application";
import { IColumnDefinition } from "../IColumnDefinition";
import useApplicationStore from "../../../store/applicationStore/ApplicationStore";

export const applicationColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
): IColumnDefinition<ApplicationInterface>[] => {
  const { setIsEdit, setSelectedApplicationId } =
    useApplicationStore.getState();
  return [
    {
      accessor: "name",
      header: "Naziv aplikacije",
    },
    {
      accessor: "id",
      header: "Izmeni",
      type: "edit",
      setIsEdit: setIsEdit,
      setIsOpen: setIsOpen,
      setSelectedId: setSelectedApplicationId,
    },
  ];
};
