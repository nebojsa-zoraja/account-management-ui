import React, { useState, useEffect, useCallback } from "react";
import styles from "./GroupsPage.module.scss";
import PageTitle from "../../components/pageTitle/PageTitle";
import ManageDetails from "../../composites/manage/ManageDetails";
import GroupCard from "../../components/groupCard/GroupCard";
import { groupDialogContentDefault, GroupsDialogContent } from "./utils";
import useGroupStore from "../../store/groupStore/GroupStore";
import SearchBar from "../../components/searchBar/SearchBar";
import { groupApi, GroupWithProjectName } from "../../api/groupApi";
import { toast } from "react-toastify";
import CardPagination from "../../components/cardPagination/CardPagination";
import { CircularProgress } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ConfirmationDialog from "../../components/confirmationDialog/ConfirmationDialog";

const GroupsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<GroupsDialogContent>(
    groupDialogContentDefault
  );
  const [groups, setGroups] = useState<GroupWithProjectName[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<GroupWithProjectName | null>(null);
  const { isEdit, setIsEdit, setSelectedGroupId, setSelectedGroup, selectedGroup, setIsDetailsLoading } = useGroupStore();

  const fetchGroups = useCallback(
    async (search: string, page: number) => {
      setIsLoading(true);
      try {
        const response = await groupApi.getAllGroups({
          searchTerm: search,
          pageNumber: page,
          pageSize: pageSize,
        });
        setGroups(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        toast.error("Greška pri učitavanju grupa");
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    fetchGroups(searchQuery, currentPage);
  }, [fetchGroups, searchQuery, currentPage, pageSize]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    fetchGroups(searchQuery, currentPage);
  };

  const handleOpenAddDialog = () => {
    setIsEdit(false);
    setSelectedGroupId(null);
    setSelectedGroup({
      id: 0,
      name: "",
      description: "",
      projectId: 0,
      isDeleted: false,
      userIds: [],
    });
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedGroupId(null);
  };

  const handleClosePermissions = () => {
    setIsPermissionsOpen(false);
    setSelectedGroupId(null);
  };

  const handleSaveGroup = async () => {
    setIsSaving(true);
    try {
      if (isEdit && selectedGroup.id) {
        await groupApi.updateGroup(selectedGroup);
        toast.success("Grupa uspešno ažurirana");
      } else {
        await groupApi.createGroup(selectedGroup);
        toast.success("Grupa uspešno kreirana");
      }
      await fetchGroups(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error saving group:", err);
      toast.error("Greška pri čuvanju grupe");
    } finally {
      setIsSaving(false);
    }
  };

  const handleViewDetails = async (group: GroupWithProjectName) => {
    setSelectedGroupId(group.id);
    setIsEdit(true);
    setIsOpen(true);
    setIsDetailsLoading(true);
    try {
      const groupDetails = await groupApi.getGroupById(group.id);
      setSelectedGroup(groupDetails);
    } catch (err) {
      console.error("Error loading group details:", err);
      toast.error("Greška pri učitavanju detalja grupe");
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleManagePermissions = (group: GroupWithProjectName) => {
    setSelectedGroupId(group.id);
    setSelectedGroup({
      id: group.id,
      name: group.name,
      description: group.description,
      projectId: group.projectId,
      isDeleted: false,
      userIds: [],
    });
    setIsPermissionsOpen(true);
  };

  const handleDeleteClick = (group: GroupWithProjectName) => {
    setGroupToDelete(group);
    setIsDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setGroupToDelete(null);
  };

  const handleConfirmDelete = async (groupId: number) => {
    setIsDeleting(true);
    try {
      await groupApi.deleteGroup(groupId);
      toast.success("Grupa uspešno obrisana");
      await fetchGroups(searchQuery, currentPage);
    } catch (err) {
      console.error("Error deleting group:", err);
      toast.error("Greška pri brisanju grupe");
    } finally {
      setIsDeleting(false);
      handleCloseDeleteConfirm();
    }
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <div className={styles["page-items"]}>
          <PageTitle page="Grupe" setIsOpen={handleOpenAddDialog} />
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by group name or project..."
            initialValue={searchQuery}
            onRefresh={handleRefresh}
            isRefreshing={isLoading}
          />
          <div className={styles["content"]}>
            {isLoading ? (
              <div className={styles["loading"]}>
                <CircularProgress size={40} />
                Učitavanje grupa...
              </div>
            ) : groups.length === 0 ? (
              <div className={styles["no-results"]}>
                <SearchOffIcon />
                {searchQuery ? (
                  <>
                    <span>Nema rezultata za pretragu "{searchQuery}"</span>
                    <span className={styles["no-results-secondary"]}>
                      Pokušajte sa drugim pojmom za pretragu
                    </span>
                  </>
                ) : (
                  <>
                    <span>Nema pronađenih grupa</span>
                    <span className={styles["no-results-secondary"]}>
                      Kliknite na "+" dugme da dodate novu grupu
                    </span>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className={styles["content-items"]}>
                  {groups.map((x) => (
                    <GroupCard
                      key={x.id}
                      group={x}
                      onViewDetails={handleViewDetails}
                      onManagePermissions={handleManagePermissions}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
                {totalCount > 0 && (
                  <CardPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    itemsPerPage={pageSize}
                    totalItems={totalCount}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ManageDetails
        maxWidth="md"
        content={dialogContent.content}
        name={dialogContent.name}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveGroup}
        isSaving={isSaving}
      />
      <ManageDetails
        maxWidth="md"
        content="group-permissions"
        name="Upravljaj ovlašćenjima"
        isOpen={isPermissionsOpen}
        onClose={handleClosePermissions}
        onSave={handleClosePermissions}
      />
      <ConfirmationDialog
        confirmationText={`Da li ste sigurni da želite da obrišete grupu "${groupToDelete?.name || ""}"?`}
        isOpen={isDeleteConfirmOpen}
        onClose={handleCloseDeleteConfirm}
        action={handleConfirmDelete}
        entityId={groupToDelete?.id || 0}
      />
    </>
  );
};

export default GroupsPage;
