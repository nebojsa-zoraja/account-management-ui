import { CircularProgress, TextField, Box, Stack } from "@mui/material";
import useRoleStore from "../../../store/roleStore/RoleStore";
import { ChangeEvent, useCallback, useEffect } from "react";
import { defaultRoleValues } from "../../../models/defaults/defaultRoleValues";
import { accessRoleApi } from "../../../api/accessRoleApi";
import { toast } from "react-toastify";
import styles from "./ManageRole.module.scss";

const ManageRole = () => {
  const {
    isDetailsLoading,
    setIsDetailsLoading,
    setSelectedRole,
    selectedRole,
    isEdit,
    selectedRoleId,
  } = useRoleStore();

  useEffect(() => {
    if (isEdit && selectedRoleId) {
      setIsDetailsLoading(true);
      accessRoleApi
        .getRoleById(selectedRoleId)
        .then((role) => {
          setSelectedRole(role);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          toast.error("Greška pri učitavanju detalja uloge.");
          setSelectedRole(defaultRoleValues);
        })
        .finally(() => {
          setIsDetailsLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [selectedRoleId, isEdit]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setSelectedRole((role) => ({
      ...role,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  return (
    <Box className={styles["container"]}>
      {isDetailsLoading ? (
        <Box className={styles["loading-container"]}>
          <CircularProgress className={styles["loading-progress"]} />
        </Box>
      ) : (
        <Stack spacing={2.5}>
          <TextField
            name="name"
            label="Naziv uloge"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={selectedRole?.name || ""}
          />
          <TextField
            name="description"
            label="Opis uloge"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={4}
            onChange={handleInputChange}
            value={selectedRole?.description || ""}
            helperText="Opišite svrhu i odgovornosti ove uloge"
          />
        </Stack>
      )}
    </Box>
  );
};

export default ManageRole;
