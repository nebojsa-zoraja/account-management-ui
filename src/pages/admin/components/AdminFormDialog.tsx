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
import adminApi, {
  AdminUser,
  CreateAdminUserRequest,
  UpdateAdminUserRequest,
} from "../../../api/adminApi";
import styles from "../AdminPanelPage.module.scss";

interface AdminFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingUser?: AdminUser | null;
}

const initialCreateForm: CreateAdminUserRequest = {
  username: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
};

const AdminFormDialog: React.FC<AdminFormDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editingUser,
}) => {
  const [form, setForm] = useState<CreateAdminUserRequest | UpdateAdminUserRequest>(initialCreateForm);
  const [loading, setLoading] = useState(false);
  const isEditMode = !!editingUser;

  const CloseIcon = FiX as React.ElementType;

  useEffect(() => {
    if (editingUser) {
      setForm({
        email: editingUser.email,
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        password: "",
      });
    } else {
      setForm(initialCreateForm);
    }
  }, [editingUser, isOpen]);

  const handleClose = () => {
    setForm(initialCreateForm);
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (isEditMode && editingUser) {
        await adminApi.updateAdminUser(editingUser.id, form as UpdateAdminUserRequest);
        toast.success("Administrator uspešno ažuriran");
      } else {
        await adminApi.createAdminUser(form as CreateAdminUserRequest);
        toast.success("Administrator uspešno kreiran");
      }
      handleClose();
      onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          (isEditMode ? "Greška pri ažuriranju administratora" : "Greška pri kreiranju administratora")
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className={styles["dialog-title"]}>
        {isEditMode ? "Izmeni administratora" : "Kreiraj administratora"}
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
        {!isEditMode && (
          <TextField
            label="Korisničko ime"
            fullWidth
            margin="normal"
            value={(form as CreateAdminUserRequest).username || ""}
            onChange={(e) => updateField("username", e.target.value)}
            required
          />
        )}
        <TextField
          label={isEditMode ? "Nova lozinka (ostavite prazno za zadržavanje trenutne)" : "Lozinka"}
          type="password"
          fullWidth
          margin="normal"
          value={form.password || ""}
          onChange={(e) => updateField("password", e.target.value)}
          required={!isEditMode}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
          required={!isEditMode}
        />
        <TextField
          label="Ime"
          fullWidth
          margin="normal"
          value={form.firstName || ""}
          onChange={(e) => updateField("firstName", e.target.value)}
          required={!isEditMode}
        />
        <TextField
          label="Prezime"
          fullWidth
          margin="normal"
          value={form.lastName || ""}
          onChange={(e) => updateField("lastName", e.target.value)}
          required={!isEditMode}
        />
      </DialogContent>
      <Divider />
      <DialogActions className={styles["dialog-actions"]}>
        <Button variant="outlined" onClick={handleClose} disabled={loading}>
          Otkaži
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading
            ? isEditMode
              ? "Čuvanje..."
              : "Kreiranje..."
            : isEditMode
            ? "Sačuvaj"
            : "Kreiraj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminFormDialog;
