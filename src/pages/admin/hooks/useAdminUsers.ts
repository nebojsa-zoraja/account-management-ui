import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import adminApi, { AdminUser } from "../../../api/adminApi";

type UserFilter = "all" | "admin" | "user";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState<UserFilter>("admin");
  const pageSize = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const isAdminFilter =
        userFilter === "all" ? undefined : userFilter === "admin";
      const response = await adminApi.getAllUsers({
        searchTerm,
        pageNumber: currentPage,
        pageSize,
        isAdmin: isAdminFilter,
      });
      setUsers(response.items);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
    } catch {
      toast.error("Greška pri učitavanju korisnika");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, userFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((filter: UserFilter) => {
    setUserFilter(filter);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
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
  };
};

export type { UserFilter };
