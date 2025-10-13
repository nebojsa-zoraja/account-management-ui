import React from "react";
import { ReactComponent as GroupSvg } from "../../svg/group.svg";
import { ReactComponent as BadgeSvg } from "../../svg/badge.svg";
import { ReactComponent as DeleteSvg } from "../../svg/delete.svg";
import styles from "./GroupCard.module.scss";

interface GroupCardProps {
  group: any;
}

const GroupCard = ({ group }: GroupCardProps) => {
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
        {group.members.length} members
      </div>
      <div className={styles["card-actions"]}>
        <button
          className={`${styles["btn"]} ${styles["btn-text"]}`}
          onClick={() => {}}
        >
          Pregled Detalja
        </button>
        <button
          className={`${styles["btn"]} ${styles["btn-icon"]}`}
          onClick={() => {}}
        >
          <DeleteSvg className={styles["icon"]} />
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
