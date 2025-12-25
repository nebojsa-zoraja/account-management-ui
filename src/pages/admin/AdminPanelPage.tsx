import React, { useState, useCallback, useMemo } from "react";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { toast } from "react-toastify";
import adminApi, { AdminUser } from "../../api/adminApi";
import PageTitle from "../../components/pageTitle/PageTitle";
import SearchBar from "../../components/searchBar/SearchBar";
import Table from "../../composites/table/Table";
import ConfirmationDialog from "../../components/confirmationDialog/ConfirmationDialog";
import AdminFormDialog from "./components/AdminFormDialog";
import PromoteAdminDialog from "./components/PromoteAdminDialog";
import { useAdminUsers, UserFilter } from "./hooks/useAdminUsers";
import { adminUserColumns } from "../../models/columnDefinitions/entities/adminUserColumns";
import pageStyles from "../../styles/PageStyles.module.scss";
import styles from "./AdminPanelPage.module.scss";

const AdminPanelPage: React.FC = () => {
  const {
    users,
    loading,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    searchTerm,
    userFilter,
    fetchUsers,
    handleSearch,
    handleFilterChange,
    handlePageChange,
  } = useAdminUsers();

  // Dialog States
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [promoteDialogOpen, setPromoteDialogOpen] = useState(false);
  const [promotingUserId, setPromotingUserId] = useState<number | null>(null);
  const [demoteDialogOpen, setDemoteDialogOpen] = useState(false);
  const [demotingUserId, setDemotingUserId] = useState<number | null>(null);

  const handleFilterSelectChange = (event: SelectChangeEvent<UserFilter>) => {
    handleFilterChange(event.target.value as UserFilter);
  };

  // Create/Edit handlers
  const openCreateDialog = () => {
    setEditingUser(null);
    setFormDialogOpen(true);
  };

  const openEditDialog = useCallback(
    (userId: number) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setEditingUser(user);
        setFormDialogOpen(true);
      }
    },
    [users]
  );

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
    setEditingUser(null);
  };

  // Promote handlers
  const openPromoteDialog = useCallback((userId: number) => {
    setPromotingUserId(userId);
    setPromoteDialogOpen(true);
  }, []);

  const handlePromoteDialogClose = () => {
    setPromoteDialogOpen(false);
    setPromotingUserId(null);
  };

  // Demote handlers
  const openDemoteDialog = useCallback((userId: number) => {
    setDemotingUserId(userId);
    setDemoteDialogOpen(true);
  }, []);

  const handleDemoteConfirm = async (userId: number) => {
    try {
      await adminApi.demoteFromAdmin(userId);
      toast.success("Administrator uspešno uklonjen");
      setDemoteDialogOpen(false);
      setDemotingUserId(null);
      fetchUsers();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Greška pri uklanjanju administratora"
      );
    }
  };

  const columnDefinitions = useMemo(
    () => adminUserColumns(openEditDialog, openPromoteDialog, openDemoteDialog),
    [openEditDialog, openPromoteDialog, openDemoteDialog]
  );

  return (
    <div className={pageStyles["wrapper"]}>
      <div className={pageStyles["page-items"]}>
        <PageTitle
          page="Upravljaj administratorima"
          isAddNewAvailable={true}
          setIsOpen={openCreateDialog}
        />

        <SearchBar
          onSearch={handleSearch}
          placeholder="Pretraži po imenu, korisničkom imenu ili email-u..."
          initialValue={searchTerm}
          onRefresh={fetchUsers}
          isRefreshing={loading}
          extraContent={
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="user-filter-label">Tip korisnika</InputLabel>
              <Select
                labelId="user-filter-label"
                value={userFilter}
                label="Tip korisnika"
                onChange={handleFilterSelectChange}
              >
                <MenuItem value="all">Svi korisnici</MenuItem>
                <MenuItem value="admin">Samo administratori</MenuItem>
                <MenuItem value="user">Samo korisnici</MenuItem>
              </Select>
            </FormControl>
          }
        />

        <div className={pageStyles["content-wrapper"]}>
          <div className={pageStyles["table"]}>
            {loading ? (
              <div className={styles["loading-state"]}>
                <CircularProgress size={40} />
              </div>
            ) : (
              <Table
                columnDefinitions={columnDefinitions}
                entityList={users}
                itemsPerPage={pageSize}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                onPageChange={handlePageChange}
                serverSidePagination={true}
              />
            )}
          </div>
        </div>
      </div>

      <AdminFormDialog
        isOpen={formDialogOpen}
        onClose={handleFormDialogClose}
        onSuccess={fetchUsers}
        editingUser={editingUser}
      />

      <PromoteAdminDialog
        isOpen={promoteDialogOpen}
        userId={promotingUserId}
        onClose={handlePromoteDialogClose}
        onSuccess={fetchUsers}
      />

      <ConfirmationDialog
        confirmationText="Da li ste sigurni da želite da uklonite administratorska prava ovom korisniku?"
        isOpen={demoteDialogOpen}
        onClose={() => {
          setDemoteDialogOpen(false);
          setDemotingUserId(null);
        }}
        action={handleDemoteConfirm}
        entityId={demotingUserId!}
      />
    </div>
  );
};

export default AdminPanelPage;
