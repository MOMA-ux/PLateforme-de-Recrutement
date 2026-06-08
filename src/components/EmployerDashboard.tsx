/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PlusCircle, Search, Edit2, Trash2, Users, Star, Calendar, FileText, Check, MoreVertical, Briefcase, MapPin, DollarSign, X, CheckCircle2, AlertCircle, Heart, Award, ExternalLink } from "lucide-react";
import { Job, JobApplication, EmployerProfile, ContractType, ExperienceLevel } from "../types";

interface EmployerDashboardProps {
  jobs: Job[];
  onAddJob: (job: Job) => void;
  onEditJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
  applications: JobApplication[];
  onUpdateApplicationStatus: (appId: string, status: any) => void;
  onUpdateCandidateRating: (appId: string, rating: number) => void;
  onScheduleInterview: (appId: string, date: string, link: string) => void;
  employerProfile: EmployerProfile;
  onChangeEmployerProfile: (updatedProfile: EmployerProfile) => void;
}

export default function EmployerDashboard({
  jobs,
  onAddJob,
  onEditJob,
  onDeleteJob,
  applications,
  onUpdateApplicationStatus,
  onUpdateCandidateRating,
  onScheduleInterview,
  employerProfile,
  onChangeEmployerProfile
}: EmployerDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"listings" | "applicants" | "candidates">("listings");
  
  // Create / Edit Job Form State
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Post form values
  const [postTitle, setPostTitle] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [postIndustry, setPostIndustry] = useState("");
  const [postContract, setPostContract] = useState<ContractType>("Full-time");
  const [postExperience, setPostExperience] = useState<ExperienceLevel>("Mid Level");
  const [postMinSalary, setPostMinSalary] = useState(80000);
  const [postMaxSalary, setPostMaxSalary] = useState(130000);
  const [postDesc, setPostDesc] = useState("");
  const [postReqs, setPostReqs] = useState("");
  const [postResps, setPostResps] = useState("");

  // Search in global candidates
  const [candSearch, setCandSearch] = useState("");
  const [candSkillFilter, setCandSkillFilter] = useState("");

  // Edit profile state
  const [editProfile, setEditProfile] = useState(false);
  const [profileName, setProfileName] = useState(employerProfile.name);
  const [profileLocation, setProfileLocation] = useState(employerProfile.location);
  const [profileWebsite, setProfileWebsite] = useState(employerProfile.website);
  const [profileDesc, setProfileDesc] = useState(employerProfile.description);

  // Shortlisted local state simulation
  const [shortlistedCandIds, setShortlistedCandIds] = useState<string[]>(["cand-2"]);

  // Schedule modal state
  const [schedulingAppId, setSchedulingAppId] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewLink, setInterviewLink] = useState("https://talenthub.workspace/room/interview-");

  // Candidate detail viewer state
  const [viewingCandidateId, setViewingCandidateId] = useState<string | null>(null);

  // Filter jobs by current employer
  const employerJobs = jobs.filter(j => j.companyName === employerProfile.name);

  // Clear or fill form for editing template
  const handleOpenPostModal = (jobToEdit?: Job) => {
    if (jobToEdit) {
      setEditingJob(jobToEdit);
      setPostTitle(jobToEdit.title);
      setPostLocation(jobToEdit.location);
      setPostIndustry(jobToEdit.industry);
      setPostContract(jobToEdit.contractType);
      setPostExperience(jobToEdit.experienceLevel);
      setPostMinSalary(jobToEdit.salaryMin);
      setPostMaxSalary(jobToEdit.salaryMax);
      setPostDesc(jobToEdit.description);
      setPostReqs(jobToEdit.requirements.join("\n"));
      setPostResps(jobToEdit.responsibilities.join("\n"));
    } else {
      setEditingJob(null);
      setPostTitle("");
      setPostLocation("San Francisco, CA (Hybrid)");
      setPostIndustry("SaaS");
      setPostContract("Full-time");
      setPostExperience("Mid Level");
      setPostMinSalary(90000);
      setPostMaxSalary(140000);
      setPostDesc("We are seeking an energetic specialist to join our crew.");
      setPostReqs("3+ years in industry.\nProficient with modern client tech.\nExcellent communicator.");
      setPostResps("Maintain core systems.\nEngage in weekly sprints.\nWrite elegant code documentation.");
    }
    setShowPostModal(true);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requirementsArray = postReqs.split("\n").filter(line => line.trim() !== "");
    const responsibilitiesArray = postResps.split("\n").filter(line => line.trim() !== "");

    if (editingJob) {
      const updated: Job = {
        ...editingJob,
        title: postTitle,
        location: postLocation,
        industry: postIndustry,
        contractType: postContract,
        experienceLevel: postExperience,
        salaryMin: postMinSalary,
        salaryMax: postMaxSalary,
        description: postDesc,
        requirements: requirementsArray,
        responsibilities: responsibilitiesArray
      };
      onEditJob(updated);
    } else {
      const newJob: Job = {
        id: `job-${Date.now()}`,
        title: postTitle,
        companyName: employerProfile.name,
        companyLogo: employerProfile.logo,
        location: postLocation,
        industry: postIndustry,
        contractType: postContract,
        experienceLevel: postExperience,
        salaryMin: postMinSalary,
        salaryMax: postMaxSalary,
        salaryCurrency: "$",
        datePosted: new Date().toISOString().split("T")[0],
        description: postDesc,
        requirements: requirementsArray,
        responsibilities: responsibilitiesArray,
        benefits: ["Comprehensive medical option.", "401(k) matching package.", "Flexible hybrid schedule."],
        companyDescription: employerProfile.description,
        applicantsCount: 0
      };
      onAddJob(newJob);
    }
    setShowPostModal(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeEmployerProfile({
      ...employerProfile,
      name: profileName,
      location: profileLocation,
      website: profileWebsite,
      description: profileDesc
    });
    setEditProfile(false);
  };

  // Simulated Global candidate talent database
  const globalCandidates = [
    { id: "cand-1", name: "Alex Rivera", title: "Frontend Specialist", skills: ["React", "TypeScript", "Tailwind CSS"], rating: 4, experience: "4 yrs", matchScore: 92 },
    { id: "cand-2", name: "Sophia Martinez", title: "Senior Software Architect", skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL"], rating: 5, experience: "7 yrs", matchScore: 98 },
    { id: "cand-3", name: "Jonathan Zhao", title: "Full Stack Engineer", skills: ["React", "Express", "PostgreSQL", "JavaScript"], rating: 4, experience: "5 yrs", matchScore: 89 },
    { id: "cand-4", name: "Emma Watson", title: "Lead Product Designer", skills: ["Figma", "UI/UX Design", "Component Libraries", "Prototyping"], rating: 5, experience: "6 yrs", matchScore: 95 },
    { id: "cand-6", name: "Marcus Vance", title: "CS Sophomore", skills: ["Python", "JavaScript", "HTML", "CSS"], rating: 3, experience: "1 yr", matchScore: 68 }
  ];

  const handleToggleShortlist = (candId: string) => {
    if (shortlistedCandIds.includes(candId)) {
      setShortlistedCandIds(shortlistedCandIds.filter(id => id !== candId));
    } else {
      setShortlistedCandIds([...shortlistedCandIds, candId]);
    }
  };

  const executeInterviewScheduling = () => {
    if (schedulingAppId && interviewDate) {
      const generatedLink = `${interviewLink}${schedulingAppId.substring(4)}`;
      onScheduleInterview(schedulingAppId, interviewDate, generatedLink);
      setSchedulingAppId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Employer Banner Area */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          {editProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-3.5 max-w-lg">
              <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)} className="text-xl font-bold p-1 border rounded-lg text-slate-800" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input type="text" value={profileLocation} onChange={e => setProfileLocation(e.target.value)} className="p-1 border rounded-lg" />
                <input type="text" value={profileWebsite} onChange={e => setProfileWebsite(e.target.value)} className="p-1 border rounded-lg" />
              </div>
              <textarea value={profileDesc} onChange={e => setProfileDesc(e.target.value)} className="w-full text-xs p-1 border rounded-lg" rows={2} />
              <div className="flex gap-2">
                <button type="submit" className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs">Save</button>
                <button type="button" onClick={() => setEditProfile(false)} className="px-3.5 py-1.5 border rounded-lg text-xs font-bold text-slate-600">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">{employerProfile.name}</h1>
                <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Hiring Portal</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 font-semibold flex items-center gap-1.5">
                <span>📍 {employerProfile.location}</span>
                <span>•</span>
                <span className="text-blue-600 underline cursor-pointer">{employerProfile.website}</span>
                <span>•</span>
                <span>🏢 {employerProfile.size}</span>
              </p>
              <p className="text-xs text-slate-500 max-w-2xl mt-2 leading-relaxed">"{employerProfile.description}"</p>
            </>
          )}
        </div>

        <div className="shrink-0 flex gap-2">
          {!editProfile && (
            <button onClick={() => setEditProfile(true)} className="px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold">
              Edit Workspace details
            </button>
          )}
          <button
            onClick={() => handleOpenPostModal()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <PlusCircle className="w-4.5 h-4.5" />
            Post New Position
          </button>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-6">
        <button
          onClick={() => setActiveSubTab("listings")}
          className={`pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
            activeSubTab === "listings" ? "text-blue-600" : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Active Job Posts ({employerJobs.length})
          {activeSubTab === "listings" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
        <button
          onClick={() => setActiveSubTab("applicants")}
          className={`pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
            activeSubTab === "applicants" ? "text-blue-600" : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Applicants Review ({applications.length})
          {activeSubTab === "applicants" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
        <button
          onClick={() => setActiveSubTab("candidates")}
          className={`pb-3 text-xs font-bold uppercase tracking-wider relative transition-colors ${
            activeSubTab === "candidates" ? "text-blue-600" : "text-slate-400 hover:text-slate-700"
          }`}
        >
          Search Talent Directory
          {activeSubTab === "candidates" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>}
        </button>
      </div>

      {/* SUBTAB CONTENT: Listings Table */}
      {activeSubTab === "listings" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">Currently Listed Positions</span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total: {employerJobs.length} live</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] text-slate-400 uppercase font-bold bg-slate-50">
                  <th className="p-4">POSITION TITLE</th>
                  <th className="p-4">LEVEL / FORMAT</th>
                  <th className="p-4">SALARY GUIDE</th>
                  <th className="p-4">APPLICANTS</th>
                  <th className="p-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employerJobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 text-xs">No active listings. Click 'Post New Position' to write a vacancy!</td>
                  </tr>
                ) : (
                  employerJobs.map(job => (
                    <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{job.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Posted on: {job.datePosted} • {job.location}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[9px] font-bold">{job.experienceLevel}</span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold">{job.contractType}</span>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-700">
                        ${(job.salaryMin/1000).toFixed(0)}k - ${(job.salaryMax/1000).toFixed(0)}k / yr
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-bold text-[10px]">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          {applications.filter(a => a.jobId === job.id).length} applicants
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1.5 shrink-0">
                        <button
                          onClick={() => handleOpenPostModal(job)}
                          className="p-1 text-slate-500 hover:text-blue-600 inline-flex"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteJob(job.id)}
                          className="p-1 text-slate-500 hover:text-rose-600 inline-flex"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB CONTENT: Applicants Flow */}
      {activeSubTab === "applicants" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          {/* Main Pipeline Panel */}
          <div className="lg:col-span-12 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Job Seekers Applications</span>
              <span className="text-xs text-blue-600 font-bold">{applications.length} Active application records</span>
            </div>

            {applications.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">No applicants currently. Applications posted via Find Jobs will reflect here!</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {applications.map(app => (
                  <div key={app.id} className="bg-white border rounded-2xl border-slate-200 p-5 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      
                      {/* Left: Candidate core metadata */}
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 font-bold flex items-center justify-center text-sm text-slate-700">
                          {app.candidateName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xs font-bold text-slate-900">{app.candidateName}</h3>
                            <button
                              onClick={() => setViewingCandidateId(app.candidateId)}
                              className="text-[10px] text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
                            >
                              View profile
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">{app.candidateTitle} • Applying for: <span className="text-slate-700">{app.jobTitle}</span></p>
                          <p className="text-[10px] text-slate-400 mt-1">Submitted: {app.appliedDate}</p>
                        </div>
                      </div>

                      {/* Right: Scoring Rating & Steps state */}
                      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        
                        {/* Rating stars */}
                        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5">
                          <span className="text-[10px] px-1 bg-slate-200 text-slate-700 rounded font-bold">{app.rating || 0}</span>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => onUpdateCandidateRating(app.id, star)}
                                className={`p-0.5 hover:scale-110 transition-transform`}
                              >
                                <Star className={`w-3.5 h-3.5 ${star <= (app.rating || 0) ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Status Select dropdown */}
                        <select
                          value={app.status}
                          onChange={e => onUpdateApplicationStatus(app.id, e.target.value as any)}
                          className="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:none accent-blue-600"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Screening">Screening</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Offered">Offered</option>
                          <option value="Rejected">Rejected</option>
                        </select>

                        {/* Interview CTA if interviewing */}
                        {app.status === "Interviewing" && (
                          <button
                            onClick={() => {
                              setSchedulingAppId(app.id);
                              setInterviewDate("2026-06-12T14:30");
                            }}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Assemble Interview
                          </button>
                        )}
                      </div>

                    </div>

                    {/* Applicant Notes and Cover letter text preview */}
                    <div className="bg-slate-50/80 rounded-xl p-3 text-xs text-slate-600 font-medium space-y-1 leading-relaxed border border-slate-100">
                      {app.coverLetter && (
                        <p><span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Cover Letter statement</span> "{app.coverLetter}"</p>
                      )}
                      {app.notes ? (
                        <p className="border-t border-slate-200/60 pt-2.5 mt-2.5"><span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block mb-1">Hiring Team Assessment Log</span> 📝 {app.notes}</p>
                      ) : (
                        <p className="border-t border-slate-200/60 pt-2.5 mt-2.5 text-slate-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> No screening assessment logged yet. Use candidate selection rating stars above to evaluate attributes.</p>
                      )}
                    </div>

                    {/* Scheduled dates disclosure */}
                    {app.interviewDate && (
                      <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-xl p-3 text-xs font-semibold flex justify-between items-center">
                        <p>✓ Screening Interview scheduled on: {new Date(app.interviewDate).toLocaleDateString()} at {new Date(app.interviewDate).toLocaleTimeString()}</p>
                        <a href={app.interviewLink} target="_blank" rel="renderer" className="text-[10px] text-emerald-700 underline font-bold">Launch Room link</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* SUBTAB CONTENT: Candidate Directory Database */}
      {activeSubTab === "candidates" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidate index database by name, title..."
                value={candSearch}
                onChange={e => setCandSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 outline-none text-slate-800 focus:border-blue-500 bg-white placeholder:text-slate-400 focus:ring-1 focus:ring-blue-100"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Filter by skill competence (e.g. React, Python)"
                value={candSkillFilter}
                onChange={e => setCandSkillFilter(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 outline-none text-slate-800 focus:border-blue-500 bg-white placeholder:text-slate-400 focus:ring-1 focus:ring-blue-100"
              />
              <Award className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-250 text-[10px] text-slate-400 uppercase font-bold bg-slate-50">
                    <th className="p-4">CANDIDATE NAME</th>
                    <th className="p-4">PROFESSIONAL TITLE</th>
                    <th className="p-4">EXPERIENCE LOG</th>
                    <th className="p-4">COMPETENCY BADGES</th>
                    <th className="p-4">MATCH RATING</th>
                    <th className="p-4 text-right">SHORTLIST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {globalCandidates
                    .filter(c => {
                      const matchN = c.name.toLowerCase().includes(candSearch.toLowerCase()) || c.title.toLowerCase().includes(candSearch.toLowerCase());
                      const matchS = !candSkillFilter || c.skills.some(sk => sk.toLowerCase().includes(candSkillFilter.toLowerCase()));
                      return matchN && matchS;
                    })
                    .map(cand => (
                      <tr key={cand.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <button
                            onClick={() => setViewingCandidateId(cand.id)}
                            className="font-bold text-slate-900 text-left hover:text-blue-600"
                          >
                            {cand.name}
                          </button>
                        </td>
                        <td className="p-4 text-slate-600 font-semibold">{cand.title}</td>
                        <td className="p-4 font-semibold text-slate-500">{cand.experience}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {cand.skills.map((s, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium text-[9px]">{s}</span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                            cand.matchScore >= 90 ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                          }`}>
                            {cand.matchScore}% Match Rating
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleToggleShortlist(cand.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              shortlistedCandIds.includes(cand.id)
                                ? "bg-rose-50 border-rose-250 text-rose-600"
                                : "border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-50"
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${shortlistedCandIds.includes(cand.id) ? "fill-rose-500" : ""}`} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* POST / EDIT JOB OFFER MODAL OVERLAY */}
      {showPostModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Vacancy Management Panel</span>
              <h2 className="text-lg font-extrabold text-slate-900 mt-1">{editingJob ? "Modify Placed Job Posting" : "Publish Dynamic Job Offer"}</h2>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Position Title</label>
                  <input required type="text" value={postTitle} onChange={e => setPostTitle(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg focus:outline-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Location / Work Format</label>
                  <input required type="text" value={postLocation} onChange={e => setPostLocation(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg focus:outline-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Industry category</label>
                  <input required type="text" value={postIndustry} onChange={e => setPostIndustry(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg focus:outline-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Contract Type</label>
                  <select value={postContract} onChange={e => setPostContract(e.target.value as any)} className="w-full text-xs p-2.5 border rounded-lg bg-white">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Experience Requirement</label>
                  <select value={postExperience} onChange={e => setPostExperience(e.target.value as any)} className="w-full text-xs p-2.5 border rounded-lg bg-white">
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Min Salary ($ / yr)</label>
                  <input type="number" value={postMinSalary} onChange={e => setPostMinSalary(Number(e.target.value))} className="w-full text-xs p-2.5 border rounded-lg focus:outline-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Max Salary ($ / yr)</label>
                  <input type="number" value={postMaxSalary} onChange={e => setPostMaxSalary(Number(e.target.value))} className="w-full text-xs p-2.5 border rounded-lg focus:outline-blue-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wider block">Job overview / Description</label>
                <textarea rows={3} value={postDesc} onChange={e => setPostDesc(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg focus:outline-blue-500" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Candidate Specifications (One per line)</label>
                  <textarea rows={4} value={postReqs} onChange={e => setPostReqs(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg focus:outline-blue-500 font-sans" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Key Responsibilities (One per line)</label>
                  <textarea rows={4} value={postResps} onChange={e => setPostResps(e.target.value)} className="w-full text-xs p-2.5 border rounded-lg focus:outline-blue-500 font-sans" />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100 justify-end">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold font-semibold shadow-md"
                >
                  {editingJob ? "Apply Revisions" : "Publish Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW DIALOG */}
      {schedulingAppId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setSchedulingAppId(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5.5 h-5.5" />
            </button>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Assemble Recruiter screening Appointment</h3>
            <p className="text-[10px] text-slate-400 mb-4">Set times and setup conference rooms securely.</p>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">Date and Clock Time</label>
                <input
                  type="datetime-local"
                  value={interviewDate}
                  onChange={e => setInterviewDate(e.target.value)}
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">Conference Meeting URL Link</label>
                <input
                  type="text"
                  value={interviewLink}
                  onChange={e => setInterviewLink(e.target.value)}
                  className="w-full p-2.5 border rounded-lg font-mono text-[10px]"
                />
              </div>

              <button
                type="button"
                onClick={executeInterviewScheduling}
                className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl font-bold font-semibold shadow-md"
              >
                Confirm and Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANDIDATE COMPREHENSIVE RESUME PREVIEW PANEL */}
      {viewingCandidateId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full p-6 sm:p-8 overflow-y-auto flex flex-col justify-between shadow-2xl relative animate-slide-in">
            <button onClick={() => setViewingCandidateId(null)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700">
              <X className="w-5.5 h-5.5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Talent Record</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Sophia Martinez</h3>
                <p className="text-xs text-blue-600 font-bold mt-0.5">Senior Software Architect</p>
              </div>

              <div className="border hover:shadow-xs rounded-xl p-4 bg-slate-50/50 text-xs text-slate-600 space-y-4">
                <p className="italic">"Senior full-stack systems engineer focusing on cloud database scaling and responsive interface guidelines. Led technical teams for over 6 years."</p>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-700">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {["React", "TypeScript", "Node.js", "Express", "AWS", "PostgreSQL", "Docker", "DevOps"].map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[9px] border border-blue-100">{sk}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-700">History Timeline</h4>
                  <div className="space-y-2 pl-3 border-l-2 border-slate-200">
                    <div>
                      <p className="font-bold text-slate-800 text-[11px]">Lead Software Architect</p>
                      <p className="text-[10px] text-slate-400 font-bold">CloudPillar solutions (2022 - Present)</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-[11px]">Senior Developer</p>
                      <p className="text-[10px] text-slate-400 font-bold">Apollo Wealth Inc (2100 - 2022)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                handleToggleShortlist(viewingCandidateId);
                setViewingCandidateId(null);
              }}
              className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                shortlistedCandIds.includes(viewingCandidateId)
                  ? "bg-rose-50 text-rose-600 border border-rose-250"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {shortlistedCandIds.includes(viewingCandidateId) ? "Remove from Shortlists" : "Shortlist Candidate"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
