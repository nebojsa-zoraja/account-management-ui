import { CircularProgress, SelectChangeEvent } from "@mui/material";
import styles from "./ManageProjectRole.module.scss";
import { useEffect, useState } from "react";
import SelectDropdown from "../../../../../components/select/SelectDropdown";
import useProjectStore from "../../../../../store/projectStore/ProjectStore";
import { projectRoles } from "../../../../../mock/ProjectMockData";
import { roles } from "../../../../../mock/RoleMockData";

const ManageProjectRole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(0);
  const [roleOptions, setRoleOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const { selectedProjectId } = useProjectStore();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let projectRoleIds = projectRoles
        .filter((x) => x.projectId !== selectedProjectId)
        .map((x) => x.roleId);
      let roleOptions = roles
        .filter((x) => projectRoleIds.some((y) => y === x.id))
        .map((x) => ({ label: x.name, value: x.id }));
      setRoleOptions(roleOptions);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedProjectId]);

  const handleDropdownChange = (e: SelectChangeEvent<string | number>) => {
    setSelectedRoleId(e.target.value as number);
  };

  return (
    <div className={styles["card-content"]}>
      {isLoading ? (
        <div className={styles["loading-container"]}>
          <CircularProgress sx={{ color: "#951414" }} />
        </div>
      ) : (
        <div className={styles["content-wrapper"]}>
          <div className={styles["content-item"]}>
            <div className={styles["label"]}>Uloga:</div>
            <SelectDropdown
              className={styles["input-field"]}
              onChange={handleDropdownChange}
              options={roleOptions}
              value={selectedRoleId}
              name="authMethodType"
              size="small"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjectRole;
