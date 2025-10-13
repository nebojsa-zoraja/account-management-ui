import { ChangeEvent, useEffect } from "react";
import styles from "./ManageProject.module.scss";
import useProjectStore from "../../../store/projectStore/ProjectStore";
import { projects } from "../../../mock/ProjectMockData";
import {
  Checkbox,
  CircularProgress,
  Divider,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { applications } from "../../../mock/ApplicationMockData";
import SelectDropdown from "../../../components/select/SelectDropdown";
import { privateLabelingSettingsOptions } from "../../../utils/dropdownOptions/projectDropdownOptions";
import Applications from "../applications/Applications";
import ProjectRoles from "./projectRoles/ProjectRoles";

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
    if (isEdit && selectedProjectId) {
      setIsDetailsLoading(true);
      const timer = setTimeout(() => {
        const project = projects.find((p) => p.id === selectedProjectId);
        const apps = applications.filter(
          (app) => app.projectId === selectedProjectId
        );
        setSelectedProject(() => ({ ...project!, assignedApplications: apps }));
        setIsDetailsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [selectedProjectId, isEdit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setSelectedProject((project) => ({
      ...project,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDropdownChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;
    setSelectedProject((app) => ({
      ...app,
      [name]: value,
    }));
  };

  return (
    <div className={styles["card-content"]}>
      {isDetailsLoading ? (
        <div className={styles["loading-container"]}>
          <CircularProgress sx={{ color: "#951414" }} />
        </div>
      ) : (
        <div className={styles["content-wrapper"]}>
          <div className={styles["content-item"]}>
            <div className={styles["label"]}>Naziv projekata:</div>
            <TextField
              name="name"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedProject?.name || ""}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Metod Autentifikacije:</span>
            <SelectDropdown
              className={styles["input-field"]}
              onChange={handleDropdownChange}
              options={privateLabelingSettingsOptions}
              value={selectedProject.privateLabelingSetting}
              name="authMethodType"
              size="small"
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>
              Potvrda uloge prilikom autentifikacije:
            </span>
            <Checkbox
              className={styles["input-field"]}
              size="medium"
              onChange={handleInputChange}
              name="projectRoleAssertion"
              checked={selectedProject.projectRoleAssertion}
              disableRipple
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>
              Provera autorizacije na autentifikaciji:
            </span>
            <Checkbox
              className={styles["input-field"]}
              size="medium"
              onChange={handleInputChange}
              name="projectRoleCheck"
              checked={selectedProject.projectRoleCheck}
              disableRipple
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>
              Provera projekta prilikom autentifikacije:
            </span>
            <Checkbox
              className={styles["input-field"]}
              size="medium"
              onChange={handleInputChange}
              name="hasProjectCheck"
              checked={selectedProject.hasProjectCheck}
              disableRipple
            />
          </div>
          {selectedProjectId && (
            <>
              <Divider />
              <div className={styles["table-section"]}>
                <span className={styles["section-title"]}>
                  Pridružene aplikacije:
                </span>
                <div className={styles["content-table"]}>
                  <Applications
                    assignedApplications={
                      selectedProject?.assignedApplications ?? []
                    }
                  />
                </div>
              </div>
              <Divider />
              <div className={styles["table-section"]}>
                <span className={styles["section-title"]}>
                  Pridružene uloge:
                </span>
                <div className={styles["content-table"]}>
                  <ProjectRoles />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageProject;
