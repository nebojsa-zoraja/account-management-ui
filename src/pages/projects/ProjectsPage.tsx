import { projects } from "../../mock/ProjectMockData";
import Table from "../../composites/table/Table";
import { projectColumns } from "../../models/columnDefinitions/entities/projectColumns";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "../../styles/PageStyles.module.scss";
import useProjectStore from "../../store/projectStore/ProjectStore";
import { useState } from "react";
import { defaultProjectValues } from "../../models/defaults/defaultProjectValues";
import ManageDetails from "../../composites/manage/ManageDetails";

const ProjectsPage = () => {
  const { isEdit, setIsEdit, setSelectedProjectId, setSelectedProject } =
    useProjectStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedProjectId(null);
    setSelectedProject(defaultProjectValues);
  };

  const handleSaveProject = () => {
    if (isEdit) {
      // Save project logic here
    } else {
      // Create new project logic here
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["page-items"]}>
        <PageTitle page="Projekti" setIsOpen={setIsOpen} />
        <div
          className={`${styles["content-wrapper"]} ${
            isEdit ? styles["is-edit"] : ""
          }`}
        >
          <div className={styles["table"]}>
            <Table
              columnDefinitions={projectColumns(setIsOpen)}
              entityList={projects}
            />
          </div>

          <ManageDetails
            content="project"
            name="Projekat"
            isOpen={isOpen}
            onClose={handleCloseDialog}
            onSave={handleSaveProject}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
