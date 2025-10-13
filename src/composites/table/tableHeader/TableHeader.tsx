import React from "react";
import styles from "./TableHeader.module.scss";
import { IBaseEntity } from "../../../models/entities/IBaseEntity";
import { ITableHeader } from "./ITableHeader";

const TableHeader = <T extends IBaseEntity>({
  headerColumns,
}: ITableHeader<T>) => {
  const header = headerColumns.map((col, index) => {
    return (
      <th key={index} className={styles["table-header-cell"]}>
        {col}
      </th>
    );
  });
  return (
    <thead>
      <tr className={styles["table-header"]}>{header}</tr>
    </thead>
  );
};

export default TableHeader;
