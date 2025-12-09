import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const userCount = await prisma.user.count();
  const contactCount = await prisma.contact.count();

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentContacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

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
        <div className="stats-card rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-transparent">
          <p className="text-white-500 text-sm">Total Users</p>
          <p className="mt-2 text-4xl font-bold text-sky-600 dark:text-sky-500">
            {userCount}
          </p>
        </div>

        <div className="stats-card rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-transparent">
          <p className="text-white-500 text-sm">Total Contacts</p>
          <p className="mt-2 text-4xl font-bold text-sky-600 dark:text-sky-500">
            {contactCount}
          </p>
        </div>
      </div>

      {/* tables */}
      <div className="mt-10 space-y-10">
        <div className="animate-fade-in-up w-auto max-w-full overflow-auto rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-transparent">
          <h2 className="mb-5 text-lg font-semibold text-sky-600 dark:text-white">
            Recent User Signups
          </h2>

          <table className="w-auto min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-sm dark:border-zinc-800 dark:bg-gray-800">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>

            <tbody>
              {recentUsers.map((user, i) => (
                <tr
                  key={user.id}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  className="table-row-animation border-b text-sm transition hover:bg-blue-50/40 dark:border-neutral-800 dark:hover:bg-blue-500/10"
                >
                  <td className="px-4 py-3 font-medium text-sky-500">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-white">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-sky-600 dark:bg-blue-500/10 dark:text-sky-400">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-white">
                    {new Date(user.createdAt).toLocaleString("en-IN", {
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

        <div className="animate-fade-in-up w-auto max-w-full overflow-auto rounded-xl border bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-transparent">
          <h2 className="mb-5 text-lg font-semibold text-sky-600 dark:text-white">
            Recent Contact Requests
          </h2>

          <table className="w-auto min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-sm dark:border-zinc-800 dark:bg-gray-800">
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
              {recentContacts.map((contact, i) => (
                <tr
                  key={contact.id}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  className="table-row-animation border-b text-sm transition hover:bg-blue-50/40 dark:border-zinc-800 dark:hover:bg-blue-500/10"
                >
                  <td className="px-4 py-3 font-medium dark:text-sky-500">
                    {contact.fullName}
                  </td>

                  <td className="px-4 py-3 text-gray-600 dark:text-white">
                    {contact.email}
                  </td>

                  <td className="px-4 py-3 text-gray-500 dark:text-sky-400">
                    {contact.companyName || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-500 dark:text-white">
                    {contact.phone || "-"}
                  </td>

                  {/* SERVICE REQUEST top 5 */}
                  <td className="px-4 py-3">
                    {contact.serviceRequest ? (
                      <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold text-sky-600 dark:bg-blue-500/10 dark:text-sky-400">
                        {contact.serviceRequest}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="line-clamp-2 max-w-xs px-4 py-3 text-gray-600 dark:text-gray-400">
                    {contact.message}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-white">
                    {new Date(contact.createdAt).toLocaleString("en-IN", {
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
