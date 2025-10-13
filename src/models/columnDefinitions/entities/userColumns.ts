import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "../../users/User";
import { IColumnDefinition } from "../IColumnDefinition";
import useUserStore from "../../../store/userStore/UserStore";

export const userColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
): IColumnDefinition<UserInterface>[] => {
  const { setIsEdit, setSelectedUserId } = useUserStore.getState();
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
      accessor: "username",
      header: "Korisničko ime",
    },
    {
      accessor: "email",
      header: "Email",
    },
    {
      accessor: "isDeleted",
      header: "Aktivacioni status",
      type: "boolean",
    },
    {
      accessor: "id",
      header: "Izmeni",
      type: "edit",
      setIsOpen: setIsOpen,
      setIsEdit: setIsEdit,
      setSelectedId: setSelectedUserId,
    },
  ];
};
