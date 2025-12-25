import { IColumnDefinition } from "../IColumnDefinition";
import { AdminUser } from "../../../api/adminApi";
import { Chip } from "@mui/material";

export const adminUserColumns = (
  onEdit: (id: number) => void,
  onPromote: (id: number) => void,
  onDemote: (id: number) => void
): IColumnDefinition<AdminUser>[] => {
  return [
    {
      accessor: "username",
      header: "Korisničko ime",
    },
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
      accessor: "createdOn",
      header: "Datum kreiranja",
    },
    {
      accessor: "isAdmin",
      header: "Tip",
      type: "custom",
      render: (value: unknown) => {
        const isAdmin = value as boolean;
        return (
          <Chip
            label={isAdmin ? "Administrator" : "Korisnik"}
            color={isAdmin ? "primary" : "default"}
            size="small"
          />
        );
      },
    },
    {
      accessor: "id",
      header: "Akcije",
      type: "actions",
      actions: [
        {
          label: "Izmeni",
          onClick: onEdit,
          color: "primary",
          showWhen: (row: AdminUser) => row.isAdmin,
        },
        {
          label: "Unapred u admina",
          onClick: onPromote,
          color: "success",
          showWhen: (row: AdminUser) => !row.isAdmin,
        },
        {
          label: "Ukloni admina",
          onClick: onDemote,
          color: "warning",
          showWhen: (row: AdminUser) => row.isAdmin,
        },
      ],
    },
  ];
};
