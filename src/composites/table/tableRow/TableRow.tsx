import React from "react";
import { IBaseEntity } from "../../../models/entities/IBaseEntity";
import { ITableRow } from "./ITableRow";
import styles from "./TableRow.module.scss";
import TableCell from "../tableCell/TableCell";

const TableRow = <T extends IBaseEntity>({
  entity,
  columnDefinitions,
}: ITableRow<T>) => {
  const rowData = columnDefinitions.map((column, index) => {
    const value = entity[column.accessor];
    return (
      <td key={index}>
        <TableCell value={value} columnDefinition={column} entity={entity} />
      </td>
    );
  });

  return <tr className={styles["table-row"]}>{rowData}</tr>;
};

export default TableRow;
