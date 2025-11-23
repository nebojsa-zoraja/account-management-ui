import ManageProject from "../../pages/projects/manage/ManageProject";
import ManageUser from "../../pages/users/manage/ManageUser";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { FiX } from "react-icons/fi";
import ManageApplication from "../../pages/projects/applications/manage/ManageApplication";
import ManageRole from "../../pages/roles/manage/ManageRole";
import ManageGroup from "../../pages/groups/manage/ManageGroup";
import ManageGroupPermissions from "../../pages/groups/manage/groupPermissions/ManageGroupPermissions";
import styles from "./ManageDetails.module.scss";

interface IManageDetails {
  name: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onDeactivate?: () => void;
  onReactivate?: () => void;
  maxWidth?: "lg" | "md" | "sm" | "xl" | "xs";
  isSaving?: boolean;
  isDeleting?: boolean;
  isDeactivating?: boolean;
}

const ManageDetails = ({
  name,
  content,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onDeactivate,
  onReactivate,
  maxWidth = "md",
  isSaving = false,
  isDeleting = false,
  isDeactivating = false,
}: IManageDetails) => {
  const CloseIcon = FiX as any;

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
      case "group":
        return <ManageGroup />;
      case "group-permissions":
        return <ManageGroupPermissions />;
      default:
        return <ManageProject />;
    }
  };

  const hasDeleteActions = onDelete || onDeactivate || onReactivate;

  return (
    <Dialog
      open={isOpen}
      maxWidth={maxWidth}
      fullWidth={true}
      onClose={onClose}
    >
      <DialogTitle className={styles["dialog-title"]}>
        {name}
        <IconButton
          onClick={onClose}
          size="small"
          className={styles["dialog-close-button"]}
        >
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className={styles["dialog-content-wrapper"]}>
        {showManageDetails()}
      </DialogContent>
      <Divider />
      <DialogActions
        className={`${styles["dialog-actions"]} ${
          hasDeleteActions
            ? styles["with-delete-actions"]
            : styles["without-delete-actions"]
        }`}
      >
        <div className={styles["action-buttons-group"]}>
          {onDelete && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={onDelete}
              disabled={isSaving || isDeleting || isDeactivating}
              startIcon={
                isDeleting ? (
                  <CircularProgress
                    size={16}
                    className={styles["progress-spinner"]}
                  />
                ) : null
              }
            >
              {isDeleting ? "Brisanje..." : "Obriši"}
            </Button>
          )}
          {onDeactivate && (
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={onDeactivate}
              disabled={isSaving || isDeleting || isDeactivating}
              startIcon={
                isDeactivating ? (
                  <CircularProgress
                    size={16}
                    className={styles["progress-spinner"]}
                  />
                ) : null
              }
            >
              {isDeactivating ? "Deaktivacija..." : "Deaktiviraj"}
            </Button>
          )}
          {onReactivate && (
            <Button
              size="small"
              variant="outlined"
              color="success"
              onClick={onReactivate}
              disabled={isSaving || isDeleting || isDeactivating}
              startIcon={
                isDeactivating ? (
                  <CircularProgress
                    size={16}
                    className={styles["progress-spinner"]}
                  />
                ) : null
              }
            >
              {isDeactivating ? "Reaktivacija..." : "Reaktiviraj"}
            </Button>
          )}
        </div>
        <div className={styles["action-buttons-group"]}>
          <Button
            size="small"
            variant="outlined"
            onClick={onClose}
            disabled={isSaving || isDeleting || isDeactivating}
          >
            Otkaži
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={onSave}
            disabled={isSaving || isDeleting || isDeactivating}
            startIcon={
              isSaving ? (
                <CircularProgress
                  size={16}
                  className={styles["progress-spinner"]}
                />
              ) : null
            }
          >
            {isSaving ? "Čuvanje..." : "Sačuvaj"}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ManageDetails;
