import { useState } from "react";
import styles from "../../styles/PageStyles.module.scss";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../composites/table/Table";
import useRoleStore from "../../store/roleStore/RoleStore";
import { roles } from "../../mock/RoleMockData";
import { roleColumns } from "../../models/columnDefinitions/entities/roleColumns";
import ManageDetails from "../../composites/manage/ManageDetails";
import { defaultRoleValues } from "../../models/defaults/defaultRoleValues";

const RolesPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isEdit, setIsEdit, setSelectedRoleId, setSelectedRole } =
    useRoleStore();

  const handleCloseDialog = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedRoleId(null);
    setSelectedRole(defaultRoleValues);
  };

  const handleSaveRole = () => {
    if (isEdit) {
      // Save project logic here
    } else {
      // Create new project logic here
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["page-items"]}>
        <PageTitle page="Uloge" setIsOpen={setIsOpen} />
        <div
          className={`${styles["content-wrapper"]} ${
            isEdit ? styles["is-edit"] : ""
          }`}
        >
          <div className={styles["table"]}>
            <Table
              columnDefinitions={roleColumns(setIsOpen)}
              entityList={roles}
            />
          </div>

          <ManageDetails
            content="roles"
            name="Uloge"
            isOpen={isOpen}
            onClose={handleCloseDialog}
            onSave={handleSaveRole}
          />
        </div>
      </div>
    </div>
  );
};

export default RolesPage;
