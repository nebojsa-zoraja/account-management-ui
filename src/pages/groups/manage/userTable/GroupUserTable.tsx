import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styles from "./GroupUserTable.module.scss";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import Table from "../../../../composites/table/Table";
import { groupUserColumns } from "../../../../models/columnDefinitions/entities/groupUserColumns";
import { groupApi } from "../../../../api/groupApi";
import { userAccountApi } from "../../../../api/userAccountApi";
import { UserInterface } from "../../../../models/users/User";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../components/confirmationDialog/ConfirmationDialog";

interface GroupUserTableProps {
  groupId: number;
}

const GroupUserTable: React.FC<GroupUserTableProps> = ({ groupId }) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [groupUsers, setGroupUsers] = useState<UserInterface[]>([]);
  const [searchOptions, setSearchOptions] = useState<UserInterface[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isRemovingUser, setIsRemovingUser] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<number | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Filter out users that are already in the group
  const userOptions = searchOptions
    .filter((user) => !groupUsers.some((gu) => gu.id === user.id))
    .map((user) => ({
      label: `${user.firstName} ${user.lastName} - ${user.email}`,
      value: user.id,
    }));

  // Load group users on mount
  useEffect(() => {
    const fetchGroupUsers = async () => {
      setIsLoading(true);
      try {
        const userIds = await groupApi.getUsersInGroup(groupId);
        if (userIds.length > 0) {
          // Fetch user details for each user ID
          const users = await Promise.all(
            userIds.map((id) => userAccountApi.getUserById(id))
          );
          setGroupUsers(users);
        } else {
          setGroupUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch group users:", error);
        toast.error("Greška pri učitavanju korisnika grupe");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupUsers();
  }, [groupId]);

  const handleSearchUsers = (searchTerm: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setSearchOptions([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await userAccountApi.getAllUsers({
          searchTerm,
          pageSize: 20,
        });
        setSearchOptions(response.items);
      } catch (error) {
        console.error("Failed to search users:", error);
      } finally {
        setIsSearching(false);
      }
    }, 1000);
  };

  const handleAddUser = async () => {
    if (!selectedUser) return;

    setIsAddingUser(true);
    try {
      await groupApi.addUsersToGroup(groupId, [selectedUser]);
      const userToAdd = searchOptions.find((u) => u.id === selectedUser);
      if (userToAdd) {
        setGroupUsers((prev) => [...prev, userToAdd]);
      }
      setSelectedUser(null);
      setInputValue("");
      toast.success("Korisnik uspešno dodat u grupu");
    } catch (error) {
      console.error("Failed to add user to group:", error);
      toast.error("Greška pri dodavanju korisnika");
    } finally {
      setIsAddingUser(false);
    }
  };

  const openRemoveConfirmation = useCallback((userId: number) => {
    setUserToRemove(userId);
    setIsConfirmOpen(true);
  }, []);

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
    setUserToRemove(null);
  };

  const handleRemoveUser = async (userId: number) => {
    setIsRemovingUser(true);
    try {
      await groupApi.removeUsersFromGroup(groupId, [userId]);
      setGroupUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success("Korisnik uspešno uklonjen iz grupe");
    } catch (error) {
      console.error("Failed to remove user from group:", error);
      toast.error("Greška pri uklanjanju korisnika");
    } finally {
      setIsRemovingUser(false);
      handleCloseConfirm();
    }
  };

  const columnDefinitions = useMemo(
    () => groupUserColumns(openRemoveConfirmation),
    [openRemoveConfirmation]
  );

  return (
    <div className={styles["user-table-container"]}>
      <div className={styles["add-user-section"]}>
        <Autocomplete
          options={userOptions}
          getOptionLabel={(option) => option.label}
          value={userOptions.find((opt) => opt.value === selectedUser) || null}
          onChange={(_, newValue) => setSelectedUser(newValue?.value || null)}
          onInputChange={(_, value, reason) => {
            setInputValue(value);
            // Only search when user is typing, not when selecting or clearing
            if (reason === "input") {
              handleSearchUsers(value);
            }
          }}
          inputValue={inputValue}
          loading={isSearching}
          className={styles["user-select"]}
          size="small"
          fullWidth
          noOptionsText={
            inputValue
              ? "Nema rezultata"
              : "Unesite ime ili prezime za pretragu"
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Pretražite korisnika po imenu ili prezimenu"
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
          onClick={handleAddUser}
          disabled={!selectedUser || isAddingUser}
        >
          {isAddingUser ? "Dodavanje..." : "Dodaj"}
        </button>
      </div>

      {isLoading ? (
        <div className={styles["loading-state"]}>
          <CircularProgress size={30} className={styles["circular-progress"]} />
        </div>
      ) : groupUsers.length > 0 ? (
        <Table
          columnDefinitions={columnDefinitions}
          entityList={groupUsers}
          itemsPerPage={5}
          showPagination={groupUsers.length > 5}
        />
      ) : (
        <div className={styles["no-results"]}>
          Nema korisnika u grupi
        </div>
      )}

      <ConfirmationDialog
        confirmationText="Da li ste sigurni da želite da uklonite ovog korisnika iz grupe?"
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        action={handleRemoveUser}
        entityId={userToRemove!}
      />
    </div>
  );
};

export default GroupUserTable;
