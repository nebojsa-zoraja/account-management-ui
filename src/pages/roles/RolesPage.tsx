import { useState, useEffect, useCallback } from "react";
import pageStyles from "../../styles/PageStyles.module.scss";
import styles from "./RolesPage.module.scss";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../composites/table/Table";
import useRoleStore from "../../store/roleStore/RoleStore";
import { roleColumns } from "../../models/columnDefinitions/entities/roleColumns";
import ManageDetails from "../../composites/manage/ManageDetails";
import { defaultRoleValues } from "../../models/defaults/defaultRoleValues";
import SearchBar from "../../components/searchBar/SearchBar";
import { accessRoleApi } from "../../api/accessRoleApi";
import { RoleInterface } from "../../models/roles/Role";
import { toast } from "react-toastify";
import RoleDeletionImpactDialog from "../../components/roleDeletionImpactDialog/RoleDeletionImpactDialog";

const RolesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState<RoleInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImpactDialogOpen, setIsImpactDialogOpen] = useState(false);

  const {
    isEdit,
    setIsEdit,
    setSelectedRoleId,
    setSelectedRole,
    selectedRole,
  } = useRoleStore();

  const fetchRoles = useCallback(
    async (search: string, page: number) => {
      setIsLoading(true);
      try {
        const response = await accessRoleApi.getAllRoles({
          searchTerm: search,
          pageNumber: page,
          pageSize: pageSize,
        });
        setRoles(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      } catch (err) {
        toast.error("Greška pri učitavanju uloga");
        console.error("Error fetching roles:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    fetchRoles(searchQuery, currentPage);
  }, [fetchRoles, searchQuery, currentPage]);

  const handleCloseDialog = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedRoleId(null);
    setSelectedRole(defaultRoleValues);
  };

  const handleSaveRole = async () => {
    setIsSaving(true);
    try {
      if (isEdit && selectedRole.id) {
        await accessRoleApi.updateRole(selectedRole.id, selectedRole);
        toast.success("Uloga uspešno ažurirana");
      } else {
        await accessRoleApi.createRole(selectedRole);
        toast.success("Uloga uspešno kreirana");
      }
      await fetchRoles(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error saving role:", err);
      toast.error("Greška pri čuvanju uloge");
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
    fetchRoles(searchQuery, currentPage);
  };

  const handleDeleteClick = () => {
    if (selectedRole.id) {
      setIsImpactDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedRole.id) return;

    setIsDeleting(true);
    try {
      await accessRoleApi.deleteRole(selectedRole.id);
      toast.success("Uloga uspešno obrisana");
      await fetchRoles(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error deleting role:", err);
      toast.error("Greška pri brisanju uloge");
    } finally {
      setIsDeleting(false);
      setIsImpactDialogOpen(false);
    }
  };

  return (
    <div className={pageStyles["wrapper"]}>
      <div className={pageStyles["page-items"]}>
        <PageTitle page="Uloge" setIsOpen={setIsOpen} />
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by role name..."
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
                columnDefinitions={roleColumns(setIsOpen)}
                entityList={roles}
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
            maxWidth="xs"
            content="roles"
            name="Uloge"
            isOpen={isOpen}
            onClose={handleCloseDialog}
            onSave={handleSaveRole}
            onDelete={isEdit ? handleDeleteClick : undefined}
            isSaving={isSaving}
            isDeleting={isDeleting}
          />
        </div>

        <RoleDeletionImpactDialog
          roleId={selectedRole.id || null}
          roleName={selectedRole.name || ""}
          isOpen={isImpactDialogOpen}
          onClose={() => setIsImpactDialogOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
};

export default RolesPage;
