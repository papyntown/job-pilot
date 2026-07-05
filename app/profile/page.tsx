import { AuthGuard } from "@/components/auth/AuthGuard";
import { Navbar } from "@/components/layout/Navbar";
import { ProfilePageClient } from "@/components/profile/ProfilePageClient";

export default function ProfilePage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <Navbar />
      <AuthGuard>
        <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-8 py-8">
          <ProfilePageClient />
        </main>
      </AuthGuard>
    </div>
  );
}
