import styles from "./ManageDetails.module.scss";
import ManageProject from "../../pages/projects/manage/ManageProject";
import ManageUser from "../../pages/users/manage/ManageUser";
import Dialog from "@mui/material/Dialog";
import { Button, Divider } from "@mui/material";
import ManageApplication from "../../pages/projects/applications/manage/ManageApplication";
import ManageRole from "../../pages/roles/manage/ManageRole";
import ManageProjectRole from "../../pages/projects/manage/projectRoles/addProjectRole/ManageProjectRole";
import ManageGroup from "../../pages/groups/manage/ManageGroup";

interface IManageDetails {
  name: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  maxWidth?: "lg" | "md" | "sm" | "xl" | "xs";
}

const ManageDetails = ({
  name,
  content,
  isOpen,
  onClose,
  onSave,
  maxWidth = "md",
}: IManageDetails) => {
  const showManageDetails = () => {
    switch (content) {
      case "project":
        return <ManageProject />;
      case "user":
        return <ManageUser />;
      case "application":
        return <ManageApplication />;
      case "roles":
        return <ManageRole />;
      case "project-role":
        return <ManageProjectRole />;
      case "group":
        return <ManageGroup />;
      default:
        return <ManageProject />;
    }
  };

  return (
    <Dialog
      className={styles["dialog-container"]}
      open={isOpen}
      maxWidth={maxWidth}
      fullWidth={true}
      onClose={onClose}
    >
      <div className={styles["wrapper"]}>
        <div className={styles["edit-card"]}>
          <div className={styles["card-title"]}>
            <div className={styles["title-text"]}>{name}</div>
          </div>
          {showManageDetails()}
          <Divider />
          <div className={styles["button-section"]}>
            <Button
              size="large"
              className={styles["save-button"]}
              variant="contained"
              onClick={onSave}
            >
              Sačuvaj
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ManageDetails;
