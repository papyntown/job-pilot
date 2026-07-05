import type { Education, Profile, ProfileRow } from "@/types";

const EMPTY_EDUCATION: Education = {
  highestDegree: "",
  fieldOfStudy: "",
  institutionName: "",
  graduationYear: "",
};

function joinList(list: string[] | null): string {
  return (list ?? []).join(", ");
}

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function rowToProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    fullName: row.full_name ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    location: row.location ?? "",
    currentTitle: row.current_title ?? "",
    experienceLevel: row.experience_level ?? "",
    yearsExperience: row.years_experience,
    skills: row.skills ?? [],
    industries: row.industries ?? [],
    workExperience: row.work_experience ?? [],
    education: row.education ?? EMPTY_EDUCATION,
    jobTitlesSeeking: joinList(row.job_titles_seeking),
    remotePreference: row.remote_preference ?? "",
    preferredLocations: joinList(row.preferred_locations),
    salaryExpectation: row.salary_expectation ?? "",
    linkedinUrl: row.linkedin_url ?? "",
    portfolioUrl: row.portfolio_url ?? "",
    workAuthorization: row.work_authorization ?? "",
    resumePdfUrl: row.resume_pdf_url,
    resumePdfKey: row.resume_pdf_key,
    completionPercentage: row.completion_percentage,
    missingFields: row.missing_fields ?? [],
    isComplete: row.is_complete,
  };
}

export function profileToRow(profile: Profile): Partial<ProfileRow> {
  return {
    full_name: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    current_title: profile.currentTitle,
    experience_level: profile.experienceLevel,
    years_experience: profile.yearsExperience,
    skills: profile.skills,
    industries: profile.industries,
    work_experience: profile.workExperience,
    education: profile.education,
    job_titles_seeking: splitList(profile.jobTitlesSeeking),
    remote_preference: profile.remotePreference,
    preferred_locations: splitList(profile.preferredLocations),
    salary_expectation: profile.salaryExpectation,
    linkedin_url: profile.linkedinUrl,
    portfolio_url: profile.portfolioUrl,
    work_authorization: profile.workAuthorization,
    resume_pdf_url: profile.resumePdfUrl,
    resume_pdf_key: profile.resumePdfKey,
    completion_percentage: profile.completionPercentage,
    missing_fields: profile.missingFields,
    is_complete: profile.isComplete,
  };
}
