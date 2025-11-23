import { IColumnDefinition } from "../../models/columnDefinitions/IColumnDefinition";
import { IBaseEntity } from "../../models/entities/IBaseEntity";

export interface ITable<T extends IBaseEntity> {
  columnDefinitions: IColumnDefinition<T>[];
  entityList: T[];
  itemsPerPage?: number;
  showPagination?: boolean;
  serverSidePagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
}
