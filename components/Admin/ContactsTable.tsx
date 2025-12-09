"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  Download,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { exportToExcel } from "@/utils/exportToExcel";
import axios from "axios";
import toast from "react-hot-toast";

type Contact = {
  id: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone?: string;
  serviceRequest: string;
  subject: string;
  message: string;
  createdAt: string;
};

type PaginationData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
};

export default function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  // for fetching teh contact data to show in the All contact table
  const fetchContacts = async (page: number, searchTerm: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const res = await axios.get(`/api/admin/contacts?${params}`);

      if (res.data.success) {
        setContacts(res.data.data);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };
  // for export of teh contact detials to the excel format
  const fetchAllContacts = async () => {
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "10000",
        ...(search && { search }),
      });

      const res = await axios.get(`/api/admin/contacts?${params}`);

      if (res.data.success) {
        setAllContacts(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch all contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts(currentPage, search);
  }, [currentPage, search]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        setSearch(searchInput);
        setCurrentPage(1);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [searchInput, search]);

  const deleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact request?"))
      return;

    setDeleting(id);
    const originalContacts = [...contacts];

    setContacts((prev) => prev.filter((c) => c.id !== id));

    try {
      const res = await axios.delete(`/api/admin/contacts/${id}`);

      if (res.data.success) {
        toast.success("Contact deleted successfully");
        fetchContacts(currentPage, search);
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Failed to delete contact:", error);
      toast.error("Failed to delete contact");
      setContacts(originalContacts);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    setCurrentPage(page);
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const { totalPages } = pagination;
    const current = currentPage;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current > 3) {
        pages.push("...");
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handleExport = async () => {
    toast.loading("Preparing export...");
    await fetchAllContacts();

    setTimeout(() => {
      toast.dismiss();
      exportToExcel(allContacts);
      toast.success("Exported successfully!");
    }, 500);
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-lg dark:border dark:border-neutral-800 dark:bg-black">
      {/* <h1 className="mb-5 text-2xl font-bold dark:text-white">
        Contact Submissions
      </h1> */}

      {/* header */}
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 rounded-lg border px-3 md:w-1/3">
          <Search size={18} className="dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search name or email"
            className="w-full bg-transparent py-2 placeholder-gray-400 outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {pagination.total} total contacts
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 dark:bg-green-700 dark:hover:bg-gray-900"
          >
            <Download size={18} />
            Export to Excel
          </button>
        </div>
      </div>

      {/* table structure */}
      <div className="overflow-x-auto">
        <table className="w-full rounded border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && contacts.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-5 text-center text-gray-500 dark:text-gray-400"
                >
                  Loading contacts...
                </td>
              </tr>
            ) : (
              <>
                {contacts.map((c) => (
                  <tr
                    key={c.id}
                    className={`border-t transition-colors hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-gray-900 ${
                      deleting === c.id ? "opacity-50" : ""
                    }`}
                  >
                    <td className="p-3 dark:text-gray-200">
                      <div>
                        <div className="font-medium dark:text-gray-100">
                          {c.fullName}
                        </div>
                        {c.companyName && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {c.companyName}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3 dark:text-gray-400">{c.email}</td>
                    <td className="p-3 dark:text-gray-300">{c.phone || "-"}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        {c.serviceRequest}
                      </span>
                    </td>
                    <td className="max-w-[300px] truncate p-3 dark:text-gray-400">
                      {c.message}
                    </td>
                    <td className="p-3 text-xs dark:text-white">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          className="text-blue-600 transition hover:scale-110 dark:text-blue-400"
                          onClick={() => setSelectedContact(c)}
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        {/* <button
                          className="text-red-600 transition hover:scale-110 disabled:opacity-50 dark:text-red-500"
                          onClick={() => deleteContact(c.id)}
                          disabled={deleting === c.id}
                          title="Delete contact"
                        >
                          <Trash2 size={18} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}

                {contacts.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-5 text-center text-gray-500 dark:text-gray-400"
                    >
                      {search
                        ? "No contacts found matching your search"
                        : "No contact submissions yet"}
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
              className="rounded border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              title="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1">
              {generatePageNumbers().map((page, idx) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="px-2 text-gray-500 dark:text-gray-400"
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
                        ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-600"
                        : "border-gray-300 hover:bg-gray-100 dark:border-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-800"
                    } `}
                    onClick={() => goToPage(page as number)}
                    disabled={loading}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              className="rounded border border-gray-300 p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === pagination.totalPages || loading}
              title="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Go to:</span>
            <input
              type="number"
              min={1}
              max={pagination.totalPages}
              className="w-16 rounded border border-gray-300 px-2 py-1 text-center dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200"
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

      {/* modal opens on clicking the eye icon */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl dark:border dark:border-neutral-800 dark:bg-black">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-2xl font-bold dark:text-white">
                Contact Details
              </h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                <X size={24} className="dark:text-gray-300" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Full Name
                  </p>
                  <p className="font-medium dark:text-gray-200">
                    {selectedContact.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Company
                  </p>
                  <p className="font-medium dark:text-gray-200">
                    {selectedContact.companyName || "-"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="font-medium dark:text-gray-200">
                    {selectedContact.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-medium dark:text-gray-200">
                    {selectedContact.phone || "-"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Service Requested
                </p>
                <p className="font-medium dark:text-gray-200">
                  {selectedContact.serviceRequest}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Subject
                </p>
                <p className="font-medium dark:text-gray-200">
                  {selectedContact.subject}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Message
                </p>
                <p className="mt-1 rounded-lg bg-gray-50 p-3 whitespace-pre-wrap dark:bg-black dark:text-gray-200">
                  {selectedContact.message}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Submitted On
                </p>
                <p className="font-medium dark:text-gray-200">
                  {formatDate(selectedContact.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              {/* <button
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                onClick={() => {
                  deleteContact(selectedContact.id);
                  setSelectedContact(null);
                }}
              >
                Delete
              </button> */}
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                onClick={() => setSelectedContact(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
