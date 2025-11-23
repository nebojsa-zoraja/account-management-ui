import { RoleInterface } from "../../roles/Role";
import { IColumnDefinition } from "../IColumnDefinition";

export const groupRoleColumns = (
  onDeleteRole: (id: number) => void
): IColumnDefinition<RoleInterface>[] => {
  return [
    {
      accessor: "name",
      header: "Naziv uloge",
    },
    {
      accessor: "id",
      header: "Ukloni",
      type: "delete",
      action: onDeleteRole,
    },
  ];
};
