import React from "react";
import styles from "./Table.module.scss";
import { ITable } from "./ITable";
import { IBaseEntity } from "../../models/entities/IBaseEntity";
import TableHeader from "./tableHeader/TableHeader";
import TableBody from "./tableBody/TableBody";

const Table = <T extends IBaseEntity>({
  columnDefinitions,
  entityList,
}: ITable<T>) => {
  const tableHeaders = columnDefinitions.map((col) => col.header);

  return (
    <table className={styles["table"]}>
      <TableHeader headerColumns={tableHeaders} />
      <TableBody
        columnDefinitions={columnDefinitions}
        entityList={entityList}
      />
    </table>
  );
};

export default Table;
