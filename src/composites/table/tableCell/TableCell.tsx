import styles from "./TableCell.module.scss";
import { ITableCell } from "./ITableCell";
import { IBaseEntity } from "../../../models/entities/IBaseEntity";
import { ReactComponent as DetailsSvg } from "../../../svg/details.svg";
import { ReactComponent as EditSvg } from "../../../svg/edit.svg";
import { ReactComponent as DeleteSvg } from "../../../svg/delete.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const TableCell = <T extends IBaseEntity>({
  value,
  columnDefinition,
  entity,
}: ITableCell<T>) => {
  const navigate = useNavigate();
  const { type, setIsOpen, setIsEdit, setSelectedId, action, render, actions } = columnDefinition;

  switch (type) {
    case "boolean":
      return (
        <div className={styles["table-cell"]}>
          {!value ? "Aktivan" : "Neaktivan"}
        </div>
      );
    case "custom":
      return (
        <div className={styles["table-cell"]}>
          {render ? render(value) : value}
        </div>
      );
    case "actions":
      return (
        <div className={`${styles["table-cell"]} ${styles["actions-cell"]}`}>
          {actions?.map((actionButton, index) => {
            const shouldShow = actionButton.showWhen ? actionButton.showWhen(entity) : true;
            if (!shouldShow) return null;
            return (
              <Button
                key={index}
                size="small"
                variant="outlined"
                color={actionButton.color || "primary"}
                onClick={() => actionButton.onClick && actionButton.onClick(entity.id)}
              >
                {actionButton.label}
              </Button>
            );
          })}
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
            if (action) {
              action(value as number);
            } else {
              setSelectedId && setSelectedId(value);
              setIsOpen && setIsOpen(true);
            }
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
