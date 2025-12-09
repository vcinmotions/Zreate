"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type RecentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type RecentContact = {
  id: string;
  fullName: string;
  email: string;
  companyName?: string;
  phone?: string;
  serviceRequest?: string;
  message: string;
  createdAt: string;
};

export default function AdminPage() {
  const [userCount, setUserCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCounts = async () => {
    try {
      const res = await axios.get("/api/admin/counts");
      if (res.data.success) {
        setUserCount(res.data.userCount);
        setContactCount(res.data.contactCount);
      }
    } catch (err) {
      console.error("Failed to fetch counts:", err);
    }
  };

  const fetchRecentUsers = async () => {
    try {
      const res = await axios.get<{ success: boolean; data: RecentUser[] }>(
        "/api/admin/recent-users",
      );
      if (res.data.success) setRecentUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch recent users:", err);
    }
  };

  const fetchRecentContacts = async () => {
    try {
      const res = await axios.get<{ success: boolean; data: RecentContact[] }>(
        "/api/admin/recent-contacts",
      );
      if (res.data.success) setRecentContacts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch recent contacts:", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchCounts(),
      fetchRecentUsers(),
      fetchRecentContacts(),
    ]).finally(() => setLoading(false));
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-sky-900 dark:text-sky-100">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage users, requests, and activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Users
          </p>
          <p className="mt-2 text-4xl font-bold text-sky-600 dark:text-sky-400">
            {userCount}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Contacts
          </p>
          <p className="mt-2 text-4xl font-bold text-sky-600 dark:text-sky-400">
            {contactCount}
          </p>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-gray-900">
        <h2 className="mb-5 text-lg font-semibold text-sky-600 dark:text-sky-400">
          Recent User Signups
        </h2>

        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 text-sm dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((u) => (
              <tr
                key={u.id}
                className="border-t transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-3 font-medium dark:text-gray-200">
                  {u.name}
                </td>
                <td className="px-4 py-3 dark:text-gray-400">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      u.role === "Admin"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(u.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Contacts Table */}
      <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-gray-900">
        <h2 className="mb-5 text-lg font-semibold text-sky-600 dark:text-sky-400">
          Recent Contact Requests
        </h2>

        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100 text-sm dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentContacts.map((c) => (
              <tr
                key={c.id}
                className="border-t transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-3 font-medium dark:text-gray-200">
                  {c.fullName}
                </td>
                <td className="px-4 py-3 dark:text-gray-400">{c.email}</td>
                <td className="px-4 py-3 dark:text-gray-400">
                  {c.companyName || "-"}
                </td>
                <td className="px-4 py-3 dark:text-gray-400">
                  {c.phone || "-"}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs dark:bg-blue-900 dark:text-blue-300">
                    {c.serviceRequest || "-"}
                  </span>
                </td>
                <td className="line-clamp-2 max-w-xs px-4 py-3 dark:text-gray-400">
                  {c.message}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(c.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
