import { useEffect, useState } from "react";
import useProjectStore from "../../../../store/projectStore/ProjectStore";
import { projectRoles } from "../../../../mock/ProjectMockData";
import { roles as rolesMock } from "../../../../mock/RoleMockData";
import { Button } from "@mui/material";
import Table from "../../../../composites/table/Table";
import styles from "./ProjectRoles.module.scss";
import { projectRoleColumns } from "../../../../models/columnDefinitions/entities/roleColumns";
import { RoleInterface } from "../../../../models/roles/Role";
import ConfirmationDialog from "../../../../components/confirmationDialog/ConfirmationDialog";
import useRoleStore from "../../../../store/roleStore/RoleStore";
import ManageDetails from "../../../../composites/manage/ManageDetails";

const ProjectRoles = () => {
  const { selectedProjectId } = useProjectStore();
  const { setSelectedRoleId, selectedRoleId } = useRoleStore();
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);

  useEffect(() => {
    if (selectedProjectId) {
      let selectedProjectRoles = projectRoles.filter(
        (x) => x.projectId === selectedProjectId
      );
      let rolesList = rolesMock.filter((x) =>
        selectedProjectRoles.some((y) => y.roleId === x.id)
      );
      setRoles(rolesList);
    }
  }, []);

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setSelectedRoleId(null);
  };

  const handleCloseAdd = () => {
    setIsAddRoleOpen(false);
  };

  const handleRemoveRole = (id: number) => {
    setRoles((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className={styles["table"]}>
      <div className={styles["content"]}>
        <Table
          columnDefinitions={projectRoleColumns(setIsConfirmOpen)}
          entityList={roles}
        />
        <Button
          className={styles["add-button"]}
          onClick={() => setIsAddRoleOpen(true)}
          variant="contained"
        >
          Dodaj ulogu
        </Button>
      </div>
      <ConfirmationDialog
        confirmationText="Da li ste sigurni da želite da uklonite ovu ulogu?"
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        action={handleRemoveRole}
        entityId={selectedRoleId!}
      />
      <ManageDetails
        content="project-role"
        name="Dodaj ulogu"
        maxWidth="sm"
        isOpen={isAddRoleOpen}
        onClose={handleCloseAdd}
        onSave={handleCloseAdd}
      />
    </div>
  );
};

export default ProjectRoles;
