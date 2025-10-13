import { CircularProgress, TextField } from "@mui/material";
import styles from "./ManageGroup.module.scss";
import useGroupStore from "../../../store/groupStore/GroupStore";
import { ChangeEvent, useEffect, useState } from "react";
import SearchSelect from "../../../components/select/searchSelect/SearchSelect";
import { projects as mockProjects } from "../../../mock/ProjectMockData";

const ManageGroup = () => {
  const { isDetailsLoading, setSelectedGroup, selectedGroup } = useGroupStore();
  const [projects, setProjects] = useState<any>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedGroup((group) => ({
      ...group,
      [name]: value,
    }));
  };

  useEffect(() => {
    const projectList = mockProjects.map((x) => ({
      label: x.name,
      value: x.id,
    }));

    setProjects(projectList);
  }, []);

  return (
    <div className={styles["card-content"]}>
      {isDetailsLoading ? (
        <div className={styles["loading-container"]}>
          <CircularProgress sx={{ color: "#951414" }} />
        </div>
      ) : (
        <>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Projekat:</span>
            <SearchSelect
              className={styles["input-field"]}
              onChange={() => {}}
              options={projects}
              value={selectedGroup?.projectId}
              name="projectId"
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Naziv Grupe:</span>
            <TextField
              name="name"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedGroup?.name || ""}
            />
          </div>
          <div className={styles["content-item"]}>
            <span className={styles["label"]}>Opis:</span>
            <TextField
              name="description"
              className={styles["input-field"]}
              id="outlined-basic"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              onChange={handleInputChange}
              value={selectedGroup?.description || ""}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ManageGroup;
