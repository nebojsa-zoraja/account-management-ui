import { IColumnDefinition } from "../../../models/columnDefinitions/IColumnDefinition";
import { IBaseEntity } from "../../../models/entities/IBaseEntity";

export interface ITableRow<T extends IBaseEntity> {
  entity: T;
  columnDefinitions: IColumnDefinition<T>[];
}
