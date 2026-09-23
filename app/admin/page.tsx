import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Container } from "@/components/Container";

export default async function AdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  return (
    <div className="py-12">
      <Container className="max-w-4xl">
        <h1 className="text-xl font-semibold">Submissions</h1>
        <div className="mt-8">
          <AdminDashboard />
        </div>
      </Container>
    </div>
  );
}
