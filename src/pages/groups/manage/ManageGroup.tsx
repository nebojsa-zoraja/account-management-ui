import {
  CircularProgress,
  TextField,
  Box,
  Stack,
  Typography,
  Divider,
  Autocomplete,
} from "@mui/material";
import useGroupStore from "../../../store/groupStore/GroupStore";
import { ChangeEvent, useEffect, useState } from "react";
import GroupUserTable from "./userTable/GroupUserTable";
import { projectApi } from "../../../api/projectApi";
import { toast } from "react-toastify";
import styles from "./ManageGroup.module.scss";

const ManageGroup = () => {
  const {
    isDetailsLoading,
    setSelectedGroup,
    selectedGroup,
    selectedGroupId,
    isEdit,
  } = useGroupStore();
  const [projects, setProjects] = useState<{ label: string; value: number }[]>(
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedGroup((group) => ({
      ...group,
      [name]: value,
    }));
  };

  const handleProjectChange = (name: string, value: string | number | null) => {
    setSelectedGroup((group) => ({
      ...group,
      [name]: value || 0,
    }));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getAllProjects({ pageSize: 1000 });
        const projectList = response.items.map((x) => ({
          label: x.name,
          value: x.id,
        }));
        setProjects(projectList);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast.error("Greška pri učitavanju projekata");
      }
    };

    fetchProjects();
  }, []);

  return (
    <Box className={styles["container"]}>
      {isDetailsLoading ? (
        <Box className={styles["loading-state"]}>
          <CircularProgress className={styles["loading-progress"]} />
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            Informacije o grupi
          </Typography>
          <Stack spacing={2.5}>
            <Autocomplete
              options={projects}
              getOptionLabel={(option: any) => option.label || ""}
              value={
                projects.find(
                  (p: any) => p.value === selectedGroup?.projectId
                ) || null
              }
              onChange={(_, newValue) =>
                handleProjectChange("projectId", newValue?.value || null)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Projekat"
                  size="small"
                  variant="outlined"
                />
              )}
              fullWidth
            />
            <TextField
              name="name"
              label="Naziv grupe"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedGroup?.name || ""}
            />
            <TextField
              name="description"
              label="Opis"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              onChange={handleInputChange}
              value={selectedGroup?.description || ""}
              helperText="Opišite svrhu i odgovornosti ove grupe"
            />
          </Stack>

          <Divider className={styles["divider"]} />

          {isEdit && selectedGroupId && (
            <>
              <Typography variant="h6" gutterBottom className={styles["section-title"]}>
                Korisnici
              </Typography>
              <Box>
                <GroupUserTable groupId={selectedGroupId} />
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ManageGroup;
