import { IColumnDefinition } from "../../../models/columnDefinitions/IColumnDefinition";
import { IBaseEntity } from "../../../models/entities/IBaseEntity";

export interface ITableCell<T extends IBaseEntity> {
  value: any;
  columnDefinition: IColumnDefinition<T>;
  entity: T;
}
