import { IColumnDefinition } from "../../../models/columnDefinitions/IColumnDefinition";
import { IBaseEntity } from "../../../models/entities/IBaseEntity";

export interface ITableBody<T extends IBaseEntity> {
  entityList: T[];
  columnDefinitions: IColumnDefinition<T>[];
}
