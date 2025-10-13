import { Dispatch, SetStateAction } from "react";
import { IBaseEntity } from "../entities/IBaseEntity";

export interface IColumnDefinition<T extends IBaseEntity> {
  accessor: keyof T;
  header: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  setSelectedId?: Dispatch<SetStateAction<number | null>>;
  type?: "boolean" | "string" | "number" | "details" | "edit" | "delete";
  action?: (id: number) => void;
}
