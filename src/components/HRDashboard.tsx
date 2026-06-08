/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Users, FileText, CheckCircle2, TrendingUp, Sparkles, Plus, AlertCircle, Trash2, ShieldCheck, Mail, ArrowRight, Layers, Bell } from "lucide-react";
import { JobApplication, HRTeamMember, CollaborationNote } from "../types";

interface HRDashboardProps {
  applications: JobApplication[];
  openPositionsCount: number;
  teamMembers: HRTeamMember[];
  collaborationNotes: CollaborationNote[];
  onAddCollaborationNote: (noteText: string) => void;
  onDeleteCollaborationNote: (noteId: string) => void;
}

export default function HRDashboard({
  applications,
  openPositionsCount,
  teamMembers,
  collaborationNotes,
  onAddCollaborationNote,
  onDeleteCollaborationNote
}: HRDashboardProps) {
  const [newNote, setNewNote] = useState("");
  const [selectedMetric, setSelectedMetric] = useState<"volume" | "funnel">("volume");

  // Pipeline math
  const screeningCount = applications.filter(a => a.status === "Screening").length;
  const interviewingCount = applications.filter(a => a.status === "Interviewing").length;
  const offeredCount = applications.filter(a => a.status === "Offered").length;
  const appliedCount = applications.filter(a => a.status === "Applied").length;
  const rejectedCount = applications.filter(a => a.status === "Rejected").length;

  const totalApps = applications.length;
  const placementRate = totalApps > 0 ? ((offeredCount / totalApps) * 100).toFixed(0) : "0";

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddCollaborationNote(newNote.trim());
      setNewNote("");
    }
  };

  // SVG Spline path for application trends (Jan - Jun)
  const monthlyData = [
    { name: "Jan", count: 24, x: 50, y: 150 },
    { name: "Feb", count: 32, x: 150, y: 120 },
    { name: "Mar", count: 45, x: 250, y: 80 },
    { name: "Apr", count: 38, x: 350, y: 100 },
    { name: "May", count: 52, x: 450, y: 50 },
    { name: "Jun", count: 68, x: 550, y: 20 }
  ];

  const svgPath = `M ${monthlyData.map(d => `${d.x} ${d.y}`).join(" L ")}`;
  const svgAreaPath = `${svgPath} L 550 180 L 50 180 Z`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3.5xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
            Recruitment Intelligence Board
          </h1>
          <p className="text-slate-500 text-xs mt-1.5 font-medium">Configure corporate team assignments, evaluate real-time funnel performance, and review onboarding analytics.</p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> High-Confidence Decisions Active
          </span>
        </div>
      </div>

      {/* METRICS ROW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white border rounded-2xl p-5 shadow-xs flex items-center gap-4 border-slate-200">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <FileText className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800 leading-none">{totalApps}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Total Inbound Profiles</p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-xs flex items-center gap-4 border-slate-200">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
            <Layers className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800 leading-none">{openPositionsCount}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Active Open Placements</p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-xs flex items-center gap-4 border-slate-200">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl shrink-0">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800 leading-none">{offeredCount}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Allocated Offers</p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-xs flex items-center gap-4 border-slate-200">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <TrendingUp className="w-5.5 h-5.5" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800 leading-none">{placementRate}%</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">Offer Funnel Success</p>
          </div>
        </div>

      </div>

      {/* INTELLIGENCE GRAPHS & REPORT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Dynamic Pure SVG Charts */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">HR Analytics & Hiring Performance</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Visualize candidate onboarding velocity and team funnel trends</p>
            </div>

            <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setSelectedMetric("volume")}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  selectedMetric === "volume" ? "bg-white text-slate-800 shadow-sm font-bold" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Inbound Vol
              </button>
              <button
                onClick={() => setSelectedMetric("funnel")}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  selectedMetric === "funnel" ? "bg-white text-slate-800 shadow-sm font-bold" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Funnel Breakdown
              </button>
            </div>
          </div>

          {selectedMetric === "volume" ? (
            /* Area Spline Graph for applications */
            <div className="pt-2">
              <div className="flex justify-between text-[11px] mb-4 text-slate-500 font-semibold px-2">
                <span>Inbound application curves (Monthly logs)</span>
                <span className="text-emerald-600 font-bold">+183% Growth YoY</span>
              </div>
              <div className="relative h-56 w-full">
                <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  <line x1="50" y1="180" x2="550" y2="180" stroke="#f1f5f9" strokeWidth="2" />
                  <line x1="50" y1="120" x2="550" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="60" x2="550" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  
                  {/* Area fill */}
                  <path d={svgAreaPath} fill="url(#blue-gradient)" opacity="0.1" />
                  {/* Spline stroke */}
                  <path d={svgPath} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Circles and values */}
                  {monthlyData.map((d, i) => (
                    <g key={i}>
                      <circle cx={d.x} cy={d.y} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" className="cursor-pointer hover:scale-125 transition-transform" />
                      <text x={d.x} y={d.y - 12} textAnchor="middle" className="text-[10px] font-bold fill-slate-700 font-mono">{d.count}</text>
                      <text x={d.x} y="195" textAnchor="middle" className="text-[9px] font-bold fill-slate-400 uppercase tracking-widest">{d.name}</text>
                    </g>
                  ))}

                  <defs>
                    <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          ) : (
            /* Funnel charts breakdown */
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Applicants Conversion Stage Analysis</span>
              
              <div className="space-y-3">
                {/* Applied */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                    <span>1. Inbound Application</span>
                    <span className="font-bold text-slate-800">{appliedCount} profiles (100% Volume)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>

                {/* Screening */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                    <span>2. Candidate Screening stage</span>
                    <span className="font-bold text-slate-800">{screeningCount} profiles ({totalApps > 0 ? ((screeningCount/totalApps)*100).toFixed(0) : 0}% Conversion)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${totalApps > 0 ? (screeningCount/totalApps)*100 : 0}%` }}></div>
                  </div>
                </div>

                {/* Interviewing */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                    <span>3. In-Person Assessment / Screening</span>
                    <span className="font-bold text-slate-800">{interviewingCount} profiles ({totalApps > 0 ? ((interviewingCount/totalApps)*100).toFixed(0) : 0}% Conversion)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full" style={{ width: `${totalApps > 0 ? (interviewingCount/totalApps)*100 : 0}%` }}></div>
                  </div>
                </div>

                {/* Offered */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                    <span>4. Offered / Onboarding stage</span>
                    <span className="font-bold text-slate-800">{offeredCount} profiles ({totalApps > 0 ? ((offeredCount/totalApps)*100).toFixed(0) : 0}% success)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${totalApps > 0 ? (offeredCount/totalApps)*100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl flex items-center gap-2 text-xs text-slate-500 leading-normal">
            <AlertCircle className="w-4 h-4 shrink-0 text-blue-600" />
            <p>Conversion metrics track candidate milestones dynamically. To adjust values, modify application states in the Employer Account dashboard sub-tab.</p>
          </div>
        </div>

        {/* HR Team list */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-blue-600" />
              Recruitment Team Directory
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 leading-normal mb-3">Assigned administrative recruiters monitors pipeline metrics</p>

            <div className="space-y-3">
              {teamMembers.map(mem => (
                <div key={mem.id} className="flex justify-between items-center p-2 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-150 font-bold text-xs text-indigo-700 flex items-center justify-center">
                      {mem.avatar}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{mem.name}</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">{mem.role}</p>
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-100">Active</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border hover:shadow-xs p-3 rounded-xl bg-orange-50 text-orange-850 leading-relaxed text-[11px] font-semibold border-orange-100 flex gap-2">
            <Bell className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block text-[9px] text-orange-800 mb-0.5">Notification center</span>
              System scheduled 2 candidate screenings in the last 24 hours. Verify slots before launching standard conference links.
            </div>
          </div>
        </div>

      </div>

      {/* HIRING PIPELINE PROGRESS MATRIX BOARD */}
      <div className="bg-white border rounded-2xl border-slate-200 p-5 space-y-4 shadow-xs">
        <div className="border-b border-slate-150 pb-3">
          <h3 className="text-sm font-bold text-slate-800">Recruitment Funnel Pipeline board</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Quick look at candidate pipeline positioning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Column Applied */}
          <div className="bg-slate-50 border rounded-xl p-3 space-y-3">
            <div className="flex justify-between items-center bg-blue-100/50 p-2 rounded-lg border border-blue-200/55">
              <span className="font-bold text-xs text-blue-800 uppercase tracking-widest">Inbound</span>
              <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-black">{appliedCount}</span>
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {applications.filter(a => a.status === "Applied").map(a => (
                <div key={a.id} className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-xs text-[11px]">
                  <p className="font-bold text-slate-800">{a.candidateName}</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">{a.jobTitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column Screening */}
          <div className="bg-slate-50 border rounded-xl p-3 space-y-3">
            <div className="flex justify-between items-center bg-indigo-100/50 p-2 rounded-lg border border-indigo-200/55">
              <span className="font-bold text-xs text-indigo-800 uppercase tracking-widest">Screening</span>
              <span className="text-[10px] bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full font-black">{screeningCount}</span>
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {applications.filter(a => a.status === "Screening").map(a => (
                <div key={a.id} className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-xs text-[11px]">
                  <p className="font-bold text-slate-800">{a.candidateName}</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">{a.jobTitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column Interviewing */}
          <div className="bg-slate-50 border rounded-xl p-3 space-y-3">
            <div className="flex justify-between items-center bg-teal-100/50 p-2 rounded-lg border border-teal-200/55">
              <span className="font-bold text-xs text-teal-800 uppercase tracking-widest">Interview</span>
              <span className="text-[10px] bg-teal-200 text-teal-800 px-2 py-0.5 rounded-full font-black">{interviewingCount}</span>
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {applications.filter(a => a.status === "Interviewing").map(a => (
                <div key={a.id} className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-xs text-[11px]">
                  <p className="font-bold text-slate-800">{a.candidateName}</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">{a.jobTitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column Offered */}
          <div className="bg-slate-50 border rounded-xl p-3 space-y-3">
            <div className="flex justify-between items-center bg-emerald-100/50 p-2 rounded-lg border border-emerald-200/55">
              <span className="font-bold text-xs text-emerald-800 uppercase tracking-widest">Offered</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-black">{offeredCount}</span>
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {applications.filter(a => a.status === "Offered").map(a => (
                <div key={a.id} className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-xs text-[11px]">
                  <p className="font-bold text-slate-800">{a.candidateName}</p>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5">{a.jobTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COLLABORATION NOTES GUESTBOOK */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Recruiter Collaboration Notes</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Communicate changes, requirements, and relocation guidelines securely</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Notes display */}
          <div className="md:col-span-8 space-y-3.5 max-h-72 overflow-y-auto pr-2">
            {collaborationNotes.map(note => (
              <div key={note.id} className="p-3 bg-slate-50 border border-slate-150 rounded-xl relative hover:border-slate-200 transition-all">
                <button
                  type="button"
                  onClick={() => onDeleteCollaborationNote(note.id)}
                  className="absolute top-3.5 right-3.5 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex gap-2 items-center text-[10px] text-slate-400 font-bold uppercase mb-1.5">
                  <span className="text-indigo-700">{note.author}</span>
                  <span>•</span>
                  <span>{note.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal italic font-medium">"{note.text}"</p>
              </div>
            ))}
          </div>

          {/* Notes form */}
          <form onSubmit={handlePostNote} className="md:col-span-4 bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-3 animate-fade-in">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Write Collaboration memo</span>
            <textarea
              required
              placeholder="Type relocations notes, screening milestones feedback or budget metrics approvals..."
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              rows={4}
              className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 font-sans leading-relaxed"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Post Collaboration memo
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}
