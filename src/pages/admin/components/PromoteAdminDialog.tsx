import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import adminApi from "../../../api/adminApi";
import styles from "../AdminPanelPage.module.scss";

interface PromoteAdminDialogProps {
  isOpen: boolean;
  userId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

const PromoteAdminDialog: React.FC<PromoteAdminDialogProps> = ({
  isOpen,
  userId,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const CloseIcon = FiX as React.ElementType;

  useEffect(() => {
    if (isOpen) {
      setPassword("");
    }
  }, [isOpen]);

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      await adminApi.promoteToAdmin(userId, { password });
      toast.success("Korisnik uspešno unapređen u administratora");
      handleClose();
      onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Greška pri unapređenju korisnika"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className={styles["dialog-title"]}>
        Unapred u administratora
        <IconButton
          onClick={handleClose}
          size="small"
          className={styles["dialog-close-button"]}
        >
          <CloseIcon size={20} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className={styles["dialog-content"]}>
        <p className={styles["dialog-description"]}>
          Da biste unapredili korisnika u administratora, morate mu dodeliti
          lozinku za prijavu.
        </p>
        <TextField
          label="Lozinka za administratora"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </DialogContent>
      <Divider />
      <DialogActions className={styles["dialog-actions"]}>
        <Button variant="outlined" onClick={handleClose} disabled={loading}>
          Otkaži
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={loading || !password}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Unapređenje..." : "Unapredi"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromoteAdminDialog;
