import { UserInterface } from "../../users/User";
import { IColumnDefinition } from "../IColumnDefinition";

export const groupUserColumns = (
  onDeleteUser: (id: number) => void
): IColumnDefinition<UserInterface>[] => {
  return [
    {
      accessor: "firstName",
      header: "Ime",
    },
    {
      accessor: "lastName",
      header: "Prezime",
    },
    {
      accessor: "email",
      header: "Email",
    },
    {
      accessor: "username",
      header: "Korisničko ime",
    },
    {
      accessor: "id",
      header: "Ukloni",
      type: "delete",
      action: onDeleteUser,
    },
  ];
};
