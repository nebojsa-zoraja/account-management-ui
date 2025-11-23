import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import styles from "./GroupRoleTable.module.scss";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import Table from "../../../../../composites/table/Table";
import { groupRoleColumns } from "../../../../../models/columnDefinitions/entities/groupRoleColumns";
import { projectApi } from "../../../../../api/projectApi";
import { groupApi } from "../../../../../api/groupApi";
import { RoleInterface } from "../../../../../models/roles/Role";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../../components/confirmationDialog/ConfirmationDialog";
import useGroupStore from "../../../../../store/groupStore/GroupStore";

const GroupRoleTable: React.FC = () => {
  const { selectedGroupId, selectedGroup } = useGroupStore();
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [searchOptions, setSearchOptions] = useState<RoleInterface[]>([]);
  const [groupRoles, setGroupRoles] = useState<RoleInterface[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [roleToRemove, setRoleToRemove] = useState<number | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const projectId = selectedGroup?.projectId || 0;
  const groupId = selectedGroupId || 0;

  // Load group roles on mount
  useEffect(() => {
    const fetchGroupRoles = async () => {
      if (!groupId) return;

      setIsLoading(true);
      try {
        const roles = await groupApi.getRolesInGroup(groupId);
        const rolesData: RoleInterface[] = roles.map((r) => ({
          id: r.accessRoleId,
          name: r.accessRoleName,
          description: "",
          isDeleted: false,
        }));
        setGroupRoles(rolesData);
      } catch (error) {
        console.error("Failed to fetch group roles:", error);
        toast.error("Greška pri učitavanju uloga grupe");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupRoles();
  }, [groupId]);

  // Filter out roles that are already in the group
  const roleOptions = searchOptions
    .filter((role) => !groupRoles.some((gr) => gr.id === role.id))
    .map((role) => ({
      label: role.name,
      value: role.id,
    }));

  const handleSearchRoles = (searchTerm: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      if (!searchTerm.trim() || !projectId) {
        setSearchOptions([]);
        return;
      }

      setIsSearching(true);
      try {
        const roles = await projectApi.searchProjectRoles(projectId, searchTerm);
        setSearchOptions(roles);
      } catch (error) {
        console.error("Failed to search roles:", error);
      } finally {
        setIsSearching(false);
      }
    }, 1000);
  };

  const handleAddRole = async () => {
    if (!selectedRole || groupRoles.some((r) => r.id === selectedRole) || !groupId) return;

    setIsAddingRole(true);
    try {
      await groupApi.addRolesToGroup(groupId, [selectedRole]);
      const roleToAdd = searchOptions.find((r) => r.id === selectedRole);
      if (roleToAdd) {
        setGroupRoles((prev) => [...prev, roleToAdd]);
      }
      setSelectedRole(null);
      setInputValue("");
      setSearchOptions([]);
      toast.success("Uloga uspešno dodata u grupu");
    } catch (error) {
      console.error("Failed to add role to group:", error);
      toast.error("Greška pri dodavanju uloge");
    } finally {
      setIsAddingRole(false);
    }
  };

  const openRemoveConfirmation = useCallback((roleId: number) => {
    setRoleToRemove(roleId);
    setIsConfirmOpen(true);
  }, []);

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setRoleToRemove(null);
  };

  const handleRemoveRole = async (roleId: number) => {
    if (!groupId) return;

    try {
      await groupApi.removeRolesFromGroup(groupId, [roleId]);
      setGroupRoles((prev) => prev.filter((r) => r.id !== roleId));
      toast.success("Uloga uspešno uklonjena iz grupe");
    } catch (error) {
      console.error("Failed to remove role from group:", error);
      toast.error("Greška pri uklanjanju uloge");
    } finally {
      handleCloseConfirm();
    }
  };

  const columnDefinitions = useMemo(
    () => groupRoleColumns(openRemoveConfirmation),
    [openRemoveConfirmation]
  );

  if (isLoading) {
    return (
      <div className={styles["loading-state"]}>
        <CircularProgress size={30} className={styles["circular-progress"]} />
      </div>
    );
  }

  return (
    <div className={styles["role-table-container"]}>
      <div className={styles["add-role-section"]}>
        <Autocomplete
          options={roleOptions}
          getOptionLabel={(option) => option.label}
          value={roleOptions.find((opt) => opt.value === selectedRole) || null}
          onChange={(_, newValue) => setSelectedRole(newValue?.value || null)}
          onInputChange={(_, value, reason) => {
            setInputValue(value);
            if (reason === "input") {
              handleSearchRoles(value);
            }
          }}
          inputValue={inputValue}
          loading={isSearching}
          className={styles["role-select"]}
          size="small"
          fullWidth
          noOptionsText={
            inputValue ? "Nema rezultata" : "Unesite naziv uloge za pretragu"
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Pretražite ulogu po nazivu"
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
          className={styles["add-button"]}
          onClick={handleAddRole}
          disabled={!selectedRole || isAddingRole}
        >
          {isAddingRole ? "Dodavanje..." : "Dodaj"}
        </button>
      </div>

      {groupRoles.length > 0 && (
        <Table
          columnDefinitions={columnDefinitions}
          entityList={groupRoles}
          itemsPerPage={5}
          showPagination={groupRoles.length > 5}
        />
      )}

      <ConfirmationDialog
        confirmationText="Da li ste sigurni da želite da uklonite ovu ulogu iz grupe?"
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        action={handleRemoveRole}
        entityId={roleToRemove!}
      />
    </div>
  );
};

export default GroupRoleTable;
