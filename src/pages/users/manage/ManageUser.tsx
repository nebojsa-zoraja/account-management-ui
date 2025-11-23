import {
  CircularProgress,
  TextField,
  Box,
  Typography,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import useUserStore from "../../../store/userStore/UserStore";
import { userAccountApi } from "../../../api/userAccountApi";
import { UserGender } from "../../../models/enums/userEnums";
import { toast } from "react-toastify";
import styles from "./ManageUser.module.scss";

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
      userAccountApi
        .getUserById(selectedUserId)
        .then((user) => {
          setSelectedUser(user);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          toast.error("Greška pri učitavanju detalja korisnika.");
        })
        .finally(() => {
          setIsDetailsLoading(false);
        });
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

  const handleSelectChange = (name: string, value: any) => {
    let newValue = name === "isDeleted" ? Boolean(value) : value;
    setSelectedUser((user) => ({
      ...user,
      [name]: newValue,
    }));
  };

  return (
    <Box className={styles["container"]}>
      {isDetailsLoading ? (
        <Box className={styles["loading-container"]}>
          <CircularProgress className={styles["loading-progress"]} />
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            Osnovne informacije
          </Typography>
          <Stack spacing={2.5}>
            <Box className={styles["field-row"]}>
              <TextField
                name="firstName"
                label="Ime"
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleInputChange}
                value={selectedUser?.firstName || ""}
              />
              <TextField
                name="lastName"
                label="Prezime"
                variant="outlined"
                size="small"
                fullWidth
                onChange={handleInputChange}
                value={selectedUser?.lastName || ""}
              />
            </Box>
            <TextField
              name="username"
              label="Korisničko ime"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedUser?.username || ""}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedUser?.email || ""}
            />
            <TextField
              name="phoneNumber"
              label="Broj telefona"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedUser?.phoneNumber || ""}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Pol</InputLabel>
              <Select
                value={selectedUser?.gender ?? UserGender.Unspecified}
                label="Pol"
                onChange={(e) => handleSelectChange("gender", e.target.value)}
              >
                <MenuItem value={UserGender.Male}>Muški</MenuItem>
                <MenuItem value={UserGender.Female}>Ženski</MenuItem>
                <MenuItem value={UserGender.Unspecified}>Neodređen</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Divider className={styles["divider"]} />

          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            Pristupni podaci
          </Typography>
          <Stack spacing={2.5}>
            <TextField
              name="password"
              label="Inicijalna lozinka"
              variant="outlined"
              size="small"
              fullWidth
              type="password"
              onChange={handleInputChange}
              value={selectedUser?.password || ""}
              helperText={
                isEdit
                  ? "Ostavite prazno ako ne želite promeniti lozinku"
                  : "Unesite inicijalnu lozinku za korisnika"
              }
            />
            <TextField
              name="confirmPassword"
              label="Potvrdi lozinku"
              variant="outlined"
              size="small"
              type="password"
              fullWidth
              onChange={handleInputChange}
              value={selectedUser?.confirmPassword || ""}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ManageUser;
