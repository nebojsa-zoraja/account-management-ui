import React from "react";
import TableRow from "../tableRow/TableRow";
import { ITableBody } from "./ITableBody";
import { IBaseEntity } from "../../../models/entities/IBaseEntity";
import styles from "./TableBody.module.scss";

const TableBody = <T extends IBaseEntity>({
  entityList,
  columnDefinitions,
}: ITableBody<T>) => {
  return (
    <tbody className={styles["table-body-wraper"]}>
      {entityList.map((entity, index) => {
        return (
          <TableRow
            key={index}
            entity={entity}
            columnDefinitions={columnDefinitions}
          />
        );
      })}
    </tbody>
  );
};
export default TableBody;
