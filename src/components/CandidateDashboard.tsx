/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Phone, Mail, FileText, Plus, X, GraduationCap, Award, Briefcase, Link as LinkIcon, Globe, CheckCircle2, Bookmark, ArrowUpRight, Check, Eye, Trash2 } from "lucide-react";
import { CandidateProfile, Job, JobApplication } from "../types";

interface CandidateDashboardProps {
  candidateProfile: CandidateProfile;
  onChangeProfile: (updatedProfile: CandidateProfile) => void;
  applications: JobApplication[];
  savedJobs: Job[];
  onApplyJob: (jobId: string, coverLetter?: string) => void;
  onToggleSaveJob: (jobId: string) => void;
  setCurrentTab: (tab: string) => void;
}

export default function CandidateDashboard({
  candidateProfile,
  onChangeProfile,
  applications,
  savedJobs,
  onApplyJob,
  onToggleSaveJob,
  setCurrentTab
}: CandidateDashboardProps) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<CandidateProfile>(candidateProfile);
  const [newSkill, setNewSkill] = useState("");
  const [dragActive, setDragActive] = useState(false);
  
  // Local lists states
  const [skills, setSkills] = useState(profile.skills);
  const [workExperience, setWorkExperience] = useState(profile.workExperience);
  const [education, setEducation] = useState(profile.education);

  // New item forms states
  const [showExpForm, setShowExpForm] = useState(false);
  const [expCompany, setExpCompany] = useState("");
  const [expRole, setExpRole] = useState("");
  const [expDuration, setExpDuration] = useState("");
  const [expDesc, setExpDesc] = useState("");

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...profile, skills, workExperience, education };
    onChangeProfile(updated);
    setEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (expCompany && expRole && expDuration) {
      setWorkExperience([
        { company: expCompany, role: expRole, duration: expDuration, description: expDesc },
        ...workExperience
      ]);
      setExpCompany("");
      setExpRole("");
      setExpDuration("");
      setExpDesc("");
      setShowExpForm(false);
    }
  };

  // Drag and drop mock CV upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setProfile(prev => ({ ...prev, resumeName: file.name }));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile(prev => ({ ...prev, resumeName: e.target.files![0].name }));
    }
  };

  // Step Status Mapping for application visualization
  const getStepIndex = (status: string) => {
    switch (status) {
      case "Applied": return 0;
      case "Screening": return 1;
      case "Interviewing": return 2;
      case "Offered": return 3;
      case "Rejected": return -1;
      default: return 0;
    }
  };

  const steps = ["Applied", "Screening", "Interview", "Offered"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Dashboard Headline */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight text-slate-900">Applicant Workspace</h1>
        <p className="text-slate-500 text-xs mt-1.5 font-medium">Coordinate your resume assets, track application states, verify interviews, and manage bookmarked listings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column - Core profile card & asset management */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Main Visual Profile Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative">
            <button
              onClick={() => { setEditing(!editing); }}
              className="absolute top-4 right-4 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>

            <div className="flex flex-col items-center text-center pt-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 font-extrabold text-2xl text-white flex items-center justify-center shadow-md mb-4 border-4 border-slate-50">
                {profile.fullName.substring(0, 2).toUpperCase()}
              </div>

              {editing ? (
                <form onSubmit={handleProfileSave} className="w-full space-y-3.5 mt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase text-left block">Full Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase text-left block">Professional Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={e => setProfile({ ...profile, title: e.target.value })}
                      className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase text-left block">Bio summary</label>
                    <textarea
                      value={profile.bio}
                      onChange={e => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase text-left block">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                        className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase text-left block">Phone</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-blue-500"
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm mt-3">
                    Save Profile Base
                  </button>
                </form>
              ) : (
                <>
                  <h2 className="text-sm font-bold text-slate-900">{profile.fullName}</h2>
                  <p className="text-xs text-blue-600 font-bold mt-0.5">{profile.title}</p>
                  <p className="text-slate-500 text-[11px] leading-relaxed mt-2.5 pl-2 pr-2 italic">
                    "{profile.bio}"
                  </p>

                  <div className="w-full border-t border-slate-100 my-4 pt-4 space-y-2.5 text-xs text-slate-600 text-left">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{profile.phone}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Simulated CV Upload Container */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Resume Attachment
            </h3>

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors cursor-pointer relative ${
                dragActive ? "border-blue-600 bg-blue-50/50" : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">Drag or Click to upload CV</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase">PDF, DOC up to 5MB</p>
            </div>

            {profile.resumeName && (
              <div className="flex justify-between items-center bg-blue-50/60 p-2.5 rounded-lg border border-blue-100 text-xs">
                <span className="truncate text-blue-800 font-bold max-w-[200px]">{profile.resumeName}</span>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">Active</span>
              </div>
            )}
          </div>

          {/* Skills Competency Inventory Drawer */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Skills Inventory</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold flex items-center gap-1">
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill)} className="text-slate-400 hover:text-slate-800"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>

            <div className="flex gap-1.5 pt-2">
              <input
                type="text"
                placeholder="New competence..."
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="p-2 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column - Status track, timelines, saved jobs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Job Applications milestones tracker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">Active Job Applications Tracking</h3>
            {applications.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                You haven't applied to any job listings yet. Use the Find Jobs page to log entries!
              </div>
            ) : (
              <div className="space-y-6 divide-y divide-slate-100">
                {applications.filter(app => app.candidateId === "cand-1").map((app, idx) => {
                  const stepIndex = getStepIndex(app.status);
                  return (
                    <div key={app.id} className={`pt-4 ${idx === 0 ? "pt-0" : ""}`}>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{app.jobTitle}</h4>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5">{app.companyName}</p>
                        </div>
                        {app.status === "Rejected" ? (
                          <span className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-100">
                            Discontinued
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">
                            Status: {app.status}
                          </span>
                        )}
                      </div>

                      {/* Timeline Bullet progression */}
                      {app.status !== "Rejected" && (
                        <div className="relative mt-4 mb-4">
                          <div className="absolute top-[11px] left-2 right-2 h-1 bg-slate-100 z-0"></div>
                          <div
                            className="absolute top-[11px] left-2 h-1 bg-gradient-to-r from-teal-500 to-blue-500 z-0 transition-all duration-500"
                            style={{ width: `${stepIndex === 3 ? "100" : (stepIndex / 3) * 100}%` }}
                          ></div>

                          <div className="relative flex justify-between z-10 text-center text-[10px]">
                            {steps.map((step, idxStep) => {
                              const active = idxStep <= stepIndex;
                              return (
                                <div key={idxStep} className="flex flex-col items-center">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border font-bold text-[9px] transition-all ${
                                    active ? "bg-teal-600 border-teal-600 text-white shadow-xs" : "bg-white border-slate-200 text-slate-400"
                                  }`}>
                                    {active ? <Check className="w-3.5 h-3.5" /> : idxStep + 1}
                                  </div>
                                  <span className={`mt-1 font-bold ${active ? "text-slate-800" : "text-slate-400"}`}>{step}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Extra context (Interviews links, recruiter remarks, etc) */}
                      {app.interviewDate && (
                        <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-bold text-indigo-900">Upcoming Virtual screening Interview Scheduled</p>
                            <p className="text-slate-500 text-[10px] mt-0.5">Date: {new Date(app.interviewDate).toLocaleDateString()} at {new Date(app.interviewDate).toLocaleTimeString()}</p>
                          </div>
                          <a href={app.interviewLink} target="_blank" rel="referrer" className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold hover:bg-indigo-700 flex items-center gap-1 shrink-0 shadow-xs">
                            Join Screening Rooms
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Timeline Block (Work Experience) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Work History Timeline
              </h3>
              <button
                onClick={() => setShowExpForm(!showExpForm)}
                className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-xs font-bold transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            {showExpForm && (
              <form onSubmit={handleAddExperience} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5 animate-slide-in">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Company</label>
                    <input type="text" required value={expCompany} onChange={e => setExpCompany(e.target.value)} className="w-full text-xs p-2 border bg-white rounded-lg outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Role / Title</label>
                    <input type="text" required value={expRole} onChange={e => setExpRole(e.target.value)} className="w-full text-xs p-2 border bg-white rounded-lg outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Duration / Years</label>
                    <input type="text" required placeholder="e.g. 2024 - Present" value={expDuration} onChange={e => setExpDuration(e.target.value)} className="w-full text-xs p-2 border bg-white rounded-lg outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">Responsibility description</label>
                  <textarea value={expDesc} onChange={e => setExpDesc(e.target.value)} rows={2} className="w-full text-xs p-2 border bg-white rounded-lg outline-none" />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold">Add Entry</button>
                  <button type="button" onClick={() => setShowExpForm(false)} className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold">Cancel</button>
                </div>
              </form>
            )}

            <div className="space-y-5 relative pl-4 border-l border-slate-100 ml-2">
              {workExperience.map((exp, i) => (
                <div key={i} className="relative space-y-1">
                  {/* timeline dot */}
                  <div className="absolute top-1.5 -left-[21px] w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-[10px] text-blue-600 font-bold mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{exp.duration}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              Academic & Education Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {education.map((edu, i) => (
                <div key={i} className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl relative">
                  <h4 className="text-xs font-bold text-slate-900">{edu.degree}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{edu.school}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-2">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Job listings bookmarks */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-rose-500" />
              Saved Job Bookmarks ({savedJobs.length})
            </h3>
            {savedJobs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No jobs saved yet. Bookmark jobs while search-filtering!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedJobs.map(job => (
                  <div key={job.id} className="p-4 border border-slate-200 rounded-xl flex justify-between items-start hover:border-slate-300 transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{job.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">{job.companyName}</p>
                      <p className="text-[10px] text-emerald-700 font-bold mt-2">${(job.salaryMin/1000).toFixed(0)}k - ${(job.salaryMax/1000).toFixed(0)}k</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          setCurrentTab("jobs");
                          // Let the search page load and focus on it
                        }}
                        className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[9px] font-extrabold rounded-lg flex items-center gap-0.5"
                      >
                        Details
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </button>
                      <button
                        onClick={() => onToggleSaveJob(job.id)}
                        className="text-[9px] font-bold text-rose-600 hover:text-rose-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
