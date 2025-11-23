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
import { useCallback, useState, useEffect } from "react";
import Table from "../../../composites/table/Table";
import useProjectStore from "../../../store/projectStore/ProjectStore";
import { applicationApi } from "../../../api/applicationApi";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/confirmationDialog/ConfirmationDialog";

const Applications = () => {
  const { selectedProjectId } = useProjectStore();
  const [applications, setApplications] = useState<ApplicationInterface[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isEdit,
    setIsEdit,
    setSelectedApplicationDetails,
    setSelectedApplication,
    setSelectedApplicationId,
    selectedApplicationId,
    setIsDetailsLoading,
    selectedApplicationDetails,
  } = useApplicationStore();

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  // Confirmation dialog state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogText, setConfirmDialogText] = useState("");
  const [confirmDialogAction, setConfirmDialogAction] = useState<
    (id: number) => void
  >(() => () => {});
  const [confirmDialogEntityId, setConfirmDialogEntityId] = useState(0);

  // Track selected application's deleted status
  const selectedApplication = applications.find(
    (app) => app.id === selectedApplicationId
  );

  useEffect(() => {
    const fetchApplications = async () => {
      if (selectedProjectId) {
        setIsLoading(true);
        try {
          const apps = await applicationApi.getApplicationsByProjectId(
            selectedProjectId
          );
          setApplications(apps);
        } catch (error) {
          console.error("Failed to fetch applications:", error);
          toast.error("Greška pri učitavanju aplikacija");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchApplications();
  }, [selectedProjectId]);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (isEdit && selectedApplicationId) {
        setIsDetailsLoading(true);
        try {
          const { application, details } =
            await applicationApi.getApplicationById(selectedApplicationId);
          setSelectedApplication(application);
          setSelectedApplicationDetails(details);
        } catch (error) {
          console.error("Failed to fetch application details:", error);
          toast.error("Greška pri učitavanju detalja aplikacije");
        } finally {
          setIsDetailsLoading(false);
        }
      }
    };

    fetchApplicationDetails();
    // eslint-disable-next-line
  }, [selectedApplicationId, isEdit]);

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

  const handleSaveApplication = async () => {
    if (!selectedProjectId) return;

    setIsSaving(true);
    try {
      if (isEdit && selectedApplicationId) {
        const applicationToUpdate = {
          ...selectedApplicationDetails,
          applicationProjectId: selectedProjectId,
        };
        const updatedApplication = await applicationApi.updateApplication(
          selectedApplicationId,
          applicationToUpdate
        );
        setApplications((prev) =>
          prev.map((app) =>
            app.id === selectedApplicationId ? updatedApplication : app
          )
        );
        toast.success("Aplikacija uspešno ažurirana");
      } else {
        const applicationToCreate = {
          ...selectedApplicationDetails,
          applicationProjectId: selectedProjectId,
        };
        const createdApplication =
          await applicationApi.createApplication(applicationToCreate);
        setApplications((prev) => [...prev, createdApplication]);
        toast.success("Aplikacija uspešno kreirana");
      }
      handleCloseDialog();
    } catch (error: any) {
      console.error("Failed to save application:", error);

      // Extract error message from the response
      let errorMessage = isEdit
        ? "Greška pri ažuriranju aplikacije"
        : "Greška pri kreiranju aplikacije";

      if (error?.response?.data?.detail) {
        // ASP.NET Core validation error format
        errorMessage = error.response.data.detail;
      } else if (error?.response?.data?.message) {
        // Custom error format
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        // Generic error message
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        autoClose: 8000, // Show for 8 seconds since validation messages can be long
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteApplication = async (id: number) => {
    setIsDeleting(true);
    try {
      await applicationApi.deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
      toast.success("Aplikacija uspešno obrisana");
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to delete application:", error);
      toast.error("Greška pri brisanju aplikacije");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeactivateApplication = async (id: number) => {
    setIsDeactivating(true);
    try {
      await applicationApi.deactivateApplication(id);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, isDeleted: true } : app))
      );
      toast.success("Aplikacija uspešno deaktivirana");
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to deactivate application:", error);
      toast.error("Greška pri deaktivaciji aplikacije");
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleReactivateApplication = async (id: number) => {
    setIsDeactivating(true);
    try {
      await applicationApi.reactivateApplication(id);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, isDeleted: false } : app))
      );
      toast.success("Aplikacija uspešno reaktivirana");
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to reactivate application:", error);
      toast.error("Greška pri reaktivaciji aplikacije");
    } finally {
      setIsDeactivating(false);
    }
  };

  const openDeleteConfirmation = (id: number) => {
    setConfirmDialogText("Da li ste sigurni da želite da obrišete ovu aplikaciju? Ova akcija je trajna.");
    setConfirmDialogAction(() => handleDeleteApplication);
    setConfirmDialogEntityId(id);
    setConfirmDialogOpen(true);
  };

  const openDeactivateConfirmation = (id: number) => {
    setConfirmDialogText("Da li ste sigurni da želite da deaktivirate ovu aplikaciju?");
    setConfirmDialogAction(() => handleDeactivateApplication);
    setConfirmDialogEntityId(id);
    setConfirmDialogOpen(true);
  };

  const openReactivateConfirmation = (id: number) => {
    setConfirmDialogText("Da li ste sigurni da želite da reaktivirate ovu aplikaciju?");
    setConfirmDialogAction(() => handleReactivateApplication);
    setConfirmDialogEntityId(id);
    setConfirmDialogOpen(true);
  };

  return (
    <div className={styles["table"]}>
      <div className={styles["content"]}>
        {isLoading ? (
          <div className={styles["loading-state"]}>
            Loading...
          </div>
        ) : (
          <Table
            columnDefinitions={applicationColumns(setIsOpen)}
            entityList={applications}
          />
        )}
        <Button
          className={styles["add-button"]}
          onClick={handleOpenDialog}
          variant="contained"
        >
          Dodaj aplikaciju
        </Button>
      </div>
      <ManageDetails
        maxWidth="sm"
        content="application"
        name="Aplikacija"
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveApplication}
        onDelete={
          isEdit && selectedApplicationId
            ? () => openDeleteConfirmation(selectedApplicationId)
            : undefined
        }
        onDeactivate={
          isEdit && selectedApplicationId && !selectedApplication?.isDeleted
            ? () => openDeactivateConfirmation(selectedApplicationId)
            : undefined
        }
        onReactivate={
          isEdit && selectedApplicationId && selectedApplication?.isDeleted
            ? () => openReactivateConfirmation(selectedApplicationId)
            : undefined
        }
        isSaving={isSaving}
        isDeleting={isDeleting}
        isDeactivating={isDeactivating}
      />
      <ConfirmationDialog
        confirmationText={confirmDialogText}
        isOpen={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        action={confirmDialogAction}
        entityId={confirmDialogEntityId}
      />
    </div>
  );
};

export default Applications;
