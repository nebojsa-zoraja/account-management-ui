import { Button } from "@mui/material";
import ManageDetails from "../../../composites/manage/ManageDetails";
import { ApplicationInterface } from "../../../models/applications/Application";
import { applicationColumns } from "../../../models/columnDefinitions/entities/applicationColumns";
import {
  defaultApplicationValues,
  defaultApplicationDetailsValues,
} from "../../../models/defaults/defaultApplicationValues";
import useApplicationStore from "../../../store/applicationStore/ApplicationStore";
import styles from "./Applications.module.scss";
import { useCallback, useState } from "react";
import Table from "../../../composites/table/Table";

interface IApplicationPageProps {
  assignedApplications: ApplicationInterface[];
}

const Applications = ({ assignedApplications }: IApplicationPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    isEdit,
    setIsEdit,
    setSelectedApplicationDetails,
    setSelectedApplication,
    setSelectedApplicationId,
  } = useApplicationStore();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedApplicationId(null);
    setSelectedApplication(defaultApplicationValues);
    setSelectedApplicationDetails(defaultApplicationDetailsValues);
    // eslint-disable-next-line
  }, []);

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true);
    // eslint-disable-next-line
  }, []);

  const handleSaveApplication = () => {
    if (isEdit) {
      // Save application logic here
    } else {
      // Create new application logic here
    }
  };

  return (
    <div className={styles["table"]}>
      <div className={styles["content"]}>
        <Table
          columnDefinitions={applicationColumns(setIsOpen)}
          entityList={assignedApplications}
        />
        <Button
          className={styles["add-button"]}
          onClick={handleOpenDialog}
          variant="contained"
        >
          Dodaj aplikaciju
        </Button>
      </div>
      <ManageDetails
        content="application"
        name="Aplikacija"
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveApplication}
      />
    </div>
  );
};

export default Applications;
