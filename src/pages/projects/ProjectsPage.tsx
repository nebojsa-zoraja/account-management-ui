import Table from "../../composites/table/Table";
import { projectColumns } from "../../models/columnDefinitions/entities/projectColumns";
import PageTitle from "../../components/pageTitle/PageTitle";
import pageStyles from "../../styles/PageStyles.module.scss";
import styles from "./ProjectsPage.module.scss";
import useProjectStore from "../../store/projectStore/ProjectStore";
import { useState, useEffect, useCallback } from "react";
import { defaultProjectValues } from "../../models/defaults/defaultProjectValues";
import ManageDetails from "../../composites/manage/ManageDetails";
import SearchBar from "../../components/searchBar/SearchBar";
import { ProjectInterface } from "../../models/projects/Project";
import { projectApi } from "../../api/projectApi";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../components/confirmationDialog/ConfirmationDialog";

const ProjectsPage = () => {
  const {
    isEdit,
    setIsEdit,
    setSelectedProjectId,
    setSelectedProject,
    selectedProject,
  } = useProjectStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmDeactivateOpen, setConfirmDeactivateOpen] = useState(false);
  const [confirmReactivateOpen, setConfirmReactivateOpen] = useState(false);

  const fetchProjects = useCallback(
    async (search: string, page: number) => {
      setIsLoading(true);
      try {
        const response = await projectApi.getAllProjects({
          searchTerm: search,
          pageNumber: page,
          pageSize: pageSize,
        });
        setProjects(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        toast.error("Greška pri učitavanju projekata");
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    fetchProjects(searchQuery, currentPage);
  }, [fetchProjects, searchQuery, currentPage]);

  const handleCloseDialog = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedProjectId(null);
    setSelectedProject(defaultProjectValues);
  };

  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      if (isEdit && selectedProject.id) {
        await projectApi.updateProject(selectedProject.id, selectedProject);
        toast.success("Projekat uspešno ažuriran");
      } else {
        await projectApi.createProject(selectedProject);
        toast.success("Projekat uspešno kreiran");
      }
      await fetchProjects(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error saving project:", err);
      toast.error("Greška pri čuvanju projekta");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRefresh = () => {
    fetchProjects(searchQuery, currentPage);
  };

  const handleDeleteProject = async (id: number) => {
    setIsDeleting(true);
    try {
      await projectApi.deleteProject(id);
      toast.success("Projekat uspešno obrisan");
      await fetchProjects(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Greška pri brisanju projekta");
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteConfirmation = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDeactivateProject = async (id: number) => {
    setIsDeactivating(true);
    try {
      await projectApi.deactivateProject(id);
      toast.success("Projekat uspešno deaktiviran");
      await fetchProjects(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error deactivating project:", err);
      toast.error("Greška pri deaktivaciji projekta");
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleReactivateProject = async (id: number) => {
    setIsDeactivating(true);
    try {
      await projectApi.reactivateProject(id);
      toast.success("Projekat uspešno reaktiviran");
      await fetchProjects(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error reactivating project:", err);
      toast.error("Greška pri reaktivaciji projekta");
    } finally {
      setIsDeactivating(false);
    }
  };

  const openDeactivateConfirmation = () => {
    setConfirmDeactivateOpen(true);
  };

  const openReactivateConfirmation = () => {
    setConfirmReactivateOpen(true);
  };

  return (
    <div className={pageStyles["wrapper"]}>
      <div className={pageStyles["page-items"]}>
        <PageTitle page="Projekti" setIsOpen={setIsOpen} />
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by project name..."
          initialValue={searchQuery}
          onRefresh={handleRefresh}
          isRefreshing={isLoading}
        />
        <div
          className={`${pageStyles["content-wrapper"]} ${
            isEdit ? pageStyles["is-edit"] : ""
          }`}
        >
          <div className={pageStyles["table"]}>
            {isLoading ? (
              <div className={styles["loading-state"]}>
                Loading...
              </div>
            ) : (
              <Table
                columnDefinitions={projectColumns(setIsOpen)}
                entityList={projects}
                itemsPerPage={pageSize}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                onPageChange={handlePageChange}
                serverSidePagination={true}
              />
            )}
          </div>

          <ManageDetails
            maxWidth="sm"
            content="project"
            name="Projekat"
            isOpen={isOpen}
            onClose={handleCloseDialog}
            onSave={handleSaveProject}
            onDelete={isEdit && selectedProject.id ? openDeleteConfirmation : undefined}
            onDeactivate={
              isEdit && selectedProject.id && !selectedProject.isDeleted
                ? openDeactivateConfirmation
                : undefined
            }
            onReactivate={
              isEdit && selectedProject.id && selectedProject.isDeleted
                ? openReactivateConfirmation
                : undefined
            }
            isSaving={isSaving}
            isDeleting={isDeleting}
            isDeactivating={isDeactivating}
          />
          <ConfirmationDialog
            confirmationText="Da li ste sigurni da želite da obrišete ovaj projekat? Sve povezane aplikacije će takođe biti obrisane. Ova akcija je trajna."
            isOpen={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
            action={handleDeleteProject}
            entityId={selectedProject.id}
          />
          <ConfirmationDialog
            confirmationText="Da li ste sigurni da želite da deaktivirate ovaj projekat?"
            isOpen={confirmDeactivateOpen}
            onClose={() => setConfirmDeactivateOpen(false)}
            action={handleDeactivateProject}
            entityId={selectedProject.id}
          />
          <ConfirmationDialog
            confirmationText="Da li ste sigurni da želite da reaktivirate ovaj projekat?"
            isOpen={confirmReactivateOpen}
            onClose={() => setConfirmReactivateOpen(false)}
            action={handleReactivateProject}
            entityId={selectedProject.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
