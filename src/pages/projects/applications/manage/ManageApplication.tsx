import {
  SelectChangeEvent,
  CircularProgress,
  TextField,
  Divider,
  Checkbox,
} from "@mui/material";
import { useState, useCallback, useEffect, ChangeEvent } from "react";
import ChipInput from "../../../../components/chipInput/ChipInput";
import MultipleSelect from "../../../../components/multipleSelect/MultipleSelect";
import SelectDropdown from "../../../../components/select/SelectDropdown";
import { applications } from "../../../../mock/ApplicationMockData";
import { projects } from "../../../../mock/ProjectMockData";
import { defaultApplicationValues } from "../../../../models/defaults/defaultApplicationValues";
import {
  ApplicationGrantType,
  ApplicationResponseType,
} from "../../../../models/enums/applicationEnums";
import useApplicationStore from "../../../../store/applicationStore/ApplicationStore";
import useProjectStore from "../../../../store/projectStore/ProjectStore";
import applicationAccessTokenTypeOptions, {
  applicationTypeOptions,
  applicationClientAuthMethodOptions,
  applicationGrantTypeOptions,
  applicationResponseTypeOptions,
} from "../../../../utils/dropdownOptions/applicationDropdownOptions";
import styles from "./ManageApplication.module.scss";

const ManageApplication = () => {
  const {
    isEdit,
    isDetailsLoading,
    setIsDetailsLoading,
    selectedApplicationDetails,
    setSelectedApplicationDetails,
    selectedApplicationId,
    setSelectedApplication,
  } = useApplicationStore();

  const { selectedProjectId } = useProjectStore();

  const [projectName, setProjectName] = useState("");
  const [isProjectLoading, setIsProjectLoading] = useState(false);

  const fetchProject = useCallback(async (id: number | null) => {
    // Simulate fetching project data
    return new Promise((resolve) => {
      const project = projects.find((p) => p.id === id);
      setProjectName(project ? project.name : "");
      resolve(project ? project.name : "");
    });
  }, []);

  useEffect(() => {
    if (isEdit && selectedApplicationId) {
      setIsDetailsLoading(true);
      const timer = setTimeout(() => {
        const app = applications.find((a) => a.id === selectedApplicationId);
        setSelectedApplication(app ?? defaultApplicationValues);
        setSelectedApplicationDetails((prev) => ({
          ...prev,
          name: app?.name || "",
          applicationProjectId: app?.projectId || 0,
        }));
        setIsDetailsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [selectedApplicationId, isEdit]);

  useEffect(() => {
    if (selectedProjectId) {
      setSelectedApplicationDetails((prev) => ({
        ...prev,
        applicationProjectId: selectedProjectId,
      }));
      setIsProjectLoading(true);
      const timer = setTimeout(() => {
        fetchProject(selectedProjectId);
        setIsProjectLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [selectedProjectId, fetchProject]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSelectedApplicationDetails((app) => ({
      ...app,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDropdownChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;
    setSelectedApplicationDetails((app) => ({
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
            <div className={styles["label"]}>Naziv aplikacije:</div>
            <TextField
              name="name"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedApplicationDetails?.name || ""}
            />
          </div>
          <Divider />
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Projekat:</span>
            {isProjectLoading ? (
              <div className={styles["loading-field"]}>
                <CircularProgress sx={{ color: "#951414" }} size={20} />
              </div>
            ) : (
              <TextField
                className={styles["input-field"]}
                id="outlined-basic"
                variant="outlined"
                size="small"
                fullWidth
                disabled
                value={projectName}
              />
            )}
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>
              Dodavanje Uloga u Token za Pristup:
            </span>
            <Checkbox
              disableRipple
              className={styles["input-field"]}
              size="medium"
              onChange={handleInputChange}
              name="accessTokenRoleAssertion"
              checked={selectedApplicationDetails.accessTokenRoleAssertion}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Tip Tokena za Pristup:</span>
            <SelectDropdown
              className={styles["input-field"]}
              onChange={handleDropdownChange}
              options={applicationAccessTokenTypeOptions}
              value={selectedApplicationDetails.accessTokenType}
              name="accessTokenType"
              size="small"
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Tip Aplikacije:</span>
            <SelectDropdown
              className={styles["input-field"]}
              onChange={handleDropdownChange}
              options={applicationTypeOptions}
              value={selectedApplicationDetails.appType}
              name="appType"
              size="small"
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Metod Autentifikacije:</span>
            <SelectDropdown
              className={styles["input-field"]}
              onChange={handleDropdownChange}
              options={applicationClientAuthMethodOptions}
              value={selectedApplicationDetails.authMethodType}
              name="authMethodType"
              size="small"
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>
              Vremensko Odstupanje (sekundi):
            </span>
            <TextField
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedApplicationDetails.clockSkew}
              name="clockSkew"
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Razvojni Režim:</span>
            <Checkbox
              className={styles["input-field"]}
              size="medium"
              onChange={handleInputChange}
              name="devMode"
              checked={selectedApplicationDetails.devMode}
              disableRipple
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Tipovi Odobrenja:</span>
            <MultipleSelect<ApplicationGrantType>
              styles={styles}
              setFunction={setSelectedApplicationDetails}
              objectState={selectedApplicationDetails}
              options={applicationGrantTypeOptions}
              name="grantTypes"
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Dodavanje Uloga u ID Token:</span>
            <Checkbox
              className={styles["input-field"]}
              size="medium"
              onChange={handleInputChange}
              name="idTokenRoleAssertion"
              checked={selectedApplicationDetails.idTokenRoleAssertion}
              disableRipple
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>
              Dodavanje Korisničkih Informacija u ID Token:
            </span>
            <Checkbox
              className={styles["input-field"]}
              size="medium"
              onChange={handleInputChange}
              name="idTokenUserinfoAssertion"
              checked={selectedApplicationDetails.idTokenUserinfoAssertion}
              disableRipple
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Response Tipovi:</span>
            <MultipleSelect<ApplicationResponseType>
              styles={styles}
              setFunction={setSelectedApplicationDetails}
              objectState={selectedApplicationDetails}
              options={applicationResponseTypeOptions}
              name="responseTypes"
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>
              Preskoči Stranicu Uspešne Prijave:
            </span>
            <Checkbox
              className={styles["input-field"]}
              size="medium"
              onChange={handleInputChange}
              name="skipNativeAppSuccessPage"
              checked={selectedApplicationDetails.skipNativeAppSuccessPage}
              disableRipple
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>URI-jevi za Preusmeravanje:</span>
            <ChipInput
              styles={styles}
              onItemsChange={(newItems: string[]) =>
                setSelectedApplicationDetails((prev) => ({
                  ...prev,
                  redirectUris: newItems,
                }))
              }
              selectedItems={selectedApplicationDetails.redirectUris}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>URI-jevi nakon Odjave:</span>
            <ChipInput
              styles={styles}
              onItemsChange={(newItems: string[]) =>
                setSelectedApplicationDetails((prev) => ({
                  ...prev,
                  postLogoutRedirectUris: newItems,
                }))
              }
              selectedItems={selectedApplicationDetails.postLogoutRedirectUris}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Dodatni Izvori:</span>
            <ChipInput
              styles={styles}
              onItemsChange={(newItems: string[]) =>
                setSelectedApplicationDetails((prev) => ({
                  ...prev,
                  additionalOrigins: newItems,
                }))
              }
              selectedItems={selectedApplicationDetails.additionalOrigins}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplication;
