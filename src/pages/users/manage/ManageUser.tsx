import { CircularProgress, SelectChangeEvent, TextField } from "@mui/material";
import styles from "./ManageUser.module.scss";
import SelectDropdown from "../../../components/select/SelectDropdown";
import { ChangeEvent, useEffect } from "react";
import useUserStore from "../../../store/userStore/UserStore";
import { users } from "../../../mock/UserMockData";

const ManageUser = () => {
  const {
    selectedUserId,
    isEdit,
    isDetailsLoading,
    setIsDetailsLoading,
    selectedUser,
    setSelectedUser,
  } = useUserStore();

  useEffect(() => {
    if (isEdit && selectedUserId) {
      setIsDetailsLoading(true);
      const timer = setTimeout(() => {
        const user = users.find((u) => u.id === selectedUserId);
        setSelectedUser(user!);
        setIsDetailsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [selectedUserId, isEdit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setSelectedUser((user) => ({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDropdownChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;
    setSelectedUser((user) => ({
      ...user,
      [name]: Boolean(value),
    }));
  };

  useEffect(() => {
    console.log(selectedUser);
  }, [selectedUser]);

  return (
    <div className={styles["card-content"]}>
      {isDetailsLoading ? (
        <div className={styles["loading-container"]}>
          <CircularProgress sx={{ color: "#951414" }} />
        </div>
      ) : (
        <>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Ime:</span>
            <TextField
              name="firstName"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedUser?.firstName || ""}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Prezime:</span>
            <TextField
              name="lastName"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedUser?.lastName || ""}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Korisničko ime:</span>
            <TextField
              name="username"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedUser?.username || ""}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Email:</span>
            <TextField
              name="email"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedUser?.email || ""}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Aktivacioni status:</span>
            <SelectDropdown
              className={styles["input-field"]}
              onChange={handleDropdownChange}
              options={[
                { value: 0, label: "Aktivan" },
                { value: 1, label: "Neaktivan" },
              ]}
              value={selectedUser?.isDeleted ? 1 : 0}
              name="isDeleted"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUser;
