import { IColumnDefinition } from "../../models/columnDefinitions/IColumnDefinition";
import { IBaseEntity } from "../../models/entities/IBaseEntity";

export interface ITable<T extends IBaseEntity> {
  columnDefinitions: IColumnDefinition<T>[];
  entityList: T[];
}
