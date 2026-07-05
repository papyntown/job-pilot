export type WorkExperienceEntry = {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  keyResponsibilities: string;
};

export type Education = {
  highestDegree: string;
  fieldOfStudy: string;
  institutionName: string;
  graduationYear: string;
};

export type Profile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  currentTitle: string;
  experienceLevel: string;
  yearsExperience: number | null;
  skills: string[];
  industries: string[];
  workExperience: WorkExperienceEntry[];
  education: Education;
  jobTitlesSeeking: string;
  remotePreference: string;
  preferredLocations: string;
  salaryExpectation: string;
  linkedinUrl: string;
  portfolioUrl: string;
  workAuthorization: string;
  resumePdfUrl: string | null;
  resumePdfKey: string | null;
  completionPercentage: number;
  missingFields: string[];
  isComplete: boolean;
};

export type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  current_title: string | null;
  experience_level: string | null;
  years_experience: number | null;
  skills: string[] | null;
  industries: string[] | null;
  work_experience: WorkExperienceEntry[] | null;
  education: Education | null;
  job_titles_seeking: string[] | null;
  remote_preference: string | null;
  preferred_locations: string[] | null;
  salary_expectation: string | null;
  cover_letter_tone: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  work_authorization: string | null;
  resume_pdf_url: string | null;
  resume_pdf_key: string | null;
  completion_percentage: number;
  missing_fields: string[] | null;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
};
