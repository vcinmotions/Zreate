import ContactsTable from "@/components/Admin/ContactsTable";

export default function ContactsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold dark:text-white">All Contacts</h1>
      <ContactsTable />
    </div>
  );
}
