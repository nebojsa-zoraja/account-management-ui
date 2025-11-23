import React, { useState, useMemo } from "react";
import styles from "./Table.module.scss";
import { ITable } from "./ITable";
import { IBaseEntity } from "../../models/entities/IBaseEntity";
import TableHeader from "./tableHeader/TableHeader";
import TableBody from "./tableBody/TableBody";
import Pagination from "./pagination/Pagination";

const Table = <T extends IBaseEntity>({
  columnDefinitions,
  entityList,
  itemsPerPage = 10,
  showPagination = true,
  serverSidePagination = false,
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  totalCount: externalTotalCount,
  onPageChange: externalOnPageChange,
}: ITable<T>) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);

  const currentPage = serverSidePagination
    ? externalCurrentPage ?? 1
    : internalCurrentPage;
  const totalPages = serverSidePagination
    ? externalTotalPages ?? 0
    : Math.ceil(entityList.length / itemsPerPage);
  const totalItems = serverSidePagination
    ? externalTotalCount ?? 0
    : entityList.length;

  const tableHeaders = columnDefinitions.map((col) => col.header);

  const paginatedData = useMemo(() => {
    if (!showPagination || serverSidePagination) {
      return entityList;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return entityList.slice(startIndex, endIndex);
  }, [
    entityList,
    currentPage,
    itemsPerPage,
    showPagination,
    serverSidePagination,
  ]);

  const handlePageChange = (page: number) => {
    if (serverSidePagination && externalOnPageChange) {
      externalOnPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  return (
    <div className={styles["table-container"]}>
      <table className={styles["table"]}>
        <TableHeader headerColumns={tableHeaders} />
        <TableBody
          columnDefinitions={columnDefinitions}
          entityList={paginatedData}
        />
      </table>
      {entityList.length === 0 && (
        <div className={styles["empty-state"]}>
          <p>Nema rezultata</p>
        </div>
      )}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      )}
    </div>
  );
};

export default Table;
