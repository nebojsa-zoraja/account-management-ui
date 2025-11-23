import { Dispatch, SetStateAction } from "react";
import { ApplicationInterface } from "../../applications/Application";
import { IColumnDefinition } from "../IColumnDefinition";
import useApplicationStore from "../../../store/applicationStore/ApplicationStore";
import { ApplicationType } from "../../enums/applicationEnums";

export const applicationColumns = (
  setIsOpen: Dispatch<SetStateAction<boolean>>
): IColumnDefinition<ApplicationInterface>[] => {
  const { setIsEdit, setSelectedApplicationId } =
    useApplicationStore.getState();

  const getApplicationTypeLabel = (type: ApplicationType): string => {
    switch (type) {
      case ApplicationType.WEB:
        return "Web";
      case ApplicationType.USER_AGENT:
        return "Korisnički agent";
      case ApplicationType.NATIVE:
        return "Nativna";
      default:
        return "Nepoznato";
    }
  };

  return [
    {
      accessor: "name",
      header: "Naziv aplikacije",
    },
    {
      accessor: "appType",
      header: "Tip aplikacije",
      type: "custom",
      render: (value: unknown) => getApplicationTypeLabel(value as ApplicationType),
    },
    {
      accessor: "isDeleted",
      header: "Status",
      type: "custom",
      render: (value: unknown) => ((value as boolean) ? "Neaktivan" : "Aktivan"),
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
