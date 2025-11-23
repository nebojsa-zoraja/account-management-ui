import Table from "../../composites/table/Table";
import PageTitle from "../../components/pageTitle/PageTitle";
import pageStyles from "../../styles/PageStyles.module.scss";
import styles from "./UserPage.module.scss";
import useUserStore from "../../store/userStore/UserStore";
import ManageDetails from "../../composites/manage/ManageDetails";
import { useState, useEffect, useCallback, useRef } from "react";
import { defaultUserValues } from "../../models/defaults/defaultUserValues";
import { userColumns } from "../../models/columnDefinitions/entities/userColumns";
import SearchBar from "../../components/searchBar/SearchBar";
import { userAccountApi } from "../../api/userAccountApi";
import { UserInterface } from "../../models/users/User";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const UserPage = () => {
  const {
    isEdit,
    setIsEdit,
    setSelectedUserId,
    setSelectedUser,
    selectedUser,
  } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchUsers = useCallback(
    async (search: string, page: number) => {
      setIsLoading(true);
      try {
        const response = await userAccountApi.getAllUsers({
          searchTerm: search,
          pageNumber: page,
          pageSize: pageSize,
        });
        setUsers(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      } catch (err) {
        toast.error("Greška pri učitavanju korisnika");
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [pageSize]
  );

  useEffect(() => {
    fetchUsers(searchQuery, currentPage);
  }, [fetchUsers, searchQuery, currentPage]);

  const handleCloseDialog = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedUserId(null);
    setSelectedUser(defaultUserValues);
  };

  const handleSaveUser = async () => {
    setIsSaving(true);
    try {
      if (isEdit && selectedUser.id) {
        await userAccountApi.updateUser(selectedUser.id, selectedUser);
        toast.success("Korisnik uspešno ažuriran");
      } else {
        await userAccountApi.createUser(selectedUser);
        toast.success("Korisnik uspešno kreiran");
      }
      await fetchUsers(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error saving user:", err);
      toast.error("Greška pri čuvanju korisnika");
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
    fetchUsers(searchQuery, currentPage);
  };

  const handleDeactivateUser = async () => {
    if (!selectedUser.id) return;

    setIsDeactivating(true);
    try {
      await userAccountApi.deactivateUser(selectedUser.id);
      toast.success("Korisnik uspešno deaktiviran");
      await fetchUsers(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error deactivating user:", err);
      toast.error("Greška pri deaktiviranju korisnika");
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleReactivateUser = async () => {
    if (!selectedUser.id) return;

    setIsDeactivating(true);
    try {
      await userAccountApi.reactivateUser(selectedUser.id);
      toast.success("Korisnik uspešno reaktiviran");
      await fetchUsers(searchQuery, currentPage);
      handleCloseDialog();
    } catch (err) {
      console.error("Error reactivating user:", err);
      toast.error("Greška pri reaktiviranju korisnika");
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".csv")) {
      toast.error("Molimo izaberite CSV fajl");
      return;
    }

    setSelectedFile(file);
    setShowConfirmDialog(true);
  };

  const handleConfirmImport = async () => {
    if (!selectedFile) return;

    setShowConfirmDialog(false);
    setIsImporting(true);
    try {
      const result = await userAccountApi.importUsersFromCsv(selectedFile);

      if (result.failureCount === 0) {
        toast.success(`Uspešno uvezeno ${result.successCount} korisnika`);
      } else {
        toast.warning(
          `Uvezeno ${result.successCount} korisnika. ${result.failureCount} neuspešno. Proverite konzolu za detalje.`
        );
        console.log("Import results:", result.results);
      }

      await fetchUsers(searchQuery, currentPage);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Greška pri uvozu korisnika";
      toast.error(errorMessage);
      console.error("Import error:", err);
    } finally {
      setIsImporting(false);
      setSelectedFile(null);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCancelImport = () => {
    setShowConfirmDialog(false);
    setSelectedFile(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={pageStyles["wrapper"]}>
      <div className={pageStyles["page-items"]}>
        <PageTitle
          page="Korisnici"
          isAddNewAvailable={true}
          setIsOpen={setIsOpen}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className={styles["hidden-file-input"]}
          onChange={handleFileChange}
        />
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by name, username, or email..."
          initialValue={searchQuery}
          onRefresh={handleRefresh}
          isRefreshing={isLoading}
          onImport={handleImportClick}
          isImporting={isImporting}
          showImportButton={true}
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
                columnDefinitions={userColumns(setIsOpen)}
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
          <ManageDetails
            maxWidth="xs"
            content="user"
            name="Korisnik"
            isOpen={isOpen}
            onClose={handleCloseDialog}
            onSave={handleSaveUser}
            onDeactivate={
              isEdit && !selectedUser.isDeleted
                ? handleDeactivateUser
                : undefined
            }
            onReactivate={
              isEdit && selectedUser.isDeleted
                ? handleReactivateUser
                : undefined
            }
            isSaving={isSaving}
            isDeactivating={isDeactivating}
          />
        </div>
      </div>

      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelImport}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: styles["dialog-paper"],
        }}
      >
        <DialogTitle className={styles["dialog-title"]}>
          <div className={styles["dialog-header"]}>
            <div className={styles["dialog-icon-badge"]}>
              <FileUploadIcon />
            </div>
            <h6 className={styles["dialog-title-text"]}>
              Potvrda uvoza korisnika
            </h6>
          </div>
        </DialogTitle>
        <DialogContent className={styles["dialog-content"]}>
          <div className={styles["dialog-content-inner"]}>
            <div className={styles["dialog-info-section"]}>
              <InfoOutlinedIcon />
              <p className={styles["dialog-info-text"]}>
                Da li ste sigurni da želite da uvezete korisnike iz izabranog
                CSV fajla?
              </p>
            </div>
            <div className={styles["dialog-file-display"]}>
              <FileUploadIcon />
              <div className={styles["dialog-file-info"]}>
                <span className={styles["dialog-file-label"]}>Fajl:</span>
                <p className={styles["dialog-file-name"]}>
                  {selectedFile?.name}
                </p>
              </div>
              <span className={styles["dialog-csv-chip"]}>CSV</span>
            </div>
          </div>
        </DialogContent>
        <DialogActions className={styles["dialog-actions"]}>
          <Button
            onClick={handleCancelImport}
            disabled={isImporting}
            variant="outlined"
            className={styles["dialog-cancel-button"]}
          >
            Otkaži
          </Button>
          <Button
            onClick={handleConfirmImport}
            variant="contained"
            disabled={isImporting}
            startIcon={isImporting ? null : <FileUploadIcon />}
            className={styles["dialog-confirm-button"]}
          >
            {isImporting ? "Uvoz u toku..." : "Potvrdi uvoz"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserPage;
