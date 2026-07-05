import type { Profile } from "@/types";

export const MATCH_THRESHOLD = 70;

export const REQUIRED_PROFILE_FIELDS = [
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "location", label: "Location" },
  { key: "currentTitle", label: "Current Title" },
  { key: "experienceLevel", label: "Experience Level" },
  { key: "skills", label: "Skills" },
  { key: "highestDegree", label: "Education" },
  { key: "fieldOfStudy", label: "Education" },
  { key: "workExperience", label: "Work Experience" },
] as const;

export function calculateCompletion(profile: Profile): {
  completionPercentage: number;
  missingFields: string[];
  isComplete: boolean;
} {
  const checks: Record<string, boolean> = {
    fullName: profile.fullName.trim().length > 0,
    email: profile.email.trim().length > 0,
    phone: profile.phone.trim().length > 0,
    location: profile.location.trim().length > 0,
    currentTitle: profile.currentTitle.trim().length > 0,
    experienceLevel: profile.experienceLevel.trim().length > 0,
    skills: profile.skills.length > 0,
    highestDegree: profile.education.highestDegree.trim().length > 0,
    fieldOfStudy: profile.education.fieldOfStudy.trim().length > 0,
    workExperience: profile.workExperience.some(
      (role) => role.companyName.trim().length > 0,
    ),
  };

  const total = REQUIRED_PROFILE_FIELDS.length;
  const filled = Object.values(checks).filter(Boolean).length;
  const completionPercentage = Math.round((filled / total) * 100);
  const missingFields = Array.from(
    new Set(
      REQUIRED_PROFILE_FIELDS.filter((field) => !checks[field.key]).map(
        (field) => field.label,
      ),
    ),
  );
  const isComplete = completionPercentage === 100;

  return { completionPercentage, missingFields, isComplete };
}
