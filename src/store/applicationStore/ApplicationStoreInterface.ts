import { Dispatch, SetStateAction } from "react";
import {
  ApplicationInterface,
  CreateApplicationInstanceInterface,
} from "../../models/applications/Application";

export interface ApplicationStoreInterface {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  selectedApplicationId: number | null;
  setSelectedApplicationId: Dispatch<SetStateAction<number | null>>;
  selectedApplication: ApplicationInterface;
  setSelectedApplication: Dispatch<SetStateAction<ApplicationInterface>>;
  selectedApplicationDetails: CreateApplicationInstanceInterface;
  setSelectedApplicationDetails: Dispatch<
    SetStateAction<CreateApplicationInstanceInterface>
  >;
  isDetailsLoading: boolean;
  setIsDetailsLoading: Dispatch<SetStateAction<boolean>>;
}
