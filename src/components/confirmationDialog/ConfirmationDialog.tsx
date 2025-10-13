import { Button, Dialog, Divider } from "@mui/material";
import styles from "./ConfirmationDialog.module.scss";

interface ConfirmationDialogProps {
  confirmationText: string;
  isOpen: boolean;
  onClose: () => void;
  action: (id: number) => void;
  entityId: number;
}

const ConfirmationDialog = ({
  confirmationText,
  isOpen,
  onClose,
  action,
  entityId,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      className={styles["dialog-container"]}
      fullWidth
      open={isOpen}
      onClose={onClose}
    >
      <div className={styles["wrapper"]}>
        <div className={styles["edit-card"]}>
          <div className={styles["text-content"]}>{confirmationText}</div>
          <Divider />
          <div className={styles["button-section"]}>
            <Button
              size="large"
              className={styles["cancel-button"]}
              variant="contained"
              onClick={onClose}
            >
              Ne
            </Button>
            <Button
              size="large"
              className={styles["confirm-button"]}
              variant="contained"
              onClick={() => {
                action(entityId);
                onClose();
              }}
            >
              Da
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
