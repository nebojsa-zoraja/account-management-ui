import React, { useState } from "react";
import styles from "./GroupsPage.module.scss";
import PageTitle from "../../components/pageTitle/PageTitle";
import ManageDetails from "../../composites/manage/ManageDetails";
import GroupCard from "../../components/groupCard/GroupCard";
import { groupDialogContentDefault, GroupsDialogContent } from "./utils";
import { groupsMock } from "../../mock/GroupMockData";

const GroupsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<GroupsDialogContent>(
    groupDialogContentDefault
  );
  const [groups, setGroups] = useState(groupsMock);

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleSaveGroup = () => {};

  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["page-items"]}>
          <PageTitle page="Grupe" setIsOpen={setIsOpen} />
          <div className={styles["content"]}>
            <div className={styles["content-items"]}>
              {groups.map((x, i) => (
                <GroupCard key={i} group={x} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ManageDetails
        maxWidth="sm"
        content={dialogContent.content}
        name={dialogContent.name}
        isOpen={false}
        onClose={handleCloseDialog}
        onSave={handleSaveGroup}
      />
    </>
  );
};

export default GroupsPage;
