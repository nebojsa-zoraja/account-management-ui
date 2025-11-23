import { Dispatch, SetStateAction, ReactNode } from "react";
import { IBaseEntity } from "../entities/IBaseEntity";

export interface IActionButton<T extends IBaseEntity> {
  label: string;
  onClick?: (id: number) => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  showWhen?: (row: T) => boolean;
}

export interface IColumnDefinition<T extends IBaseEntity> {
  accessor: keyof T;
  header: string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  setSelectedId?: Dispatch<SetStateAction<number | null>>;
  type?: "boolean" | "string" | "number" | "details" | "edit" | "delete" | "custom" | "actions";
  action?: (id: number) => void;
  render?: (value: unknown) => string | ReactNode;
  actions?: IActionButton<T>[];
}
