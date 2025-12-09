"use client";

import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type PaginationData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(""); // For debounce search
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page: number, searchTerm: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const res = await axios.get(`/api/admin/users?${params}`);

      if (res.data.success) {
        setUsers(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when page or search changes
  useEffect(() => {
    fetchUsers(currentPage, search);
  }, [currentPage, search]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        setSearch(searchInput);
        setCurrentPage(1); // Reset to first page on new search
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [searchInput, search]);

  const goToPage = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    setCurrentPage(page);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Generate page numbers with ...
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const { totalPages } = pagination;
    const current = currentPage;

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-lg dark:bg-black">
      <h1 className="mb-5 text-2xl font-bold dark:text-white">All Users</h1>

      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 rounded-lg border px-3 md:w-1/3">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search name, email or role"
            className="w-full bg-transparent py-2 outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {users.length} of {pagination.total} users
        </div>
      </div>

      {/* table structure defines here */}
      <div className="overflow-x-auto">
        <table className="w-full rounded border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading && users.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-5 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              <>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <td className="p-3">{u.name}</td>
                    <td className="p-3 dark:text-gray-400">{u.email}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          u.role === "Admin"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">{formatDate(u.createdAt)}</td>
                  </tr>
                ))}
                {users.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="p-5 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination code starts from here */}
      {pagination.totalPages > 1 && (
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page {pagination.page} of {pagination.totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="rounded border p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              title="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {generatePageNumbers().map((page, idx) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    className={`min-w-[36px] rounded border px-3 py-1 transition-colors ${
                      currentPage === page
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => goToPage(page as number)}
                    disabled={loading}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            <button
              className="rounded border p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pagination.totalPages || loading}
              title="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Quick jump */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Go to:</span>
            <input
              type="number"
              min={1}
              max={pagination.totalPages}
              className="w-16 rounded border px-2 py-1 text-center dark:bg-gray-800"
              placeholder={currentPage.toString()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = parseInt((e.target as HTMLInputElement).value);
                  if (value >= 1 && value <= pagination.totalPages) {
                    goToPage(value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
