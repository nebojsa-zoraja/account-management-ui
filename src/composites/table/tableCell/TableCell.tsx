import styles from "./TableCell.module.scss";
import { ITableCell } from "./ITableCell";
import { IBaseEntity } from "../../../models/entities/IBaseEntity";
import { ReactComponent as DetailsSvg } from "../../../svg/details.svg";
import { ReactComponent as EditSvg } from "../../../svg/edit.svg";
import { ReactComponent as DeleteSvg } from "../../../svg/delete.svg";
import { useNavigate } from "react-router-dom";

const TableCell = <T extends IBaseEntity>({
  value,
  columnDefinition,
}: ITableCell<T>) => {
  const navigate = useNavigate();
  const { type, setIsOpen, setIsEdit, setSelectedId } = columnDefinition;

  switch (type) {
    case "boolean":
      return (
        <div className={styles["table-cell"]}>
          {!value ? "Aktivan" : "Neaktivan"}
        </div>
      );
    case "details":
      return (
        <div
          className={styles["table-cell"]}
          onClick={() => navigate(`${value}`)}
        >
          <DetailsSvg className={styles["cell-icon"]} />
        </div>
      );
    case "edit":
      return (
        <div
          className={styles["table-cell"]}
          onClick={() => {
            setIsEdit && setIsEdit(true);
            setIsOpen && setIsOpen(true);
            setSelectedId && setSelectedId(value);
          }}
        >
          <EditSvg className={styles["cell-icon"]} />
        </div>
      );
    case "delete":
      return (
        <div
          className={styles["table-cell"]}
          onClick={() => {
            setSelectedId && setSelectedId(value);
            setIsOpen && setIsOpen(true);
          }}
        >
          <DeleteSvg className={styles["cell-icon"]} />
        </div>
      );
    default:
      return <div className={styles["table-cell"]}>{value}</div>;
  }
};

export default TableCell;
