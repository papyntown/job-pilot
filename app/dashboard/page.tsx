import { AuthGuard } from "@/components/auth/AuthGuard";
import { SignedInPanel } from "@/components/auth/SignedInPanel";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <main className="flex min-h-full flex-1 items-center justify-center bg-background px-4 py-12">
        <SignedInPanel />
      </main>
    </AuthGuard>
  );
}
