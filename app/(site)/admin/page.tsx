"use client";
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

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [userCount, setUserCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);

  const [loading, setLoading] = useState(false);

  // Fetch Counts
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

  // Fetch Recent Users
  const fetchRecentUsers = async () => {
    try {
      const res = await axios.get("/api/admin/recent-users");
      if (res.data.success) setRecentUsers(res.data.data);
    } catch (error) {
      console.error("Failed to fetch recent users:", error);
    }
  };

  // Fetch Recent Contacts
  const fetchRecentContacts = async () => {
    try {
      const res = await axios.get("/api/admin/recent-contacts");
      if (res.data.success) setRecentContacts(res.data.data);
    } catch (error) {
      console.error("Failed to fetch recent contacts:", error);
    }
  };

  // Load All Data on Page Load
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetchCounts(),
      fetchRecentUsers(),
      fetchRecentContacts(),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in space-y-10">
      {/* header */}
      <div className="flex flex-col gap-2">
        <h1 className="animate-fade-in-down text-3xl font-bold text-sky-900 dark:text-sky-100">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Manage users, requests and activity
        </p>
      </div>

      {/* stats card */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="stats-card rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="mt-2 text-4xl font-bold text-sky-600">{userCount}</p>
        </div>

        <div className="stats-card rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Contacts</p>
          <p className="mt-2 text-4xl font-bold text-sky-600">{contactCount}</p>
        </div>
      </div>

      {/* tables */}
      <div className="mt-10 space-y-10">
        {/* Recent Users */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-sky-600">
            Recent User Signups
          </h2>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-sm">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>

            <tbody>
              {recentUsers.map((u, i) => (
                <tr key={u.id} className="border-b text-sm">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-sky-600">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(u.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Contacts */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-sky-600">
            Recent Contact Requests
          </h2>

          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-sm">
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
              {recentContacts.map((c, i) => (
                <tr key={c.id} className="border-b text-sm">
                  <td className="px-4 py-3 font-medium">{c.fullName}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.companyName || "-"}</td>
                  <td className="px-4 py-3">{c.phone || "-"}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs">
                      {c.serviceRequest}
                    </span>
                  </td>
                  <td className="line-clamp-2 max-w-xs px-4 py-3">
                    {c.message}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
