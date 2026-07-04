"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { insforge } from "@/lib/insforge-client";

export function SignedInPanel() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState<boolean>(false);

  useEffect(() => {
    let active = true;

    insforge.auth
      .getCurrentUser()
      .then(({ data }) => {
        if (active) setEmail(data?.user?.email ?? null);
      })
      .catch(() => {
        if (active) setEmail(null);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleSignOut(): Promise<void> {
    setSigningOut(true);
    try {
      await insforge.auth.signOut();
      router.replace("/login");
    } catch {
      setSigningOut(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center rounded-2xl border border-border bg-surface p-8 text-center shadow-card">
      <h1 className="text-xl font-semibold text-text-primary">
        You&apos;re signed in
      </h1>
      <p className="mt-2 text-sm font-medium text-text-secondary">
        {email ?? "Loading your account…"}
      </p>
      <p className="mt-4 text-xs font-normal text-text-muted">
        The full dashboard arrives in a later build step.
      </p>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="mt-6 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {signingOut ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}
