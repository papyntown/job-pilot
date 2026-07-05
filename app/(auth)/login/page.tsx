"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/layout/Logo";
import { insforge } from "@/lib/insforge-client";

type Provider = "google" | "github";

// Google brand logo — official multi-color mark, intentionally not tokenized.
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState<boolean>(true);
  const [pending, setPending] = useState<Provider | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    insforge.auth
      .getCurrentUser()
      .then(({ data }) => {
        if (!active) return;
        if (data?.user) {
          router.replace("/dashboard");
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSignIn(provider: Provider): Promise<void> {
    setError(null);
    setPending(provider);

    try {
      const { error: oauthError } = await insforge.auth.signInWithOAuth(
        provider,
        {
          redirectTo: `${window.location.origin}/dashboard`,
          ...(provider === "google"
            ? { additionalParams: { prompt: "select_account" } }
            : {}),
        },
      );

      // On success the browser redirects to the provider, so this only runs on failure.
      if (oauthError) {
        setError("Could not start sign-in. Please try again.");
        setPending(null);
      }
    } catch {
      setError("Could not start sign-in. Please try again.");
      setPending(null);
    }
  }

  if (checking) {
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
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-card">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="mt-6 text-2xl font-bold text-text-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-sm font-medium text-text-secondary">
            Sign in to continue to JobPilot
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => handleSignIn("google")}
            disabled={pending !== null}
            className="inline-flex items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleIcon />
            {pending === "google" ? "Redirecting…" : "Continue with Google"}
          </button>

          <button
            type="button"
            onClick={() => handleSignIn("github")}
            disabled={pending !== null}
            className="inline-flex items-center justify-center gap-3 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GithubIcon />
            {pending === "github" ? "Redirecting…" : "Continue with GitHub"}
          </button>
        </div>

        {error ? (
          <p
            className="mt-4 text-center text-sm font-medium text-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <p className="mt-6 text-center text-xs font-normal text-text-muted">
          By continuing you agree to JobPilot&apos;s Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
