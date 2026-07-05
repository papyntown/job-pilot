"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserSchema } from "@insforge/sdk";

import { insforge } from "@/lib/insforge-client";
import { posthog } from "@/lib/posthog-client";

type Props = {
  children: React.ReactNode;
};

type Status = "loading" | "authed";

const AuthUserContext = createContext<UserSchema | null>(null);

export function useAuthUser(): UserSchema {
  const user = useContext(AuthUserContext);
  if (!user) {
    throw new Error("useAuthUser must be used within AuthGuard");
  }
  return user;
}

export function AuthGuard({ children }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<UserSchema | null>(null);

  useEffect(() => {
    let active = true;

    insforge.auth
      .getCurrentUser()
      .then(({ data }) => {
        if (!active) return;
        if (data?.user) {
          posthog.identify(data.user.id, { email: data.user.email });
          setUser(data.user);
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

  return (
    <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
  );
}
