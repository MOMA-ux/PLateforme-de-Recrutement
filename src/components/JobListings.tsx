/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Search, MapPin, DollarSign, Calendar, Clock, Briefcase, Filter, X, ChevronLeft, ChevronRight, Bookmark, ArrowUpRight, HelpCircle, Building, CheckCircle, Check, Send } from "lucide-react";
import { Job, JobFilters } from "../types";

interface JobListingsProps {
  jobs: Job[];
  onApplyJob: (jobId: string, coverLetter?: string) => void;
  onToggleSaveJob: (jobId: string) => void;
  searchFilter: { keyword: string; location: string };
  onClearSearchFilter: () => void;
}

export default function JobListings({
  jobs,
  onApplyJob,
  onToggleSaveJob,
  searchFilter,
  onClearSearchFilter
}: JobListingsProps) {
  // Filters initial state
  const [keyword, setKeyword] = useState(searchFilter.keyword || "");
  const [location, setLocation] = useState(searchFilter.location || "");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedContract, setSelectedContract] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [minSalary, setMinSalary] = useState(0);

  // Sorting and page configs
  const [sortBy, setSortBy] = useState<"newest" | "salary" | "applicants">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Apply Modal state
  const [showApplyDrawer, setShowApplyDrawer] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applyComplete, setApplyComplete] = useState(false);

  const itemsPerPage = 3;

  // Sync with search filters from Landing page
  useEffect(() => {
    setKeyword(searchFilter.keyword);
    setLocation(searchFilter.location);
    if (searchFilter.keyword || searchFilter.location) {
      setCurrentPage(1);
    }
  }, [searchFilter]);

  // Unique lists for filtering dropdowns
  const industries = ["All", ...Array.from(new Set(jobs.map(j => j.industry)))];
  const contractTypes = ["All", "Full-time", "Part-time", "Contract", "Internship", "Remote"];
  const experiences = ["All", "Entry Level", "Mid Level", "Senior", "Lead", "Executive"];

  // Filter & Sort Logic
  const filteredJobs = jobs.filter(job => {
    const matchKeyword = !keyword ||
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.companyName.toLowerCase().includes(keyword.toLowerCase()) ||
      job.description.toLowerCase().includes(keyword.toLowerCase());

    const matchLocation = !location ||
      job.location.toLowerCase().includes(location.toLowerCase());

    const matchIndustry = selectedIndustry === "All" || job.industry === selectedIndustry;
    const matchContract = selectedContract === "All" || job.contractType === selectedContract;
    const matchExperience = selectedExperience === "All" || job.experienceLevel === selectedExperience;
    const matchSalary = job.salaryMax >= minSalary;

    return matchKeyword && matchLocation && matchIndustry && matchContract && matchExperience && matchSalary;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "salary") {
      return b.salaryMax - a.salaryMax;
    }
    if (sortBy === "applicants") {
      return b.applicantsCount - a.applicantsCount;
    }
    // "newest" as standard
    return b.datePosted.localeCompare(a.datePosted);
  });

  // Auto-focus first job on desktop if none selected
  useEffect(() => {
    if (sortedJobs.length > 0 && !selectedJob) {
      setSelectedJob(sortedJobs[0]);
    } else if (sortedJobs.length === 0) {
      setSelectedJob(null);
    }
  }, [sortedJobs, selectedJob]);

  // Pagination bounds
  const totalPages = Math.ceil(sortedJobs.length / itemsPerPage) || 1;
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobsList = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleResetFilters = () => {
    setKeyword("");
    setLocation("");
    setSelectedIndustry("All");
    setSelectedContract("All");
    setSelectedExperience("All");
    setMinSalary(0);
    setSortBy("newest");
    setCurrentPage(1);
    onClearSearchFilter();
  };

  const executeApply = () => {
    if (selectedJob) {
      onApplyJob(selectedJob.id, coverLetter);
      setApplyComplete(true);
      setTimeout(() => {
        setApplyComplete(false);
        setShowApplyDrawer(false);
        setCoverLetter("");
        // Refresh detail highlights
        const updated = jobs.find(j => j.id === selectedJob.id);
        if (updated) setSelectedJob({ ...updated, applied: true });
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight">Explore Professional Openings</h1>
            <p className="text-blue-100 text-xs mt-1.5 font-medium">Browse verified positions across premier industries, filtering with salary ranges and career track milestones.</p>
          </div>
          {(keyword || location || selectedIndustry !== "All" || selectedContract !== "All" || selectedExperience !== "All" || minSalary > 0) && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all border border-white/10 flex items-center gap-1.5"
            >
              <X className="w-4.5 h-4.5" />
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar - spans 3 columns */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              Advanced Filters
            </span>
            <span className="text-xs text-slate-400 font-medium">{sortedJobs.length} matches found</span>
          </div>

          {/* Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Keyword Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Title, skills, keyword..."
                value={keyword}
                onChange={e => { setKeyword(e.target.value); setCurrentPage(1); }}
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 outline-hidden focus:border-blue-500 text-slate-800 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Geography / Location</label>
            <div className="relative">
              <input
                type="text"
                placeholder="State, City or Remote..."
                value={location}
                onChange={e => { setLocation(e.target.value); setCurrentPage(1); }}
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 outline-hidden focus:border-blue-500 text-slate-800 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400"
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-3" />
            </div>
          </div>

          {/* Industry Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</label>
            <select
              value={selectedIndustry}
              onChange={e => { setSelectedIndustry(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
            >
              {industries.map((ind, i) => (
                <option key={i} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Contract Type Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contract Type</label>
            <select
              value={selectedContract}
              onChange={e => { setSelectedContract(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
            >
              {contractTypes.map((t, i) => (
                <option key={i} value={t}>{t === "All" ? "All Formats" : t}</option>
              ))}
            </select>
          </div>

          {/* Experience Level Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Experience Level</label>
            <select
              value={selectedExperience}
              onChange={e => { setSelectedExperience(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
            >
              {experiences.map((exp, i) => (
                <option key={i} value={exp}>{exp === "All" ? "All Levels" : exp}</option>
              ))}
            </select>
          </div>

          {/* Salary Slider Filter */}
          <div className="space-y-1.5 pb-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Salary Benchmark</label>
              <span className="text-xs font-bold text-blue-600">${(minSalary/1000).toFixed(0)}k+</span>
            </div>
            <input
              type="range"
              min="0"
              max="180000"
              step="10000"
              value={minSalary}
              onChange={e => { setMinSalary(Number(e.target.value)); setCurrentPage(1); }}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold uppercase">
              <span>Any Salary</span>
              <span>$180k+</span>
            </div>
          </div>
        </div>

        {/* Listings & Details Split - Workspace - spans 8 columns */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Cards Column - spans 5 cols (or 12 if no detail panel is visible) */}
          <div className={`col-span-12 ${selectedJob ? "md:col-span-5" : "md:col-span-12"} space-y-4`}>
            {/* Sort & Quick info header */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Jobs Found ({sortedJobs.length})</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-semibold shrink-0">Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-transparent border-0 cursor-pointer font-bold text-slate-700 focus:ring-0 text-xs text-right pr-2"
                >
                  <option value="newest">Newest first</option>
                  <option value="salary">Highest salary</option>
                  <option value="applicants">Most applicants</option>
                </select>
              </div>
            </div>

            {/* List */}
            {currentJobsList.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <p className="text-sm font-semibold text-slate-500">No jobs match your search parameters.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  Reset Filtering Criteria
                </button>
              </div>
            ) : (
              currentJobsList.map(job => (
                <div
                  id={`job-card-${job.id}`}
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white rounded-xl border p-4 hover:border-slate-300 transition-all cursor-pointer shadow-xs ${
                    selectedJob?.id === job.id ? "ring-2 ring-blue-600 border-transparent shadow-sm" : "border-slate-200"
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Tiny logo */}
                    <div className={`w-10 h-10 rounded-lg ${job.companyLogo} font-bold text-xs flex items-center justify-center uppercase shrink-0`}>
                      {job.companyName.substring(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">{job.title}</h3>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{job.companyName}</p>
                    </div>
                    {/* Saved flag icon */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSaveJob(job.id);
                      }}
                      className="text-slate-400 hover:text-rose-500 shrink-0 p-1"
                    >
                      <Bookmark className={`w-4 h-4 ${job.saved ? "fill-rose-500 text-rose-500" : ""}`} />
                    </button>
                  </div>

                  {/* Attributes */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold">{job.contractType}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[9px] font-bold">{job.experienceLevel}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold truncate max-w-[120px]">{job.location}</span>
                  </div>

                  {/* Salary and Date footer */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 text-[10px]">
                    <span className="font-bold text-slate-700 flex items-center gap-0.5 text-xs text-emerald-700">
                      <DollarSign className="w-3.5 h-3.5" />
                      {(job.salaryMin/1000).toFixed(0)}k - {(job.salaryMax/1000).toFixed(0)}k
                      <span className="text-[9px] text-slate-400 font-normal ml-0.5">/ yr</span>
                    </span>
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {job.datePosted}
                    </span>
                  </div>
                </div>
              ))
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center pt-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>
                <span className="text-xs font-bold text-slate-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-2 border border-slate-100 rounded-lg hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            )}
          </div>

          {/* Detail Side Panel - spans 7 cols when selected */}
          {selectedJob && (
            <div id="job-detail-panel" className="col-span-12 md:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs sticky top-24 max-h-[82vh] overflow-y-auto">
              
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div className="flex gap-3">
                  <div className={`w-12 h-12 rounded-xl ${selectedJob.companyLogo} font-bold text-sm flex items-center justify-center uppercase shadow-xs shrink-0`}>
                    {selectedJob.companyName.substring(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">{selectedJob.title}</h2>
                    <p className="text-xs text-blue-600 font-bold mt-0.5 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5" />
                      {selectedJob.companyName}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{selectedJob.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="text-[10px]">
                  <p className="text-slate-400 font-semibold mb-0.5">FORMAT</p>
                  <p className="font-bold text-slate-800">{selectedJob.contractType}</p>
                </div>
                <div className="text-[10px]">
                  <p className="text-slate-400 font-semibold mb-0.5">EXPERIENCE</p>
                  <p className="font-bold text-slate-800">{selectedJob.experienceLevel}</p>
                </div>
                <div className="text-[10px]">
                  <p className="text-slate-400 font-semibold mb-0.5">SALARY GUIDE</p>
                  <p className="font-bold text-emerald-700">${selectedJob.salaryMin.toLocaleString()} - ${selectedJob.salaryMax.toLocaleString()}</p>
                </div>
                <div className="text-[10px]">
                  <p className="text-slate-400 font-semibold mb-0.5">APPLICANTS COUNT</p>
                  <p className="font-bold text-slate-800">{selectedJob.applicantsCount} professionals</p>
                </div>
              </div>

              {/* Action Ribbon */}
              <div className="flex gap-3">
                {selectedJob.applied ? (
                  <button
                    disabled
                    className="flex-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed shadow-xs"
                  >
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                    Application Submitted
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCoverLetter("");
                      setApplyComplete(false);
                      setShowApplyDrawer(true);
                    }}
                    className="flex-1 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white hover:opacity-95 text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                  >
                    Apply Now
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
                
                <button
                  onClick={() => onToggleSaveJob(selectedJob.id)}
                  className={`px-4.5 py-3 border rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                    selectedJob.saved ? "border-rose-200 text-rose-600 bg-rose-50" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${selectedJob.saved ? "fill-rose-500 text-rose-500" : ""}`} />
                </button>
              </div>

              {/* Main Body */}
              <div className="space-y-4 text-xs leading-relaxed text-slate-600">
                <div>
                  <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest mb-1.5">Role Overview</h4>
                  <p>{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest mb-1.5">Candidate Specifications</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedJob.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest mb-1.5">Responsibilities</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedJob.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest mb-1.5">Benefits & Perks</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {selectedJob.benefits.map((ben, i) => <li key={i}>{ben}</li>)}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-widest mb-1">About {selectedJob.companyName}</h4>
                  <p className="text-slate-500">{selectedJob.companyDescription}</p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* Dynamic Apply Drawer/Modal Overlay */}
      {showApplyDrawer && selectedJob && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl relative animate-slide-in">
            <button
              onClick={() => setShowApplyDrawer(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 absolute top-4 right-4"
            >
              <X className="w-5.5 h-5.5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Job Application Blueprint</span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">Apply to {selectedJob.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">at {selectedJob.companyName}</p>
              </div>

              {/* Candidate Info Preview block */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Applicant:</span>
                  <span className="text-slate-800 font-bold">Alex Rivera</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Contact:</span>
                  <span className="text-slate-800 font-bold">alex.rivera@workspace.com</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Selected Resume:</span>
                  <span className="text-blue-600 font-bold underline cursor-pointer flex items-center gap-1 text-[11px]">
                    Alex_Rivera_CV_2026.pdf
                  </span>
                </div>
              </div>

              {/* Cover Letter Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Personal Statement / Cover Letter</label>
                <textarea
                  placeholder="Introduce yourself to the recruiter. Share why this company and role is your perfect next step..."
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  rows={6}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-slate-800 focus:ring-1 focus:ring-blue-100 leading-normal"
                />
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-[11px] text-amber-800 leading-normal flex gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <p>By applying, your TalentHub resume, education log, and skills inventory will be sent securely to the employer's HR dashboard representation.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-3">
              <button
                type="button"
                onClick={() => setShowApplyDrawer(false)}
                className="flex-1 py-3 text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
              >
                Cancel
              </button>

              {applyComplete ? (
                <button
                  type="button"
                  disabled
                  className="flex-1 py-3 text-xs font-bold bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <Check className="w-4.5 h-4.5" />
                  Sending Info...
                </button>
              ) : (
                <button
                  type="button"
                  onClick={executeApply}
                  className="flex-1 py-3 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Application
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
