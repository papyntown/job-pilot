"use client";

import { useState } from "react";

import { FormField } from "@/components/profile/FormField";
import { insforge } from "@/lib/insforge-client";
import { profileToRow } from "@/lib/profile-mapper";
import { calculateCompletion } from "@/lib/utils";
import { posthog } from "@/lib/posthog-client";
import type { Profile, WorkExperienceEntry } from "@/types";

const inputClass =
  "rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

const EXPERIENCE_LEVELS = ["Junior", "Mid", "Senior", "Lead"];
const WORK_AUTHORIZATIONS = ["Citizen", "Permanent Resident", "Visa Required"];
const DEGREES = ["High School", "Associate", "Bachelor's", "Master's", "PhD"];
const REMOTE_PREFERENCES = ["Remote", "Onsite", "Hybrid", "Any"];

function emptyRole(): WorkExperienceEntry {
  return {
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    keyResponsibilities: "",
  };
}

type EditableFields = Pick<
  Profile,
  | "fullName"
  | "phone"
  | "location"
  | "linkedinUrl"
  | "portfolioUrl"
  | "workAuthorization"
  | "currentTitle"
  | "experienceLevel"
  | "yearsExperience"
  | "jobTitlesSeeking"
  | "remotePreference"
  | "salaryExpectation"
  | "preferredLocations"
  | "education"
>;

function editableFieldsFrom(profile: Profile): EditableFields {
  return {
    fullName: profile.fullName,
    phone: profile.phone,
    location: profile.location,
    linkedinUrl: profile.linkedinUrl,
    portfolioUrl: profile.portfolioUrl,
    workAuthorization: profile.workAuthorization,
    currentTitle: profile.currentTitle,
    experienceLevel: profile.experienceLevel,
    yearsExperience: profile.yearsExperience,
    jobTitlesSeeking: profile.jobTitlesSeeking,
    remotePreference: profile.remotePreference,
    salaryExpectation: profile.salaryExpectation,
    preferredLocations: profile.preferredLocations,
    education: profile.education,
  };
}

type Props = {
  profile: Profile;
};

export function ProfileForm({ profile }: Props) {
  const [form, setForm] = useState<EditableFields>(() =>
    editableFieldsFrom(profile),
  );
  const [skills, setSkills] = useState<string[]>(profile.skills);
  const [skillInput, setSkillInput] = useState("");
  const [industries, setIndustries] = useState<string[]>(profile.industries);
  const [industryInput, setIndustryInput] = useState("");
  const [roles, setRoles] = useState<WorkExperienceEntry[]>(
    profile.workExperience.length > 0 ? profile.workExperience : [emptyRole()],
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  function addSkill() {
    const value = skillInput.trim();
    if (!value || skills.includes(value)) return;
    setSkills([...skills, value]);
    setSkillInput("");
  }

  function addIndustry() {
    const value = industryInput.trim();
    if (!value || industries.includes(value)) return;
    setIndustries([...industries, value]);
    setIndustryInput("");
  }

  function updateRole(index: number, patch: Partial<WorkExperienceEntry>) {
    setRoles(roles.map((role, i) => (i === index ? { ...role, ...patch } : role)));
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    const fullProfile: Profile = {
      ...profile,
      ...form,
      skills,
      industries,
      workExperience: roles.filter((role) => role.companyName.trim().length > 0),
    };

    const { completionPercentage, missingFields, isComplete } =
      calculateCompletion(fullProfile);
    const wasComplete = profile.isComplete;

    const row = {
      ...profileToRow({
        ...fullProfile,
        completionPercentage,
        missingFields,
        isComplete,
      }),
      updated_at: new Date().toISOString(),
    };

    const { error } = await insforge.database
      .from("profiles")
      .update(row)
      .eq("id", profile.id);

    setSaving(false);

    if (error) {
      console.error("[profile/ProfileForm]", error);
      setSaveError("Could not save your profile. Please try again.");
      return;
    }

    if (!wasComplete && isComplete) {
      posthog.capture("profile_completed", { userId: profile.id });
    }
    setSaveSuccess(true);
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
      <h2 className="text-base font-semibold text-text-primary">
        Profile Information
      </h2>
      <p className="mt-1 text-sm font-medium text-text-secondary">
        This context is used to accurately represent you in agent
        interactions.
      </p>

      {/* Personal Info */}
      <div className="mt-6 border-t border-border pt-6">
        <h3 className="text-base font-semibold text-text-primary">
          Personal Info
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Full Name" htmlFor="fullName">
            <input
              id="fullName"
              value={form.fullName}
              onChange={(event) =>
                setForm({ ...form, fullName: event.target.value })
              }
              className={inputClass}
            />
          </FormField>
          <FormField label="Email" htmlFor="email">
            <input
              id="email"
              defaultValue={profile.email}
              disabled
              className={`${inputClass} cursor-not-allowed bg-surface-secondary text-text-muted`}
            />
          </FormField>
          <FormField label="Phone Number" htmlFor="phone">
            <input
              id="phone"
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              placeholder="+1 (555) 000-0000"
              className={inputClass}
            />
          </FormField>
          <FormField label="Location" htmlFor="location">
            <input
              id="location"
              value={form.location}
              onChange={(event) =>
                setForm({ ...form, location: event.target.value })
              }
              placeholder="City, Country"
              className={inputClass}
            />
          </FormField>
          <FormField label="LinkedIn URL" htmlFor="linkedinUrl">
            <input
              id="linkedinUrl"
              value={form.linkedinUrl}
              onChange={(event) =>
                setForm({ ...form, linkedinUrl: event.target.value })
              }
              placeholder="https://linkedin.com/in/username"
              className={inputClass}
            />
          </FormField>
          <FormField label="Portfolio / GitHub" htmlFor="portfolioUrl">
            <input
              id="portfolioUrl"
              value={form.portfolioUrl}
              onChange={(event) =>
                setForm({ ...form, portfolioUrl: event.target.value })
              }
              placeholder="https://github.com/username"
              className={inputClass}
            />
          </FormField>
          <FormField label="Work Authorization" htmlFor="workAuthorization">
            <select
              id="workAuthorization"
              value={form.workAuthorization}
              onChange={(event) =>
                setForm({ ...form, workAuthorization: event.target.value })
              }
              className={inputClass}
            >
              {WORK_AUTHORIZATIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {/* Professional Info */}
      <div className="mt-6 border-t border-border pt-6">
        <h3 className="text-base font-semibold text-text-primary">
          Professional Info
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <FormField label="Current/Recent Job Title" htmlFor="currentTitle">
            <input
              id="currentTitle"
              value={form.currentTitle}
              onChange={(event) =>
                setForm({ ...form, currentTitle: event.target.value })
              }
              className={inputClass}
            />
          </FormField>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Experience Level" htmlFor="experienceLevel">
              <select
                id="experienceLevel"
                value={form.experienceLevel}
                onChange={(event) =>
                  setForm({ ...form, experienceLevel: event.target.value })
                }
                className={inputClass}
              >
                {EXPERIENCE_LEVELS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="Years of Experience" htmlFor="yearsExperience">
              <input
                id="yearsExperience"
                type="number"
                min={0}
                value={form.yearsExperience ?? ""}
                onChange={(event) =>
                  setForm({
                    ...form,
                    yearsExperience:
                      event.target.value === "" ? null : Number(event.target.value),
                  })
                }
                className={inputClass}
              />
            </FormField>
          </div>

          <FormField label="Skills" htmlFor="skillInput">
            <div className="flex gap-2">
              <input
                id="skillInput"
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add a skill"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={addSkill}
                className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-secondary"
              >
                Add
              </button>
            </div>
            {skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full bg-surface-secondary px-3 py-1 text-sm font-medium text-text-primary"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() =>
                        setSkills(skills.filter((s) => s !== skill))
                      }
                      aria-label={`Remove ${skill}`}
                      className="text-text-muted hover:text-text-primary"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </FormField>

          <FormField label="Industries Worked In (optional)" htmlFor="industryInput">
            <div className="flex gap-2">
              <input
                id="industryInput"
                value={industryInput}
                onChange={(event) => setIndustryInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addIndustry();
                  }
                }}
                placeholder="E.g. FinTech, Healthcare"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={addIndustry}
                className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary hover:bg-surface-secondary"
              >
                Add
              </button>
            </div>
            {industries.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <span
                    key={industry}
                    className="inline-flex items-center gap-1.5 rounded-full bg-surface-secondary px-3 py-1 text-sm font-medium text-text-primary"
                  >
                    {industry}
                    <button
                      type="button"
                      onClick={() =>
                        setIndustries(industries.filter((i) => i !== industry))
                      }
                      aria-label={`Remove ${industry}`}
                      className="text-text-muted hover:text-text-primary"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </FormField>
        </div>
      </div>

      {/* Work Experience */}
      <div className="mt-6 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">
            Work Experience
          </h3>
          {roles.length < 3 && (
            <button
              type="button"
              onClick={() => setRoles([...roles, emptyRole()])}
              className="text-sm font-medium text-accent hover:opacity-80"
            >
              + Add role
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-6">
          {roles.map((role, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-surface-tertiary p-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField label="Company Name" htmlFor={`companyName-${index}`}>
                  <input
                    id={`companyName-${index}`}
                    value={role.companyName}
                    onChange={(event) =>
                      updateRole(index, { companyName: event.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Job Title" htmlFor={`jobTitle-${index}`}>
                  <input
                    id={`jobTitle-${index}`}
                    value={role.jobTitle}
                    onChange={(event) =>
                      updateRole(index, { jobTitle: event.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Start Date" htmlFor={`startDate-${index}`}>
                  <input
                    id={`startDate-${index}`}
                    type="month"
                    value={role.startDate}
                    onChange={(event) =>
                      updateRole(index, { startDate: event.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`endDate-${index}`}
                      className="text-xs font-medium uppercase tracking-wide text-text-secondary"
                    >
                      End Date
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                      <input
                        type="checkbox"
                        checked={role.currentlyWorking}
                        onChange={(event) =>
                          updateRole(index, {
                            currentlyWorking: event.target.checked,
                            endDate: event.target.checked ? "" : role.endDate,
                          })
                        }
                        className="accent-accent"
                      />
                      Currently working here
                    </label>
                  </div>
                  <input
                    id={`endDate-${index}`}
                    type="month"
                    value={role.endDate}
                    disabled={role.currentlyWorking}
                    onChange={(event) =>
                      updateRole(index, { endDate: event.target.value })
                    }
                    className={`${inputClass} ${role.currentlyWorking ? "cursor-not-allowed bg-surface-secondary text-text-muted" : ""}`}
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Key Responsibilities"
                    htmlFor={`keyResponsibilities-${index}`}
                  >
                    <textarea
                      id={`keyResponsibilities-${index}`}
                      value={role.keyResponsibilities}
                      onChange={(event) =>
                        updateRole(index, {
                          keyResponsibilities: event.target.value,
                        })
                      }
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </FormField>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mt-6 border-t border-border pt-6">
        <h3 className="text-base font-semibold text-text-primary">
          Education
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Highest Degree" htmlFor="highestDegree">
            <select
              id="highestDegree"
              value={form.education.highestDegree}
              onChange={(event) =>
                setForm({
                  ...form,
                  education: { ...form.education, highestDegree: event.target.value },
                })
              }
              className={inputClass}
            >
              {DEGREES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Field of Study" htmlFor="fieldOfStudy">
            <input
              id="fieldOfStudy"
              value={form.education.fieldOfStudy}
              onChange={(event) =>
                setForm({
                  ...form,
                  education: { ...form.education, fieldOfStudy: event.target.value },
                })
              }
              className={inputClass}
            />
          </FormField>
          <FormField label="Institution Name" htmlFor="institutionName">
            <input
              id="institutionName"
              value={form.education.institutionName}
              onChange={(event) =>
                setForm({
                  ...form,
                  education: { ...form.education, institutionName: event.target.value },
                })
              }
              placeholder="E.g. State University"
              className={inputClass}
            />
          </FormField>
          <FormField label="Graduation Year" htmlFor="graduationYear">
            <input
              id="graduationYear"
              value={form.education.graduationYear}
              onChange={(event) =>
                setForm({
                  ...form,
                  education: { ...form.education, graduationYear: event.target.value },
                })
              }
              placeholder="YYYY"
              className={inputClass}
            />
          </FormField>
        </div>
      </div>

      {/* Job Preferences */}
      <div className="mt-6 border-t border-border pt-6">
        <h3 className="text-base font-semibold text-text-primary">
          Job Preferences
        </h3>
        <div className="mt-4 flex flex-col gap-4">
          <FormField label="Job Titles Seeking" htmlFor="jobTitlesSeeking">
            <input
              id="jobTitlesSeeking"
              value={form.jobTitlesSeeking}
              onChange={(event) =>
                setForm({ ...form, jobTitlesSeeking: event.target.value })
              }
              placeholder="Frontend Engineer, React Developer"
              className={inputClass}
            />
          </FormField>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Remote Preference" htmlFor="remotePreference">
              <select
                id="remotePreference"
                value={form.remotePreference}
                onChange={(event) =>
                  setForm({ ...form, remotePreference: event.target.value })
                }
                className={inputClass}
              >
                {REMOTE_PREFERENCES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField
              label="Salary Expectation (optional)"
              htmlFor="salaryExpectation"
            >
              <input
                id="salaryExpectation"
                value={form.salaryExpectation}
                onChange={(event) =>
                  setForm({ ...form, salaryExpectation: event.target.value })
                }
                placeholder="E.g. $120k+"
                className={inputClass}
              />
            </FormField>
          </div>
          <FormField
            label="Preferred Locations (optional)"
            htmlFor="preferredLocations"
          >
            <input
              id="preferredLocations"
              value={form.preferredLocations}
              onChange={(event) =>
                setForm({ ...form, preferredLocations: event.target.value })
              }
              placeholder="E.g. New York, London"
              className={inputClass}
            />
          </FormField>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent"
            aria-label="Saving"
          />
        )}
        {saving ? "Saving..." : "Save Profile"}
      </button>
      {saveError && (
        <p className="mt-2 text-sm font-medium text-error">{saveError}</p>
      )}
      {saveSuccess && !saveError && (
        <p className="mt-2 text-sm font-medium text-success">Profile saved.</p>
      )}
    </section>
  );
}
