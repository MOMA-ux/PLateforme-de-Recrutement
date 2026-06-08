/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ContractType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
export type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior" | "Lead" | "Executive";
export type ApplicationStatus = "Applied" | "Screening" | "Interviewing" | "Offered" | "Rejected";

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string; // Tailwind bg-color code or icon representation
  location: string;
  industry: string;
  contractType: ContractType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  datePosted: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  companyDescription: string;
  applicantsCount: number;
  saved?: boolean;
  applied?: boolean;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  title: string;
  bio: string;
  resumeName: string;
  skills: string[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
  certifications: string[];
  workExperience: {
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  portfolioLinks: {
    label: string;
    url: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateId: string;
  candidateName: string;
  candidateTitle: string;
  candidateEmail: string;
  status: ApplicationStatus;
  appliedDate: string;
  coverLetter?: string;
  notes?: string;
  rating?: number; // Employer candidate rating 1-5
  interviewLink?: string;
  interviewDate?: string;
}

export interface Message {
  id: string;
  senderId: string; // "candidate" or "employer" or "hr" or name
  senderName: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface EmployerProfile {
  name: string;
  industry: string;
  size: string;
  website: string;
  location: string;
  description: string;
  logo: string;
}

export interface HRTeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface CollaborationNote {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface JobFilters {
  search: string;
  location: string;
  industry: string;
  contractType: string;
  experienceLevel: string;
  salaryMin: number;
}
