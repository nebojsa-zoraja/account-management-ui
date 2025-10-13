import { IBaseEntity } from "../../../models/entities/IBaseEntity";

export interface ITableHeader<T extends IBaseEntity> {
  headerColumns: string[];
}
