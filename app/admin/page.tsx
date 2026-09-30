import { isAdmin } from "@/lib/admin-server";
import LoginForm from "@/components/admin/LoginForm";
import Dashboard from "@/components/admin/Dashboard";

export const metadata = {
  title: "Admin — Puerto Plankstek",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const ok = await isAdmin();
  if (!ok) {
    return (
      <div className="bg-brand-sand-light">
        <LoginForm />
      </div>
    );
  }
  return <Dashboard />;
}
