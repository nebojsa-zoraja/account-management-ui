import { useEffect, useState, useRef } from "react";
import useProjectStore from "../../../../store/projectStore/ProjectStore";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import Table from "../../../../composites/table/Table";
import styles from "./ProjectRoles.module.scss";
import { projectRoleColumns } from "../../../../models/columnDefinitions/entities/roleColumns";
import { RoleInterface } from "../../../../models/roles/Role";
import ConfirmationDialog from "../../../../components/confirmationDialog/ConfirmationDialog";
import useRoleStore from "../../../../store/roleStore/RoleStore";
import { projectApi } from "../../../../api/projectApi";
import { accessRoleApi } from "../../../../api/accessRoleApi";
import { toast } from "react-toastify";

const ProjectRoles = () => {
  const { selectedProjectId } = useProjectStore();
  const { setSelectedRoleId, selectedRoleId } = useRoleStore();
  const [projectRoles, setProjectRoles] = useState<RoleInterface[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [searchOptions, setSearchOptions] = useState<RoleInterface[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isRemovingRole, setIsRemovingRole] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const roleOptions = searchOptions
    .filter((role) => !projectRoles.some((pr) => pr.id === role.id))
    .map((role) => ({
      label: role.name,
      value: role.id,
    }));

  useEffect(() => {
    const fetchProjectRoles = async () => {
      if (selectedProjectId) {
        setIsLoading(true);
        try {
          const roles = await projectApi.getProjectRoles(selectedProjectId);
          setProjectRoles(roles);
        } catch (error) {
          console.error("Failed to fetch project roles:", error);
          toast.error("Greška pri učitavanju uloga projekta");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProjectRoles();
  }, [selectedProjectId]);

  const handleSearchRoles = (searchTerm: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const roles = await accessRoleApi.searchRolesUnpaginated(searchTerm);
        setSearchOptions(roles);
      } catch (error) {
        console.error("Failed to search roles:", error);
      } finally {
        setIsSearching(false);
      }
    }, 1000);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setSelectedRoleId(null);
  };

  const handleRemoveRole = async (id: number) => {
    if (!selectedProjectId) return;

    setIsRemovingRole(true);
    try {
      await projectApi.removeRoleFromProject(selectedProjectId, id);
      setProjectRoles((prev) => prev.filter((x) => x.id !== id));
      toast.success("Uloga uspešno uklonjena iz projekta");
    } catch (error) {
      console.error("Failed to remove role from project:", error);
      toast.error("Greška pri uklanjanju uloge");
    } finally {
      setIsRemovingRole(false);
      handleCloseConfirm();
    }
  };

  const handleAddRole = async () => {
    if (!selectedRole || !selectedProjectId) return;

    setIsAddingRole(true);
    try {
      await projectApi.addRolesToProject(selectedProjectId, [selectedRole]);
      const roleToAdd = searchOptions.find((r) => r.id === selectedRole);
      if (roleToAdd) {
        setProjectRoles((prev) => [...prev, roleToAdd]);
      }
      setSelectedRole(null);
      setInputValue("");
      toast.success("Uloga uspešno dodata projektu");
    } catch (error) {
      console.error("Failed to add role to project:", error);
      toast.error("Greška pri dodavanju uloge");
    } finally {
      setIsAddingRole(false);
    }
  };

  return (
    <div className={styles["table"]}>
      <div className={styles["content"]}>
        <div className={styles["add-role-section"]}>
          <Autocomplete
            options={roleOptions}
            getOptionLabel={(option) => option.label}
            value={
              roleOptions.find((opt) => opt.value === selectedRole) || null
            }
            onChange={(_, newValue) => setSelectedRole(newValue?.value || null)}
            onInputChange={(_, value) => {
              setInputValue(value);
              handleSearchRoles(value);
            }}
            inputValue={inputValue}
            loading={isSearching}
            className={styles["role-select"]}
            size="small"
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Izaberite ulogu"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isSearching ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <button
            className={styles["add-role-button"]}
            onClick={handleAddRole}
            disabled={!selectedRole || isAddingRole}
          >
            {isAddingRole ? "Dodavanje..." : "Dodaj"}
          </button>
        </div>
        {isLoading ? (
          <div className={styles["loading-state"]}>
            Loading...
          </div>
        ) : (
          <Table
            columnDefinitions={projectRoleColumns(setIsConfirmOpen)}
            entityList={projectRoles}
          />
        )}
      </div>
      <ConfirmationDialog
        confirmationText="Da li ste sigurni da želite da uklonite ovu ulogu?"
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        action={handleRemoveRole}
        entityId={selectedRoleId!}
      />
    </div>
  );
};

export default ProjectRoles;
