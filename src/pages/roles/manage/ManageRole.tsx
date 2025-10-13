import { CircularProgress, TextField } from "@mui/material";
import useRoleStore from "../../../store/roleStore/RoleStore";
import styles from "./ManageRole.module.scss";
import { ChangeEvent, useCallback, useEffect } from "react";
import { roles } from "../../../mock/RoleMockData";
import { defaultRoleValues } from "../../../models/defaults/defaultRoleValues";

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
      const timer = setTimeout(() => {
        const role = roles.find((p) => p.id === selectedRoleId);
        setSelectedRole(role || defaultRoleValues);
        setIsDetailsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
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
    <div className={styles["card-content"]}>
      {isDetailsLoading ? (
        <div className={styles["loading-container"]}>
          <CircularProgress sx={{ color: "#951414" }} />
        </div>
      ) : (
        <div className={styles["content-wrapper"]}>
          <div className={styles["content-item"]}>
            <div className={styles["label"]}>Naziv Uloge:</div>
            <TextField
              name="name"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedRole?.name || ""}
            />
          </div>
          <div className={styles["content-item"]}>
            <div className={styles["label"]}>Opis Uloge:</div>
            <TextField
              name="name"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              onChange={handleInputChange}
              value={selectedRole?.description || ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRole;
