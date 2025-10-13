import { Dispatch, SetStateAction } from "react";
import { IColumnDefinition } from "../IColumnDefinition";
import useRoleStore from "../../../store/roleStore/RoleStore";
import { RoleInterface } from "../../roles/Role";

export const roleColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
): IColumnDefinition<RoleInterface>[] => {
  const { setIsEdit, setSelectedRoleId } = useRoleStore.getState();
  return [
    {
      accessor: "name",
      header: "Naziv uloge",
    },
    {
      accessor: "id",
      header: "Izmeni",
      type: "edit",
      setIsEdit: setIsEdit,
      setIsOpen: setIsOpen,
      setSelectedId: setSelectedRoleId,
    },
  ];
};

export const projectRoleColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
): IColumnDefinition<RoleInterface>[] => {
  const { setSelectedRoleId } = useRoleStore.getState();
  return [
    {
      accessor: "name",
      header: "Naziv uloge",
    },
    {
      accessor: "id",
      header: "Izmeni",
      type: "delete",
      setSelectedId: setSelectedRoleId,
      setIsOpen: setIsOpen,
    },
  ];
};
