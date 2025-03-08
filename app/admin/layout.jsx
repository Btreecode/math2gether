import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div>
      <nav>
        <Link href="/admin/students">Roster Management</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
