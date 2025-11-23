import React, { useMemo } from "react";
import { ReactComponent as GroupSvg } from "../../svg/group.svg";
import { ReactComponent as BadgeSvg } from "../../svg/badge.svg";
import { ReactComponent as DeleteSvg } from "../../svg/delete.svg";
import { ReactComponent as KeySvg } from "../../svg/key.svg";
import styles from "./GroupCard.module.scss";

interface GroupCardProps {
  group: any;
  onViewDetails?: (group: any) => void;
  onManagePermissions?: (group: any) => void;
  onDelete?: (group: any) => void;
}

const GroupCard = ({
  group,
  onViewDetails,
  onManagePermissions,
  onDelete,
}: GroupCardProps) => {
  const getMemberCountDisplay = useMemo((): string => {
    const memberCountString: string = group.memberCount.toString();
    if (memberCountString.endsWith("1")) {
      return `${memberCountString} član`;
    } else if (
      memberCountString.endsWith("2") ||
      memberCountString.endsWith("3") ||
      memberCountString.endsWith("4")
    ) {
      return `${memberCountString} člana`;
    } else {
      return `${memberCountString} članova`;
    }
  }, [group.memberCount]);

  return (
    <div className={styles["card"]}>
      <div className={styles["card-header"]}>
        <GroupSvg className={styles["icon-group"]} />
        <div className={styles["header-content"]}>
          <h3 className={styles["card-title"]}>{group.name}</h3>
          {group.projectName && (
            <span className={styles["project-subtitle"]}>
              {group.projectName}
            </span>
          )}
        </div>
      </div>
      <div className={styles["description-wrapper"]}>
        <div className={styles["card-description"]}>
          <p>{group.description}</p>
        </div>
      </div>
      <div className={styles["badge"]}>
        <BadgeSvg className={styles["badge-icon"]} />
        {getMemberCountDisplay}
      </div>
      <div className={styles["card-actions"]}>
        <button
          className={`${styles["btn"]} ${styles["btn-text"]}`}
          onClick={() => onViewDetails?.(group)}
        >
          Pregled Detalja
        </button>
        <div className={styles["icon-actions"]}>
          <button
            className={`${styles["btn"]} ${styles["btn-icon"]}`}
            onClick={() => onManagePermissions?.(group)}
            title="Upravljaj ovlašćenjima"
          >
            <KeySvg className={styles["icon"]} />
          </button>
          <button
            className={`${styles["btn"]} ${styles["btn-icon"]}`}
            onClick={() => onDelete?.(group)}
            title="Obriši grupu"
          >
            <DeleteSvg className={styles["icon"]} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
