import { ChangeEvent, useEffect } from "react";
import useProjectStore from "../../../store/projectStore/ProjectStore";
import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  TextField,
  FormControlLabel,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { privateLabelingSettingsOptions } from "../../../utils/dropdownOptions/projectDropdownOptions";
import Applications from "../applications/Applications";
import ProjectRoles from "./projectRoles/ProjectRoles";
import { projectApi } from "../../../api/projectApi";
import { toast } from "react-toastify";
import styles from "./ManageProject.module.scss";

const ManageProject = () => {
  const {
    isEdit,
    isDetailsLoading,
    setIsDetailsLoading,
    selectedProject,
    setSelectedProject,
    selectedProjectId,
  } = useProjectStore();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (isEdit && selectedProjectId) {
        setIsDetailsLoading(true);
        try {
          const project = await projectApi.getProjectById(selectedProjectId);
          setSelectedProject(() => ({
            ...project,
          }));
        } catch (error) {
          console.error("Failed to fetch project details:", error);
          toast.error("Greška pri učitavanju detalja projekta");
        } finally {
          setIsDetailsLoading(false);
        }
      }
    };

    fetchProjectDetails();
    // eslint-disable-next-line
  }, [selectedProjectId, isEdit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setSelectedProject((project) => ({
      ...project,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setSelectedProject((project) => ({
      ...project,
      [name]: value,
    }));
  };

  return (
    <Box className={styles["container"]}>
      {isDetailsLoading ? (
        <Box className={styles["loading-state"]}>
          <CircularProgress className={styles["loading-progress"]} />
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            Informacije o projektu
          </Typography>
          <Stack spacing={2.5}>
            <TextField
              name="name"
              label="Naziv projekta"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedProject?.name || ""}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Metod autentifikacije</InputLabel>
              <Select
                value={selectedProject.privateLabelingSetting}
                label="Metod autentifikacije"
                onChange={(e) =>
                  handleSelectChange("privateLabelingSetting", e.target.value)
                }
              >
                {privateLabelingSettingsOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="projectRoleAssertion"
                  checked={selectedProject.projectRoleAssertion}
                  onChange={handleInputChange}
                />
              }
              label="Potvrda uloge prilikom autentifikacije"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="projectRoleCheck"
                  checked={selectedProject.projectRoleCheck}
                  onChange={handleInputChange}
                />
              }
              label="Provera autorizacije na autentifikaciji"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hasProjectCheck"
                  checked={selectedProject.hasProjectCheck}
                  onChange={handleInputChange}
                />
              }
              label="Provera projekta prilikom autentifikacije"
            />
          </Stack>

          {selectedProjectId && (
            <>
              <Divider className={styles["divider"]} />
              <Typography variant="h6" gutterBottom className={styles["section-title"]}>
                Pridružene aplikacije
              </Typography>
              <Box className={styles["section-container"]}>
                <Applications />
              </Box>
              <Divider className={styles["divider"]} />
              <Typography variant="h6" gutterBottom className={styles["section-title"]}>
                Pridružene uloge
              </Typography>
              <Box>
                <ProjectRoles />
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ManageProject;
