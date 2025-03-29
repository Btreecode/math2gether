import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div>
      <nav className="p-4 flex gap-2 bg-gray-200">
        <Link href="/admin/students">Roster Management</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
