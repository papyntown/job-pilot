"use client";

import { useEffect, useState } from "react";

import { useAuthUser } from "@/components/auth/AuthGuard";
import { ProfileAttentionBanner } from "@/components/profile/ProfileAttentionBanner";
import { ResumeUpload } from "@/components/profile/ResumeUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { insforge } from "@/lib/insforge-client";
import { rowToProfile } from "@/lib/profile-mapper";
import type { Profile, ProfileRow } from "@/types";

export function ProfilePageClient() {
  const user = useAuthUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    insforge.database
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data) {
          console.error("[profile/ProfilePageClient]", error);
          setLoadError("Could not load your profile. Please refresh the page.");
          return;
        }
        setProfile(rowToProfile(data as ProfileRow));
      });

    return () => {
      active = false;
    };
  }, [user.id]);

  if (loadError) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <p className="text-sm font-medium text-error">{loadError}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div
          className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent"
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <>
      <ProfileAttentionBanner
        completionPercentage={profile.completionPercentage}
        missingFields={profile.missingFields}
      />
      <ResumeUpload />
      <ProfileForm profile={profile} />
    </>
  );
}
