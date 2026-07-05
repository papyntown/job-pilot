"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { insforge } from "@/lib/insforge-client";
import { posthog } from "@/lib/posthog-client";

type Props = {
  children: React.ReactNode;
};

type Status = "loading" | "authed";

export function AuthGuard({ children }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let active = true;

    insforge.auth
      .getCurrentUser()
      .then(({ data }) => {
        if (!active) return;
        if (data?.user) {
          posthog.identify(data.user.id, { email: data.user.email });
          setStatus("authed");
        } else {
          router.replace("/login");
        }
      })
      .catch(() => {
        if (active) router.replace("/login");
      });

    return () => {
      active = false;
    };
  }, [router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-background">
        <div
          className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent"
          aria-label="Loading"
        />
      </div>
    );
  }

  return <>{children}</>;
}
