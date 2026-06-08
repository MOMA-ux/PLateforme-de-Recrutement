/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import LandingPage from "./components/LandingPage";
import JobListings from "./components/JobListings";
import CandidateDashboard from "./components/CandidateDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import HRDashboard from "./components/HRDashboard";
import MessagingSystem from "./components/MessagingSystem";
import SettingsPage from "./components/SettingsPage";

import { Job, CandidateProfile, JobApplication, Message, EmployerProfile, CollaborationNote } from "./types";
import {
  initialJobs,
  initialCandidateProfile,
  initialApplications,
  initialMessages,
  initialEmployerProfile,
  initialHRTeam,
  initialCollaborationNotes
} from "./data/mockData";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("landing");
  const [activeRole, setActiveRole] = useState<"candidate" | "employer" | "hr">("candidate");
  const [userLoggedIn, setUserLoggedIn] = useState(true); // Pre-logged in to lower user boundaries
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Core Data State
  const [jobs, setJobs] = useState<Job[]>(() => {
    const cached = localStorage.getItem("talenthub_jobs");
    return cached ? JSON.parse(cached) : initialJobs;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const cached = localStorage.getItem("talenthub_apps");
    return cached ? JSON.parse(cached) : initialApplications;
  });

  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(() => {
    const cached = localStorage.getItem("talenthub_candidate");
    return cached ? JSON.parse(cached) : initialCandidateProfile;
  });

  const [employerProfile, setEmployerProfile] = useState<EmployerProfile>(() => {
    const cached = localStorage.getItem("talenthub_employer");
    return cached ? JSON.parse(cached) : initialEmployerProfile;
  });

  const [collaborationNotes, setCollaborationNotes] = useState<CollaborationNote[]>(() => {
    const cached = localStorage.getItem("talenthub_collab");
    return cached ? JSON.parse(cached) : initialCollaborationNotes;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const cached = localStorage.getItem("talenthub_messages");
    return cached ? JSON.parse(cached) : initialMessages;
  });

  // Search filter communication bridge
  const [searchFilter, setSearchFilter] = useState({ keyword: "", location: "" });

  // Persistent localStorage synchronization
  useEffect(() => {
    localStorage.setItem("talenthub_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("talenthub_apps", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("talenthub_candidate", JSON.stringify(candidateProfile));
  }, [candidateProfile]);

  useEffect(() => {
    localStorage.setItem("talenthub_employer", JSON.stringify(employerProfile));
  }, [employerProfile]);

  useEffect(() => {
    localStorage.setItem("talenthub_collab", JSON.stringify(collaborationNotes));
  }, [collaborationNotes]);

  useEffect(() => {
    localStorage.setItem("talenthub_messages", JSON.stringify(messages));
  }, [messages]);

  // Statistics calculation
  const stats = {
    activeJobs: jobs.length,
    candidates: 1248,
    companies: 42,
    placements: 864 + applications.filter(a => a.status === "Offered").length
  };

  const handleSearchSync = (keyword: string, location: string) => {
    setSearchFilter({ keyword, location });
    setCurrentTab("jobs");
  };

  const handleClearSearchFilter = () => {
    setSearchFilter({ keyword: "", location: "" });
  };

  // Job Actions
  const handleAddJob = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
  };

  const handleEditJob = (updatedJob: Job) => {
    setJobs(jobs.map(j => (j.id === updatedJob.id ? updatedJob : j)));
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  // Application Actions
  const handleApplyJob = (jobId: string, coverLetter?: string) => {
    // Flag the job as applied locally in listings
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applied: true, applicantsCount: j.applicantsCount + 1 } : j));

    const selectedJob = jobs.find(j => j.id === jobId);

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: selectedJob?.title || "Specialist",
      companyName: selectedJob?.companyName || employerProfile.name,
      candidateId: candidateProfile.id,
      candidateName: candidateProfile.fullName,
      candidateTitle: candidateProfile.title,
      candidateEmail: candidateProfile.email,
      status: "Applied",
      appliedDate: new Date().toISOString().split("T")[0],
      coverLetter: coverLetter || "I would love to apply for this position."
    };

    setApplications([newApp, ...applications]);
  };

  const handleToggleSaveJob = (jobId: string) => {
    setJobs(prev => prev.map(job => (job.id === jobId ? { ...job, saved: !job.saved } : job)));
  };

  const handleUpdateApplicationStatus = (appId: string, status: any) => {
    setApplications(prev => prev.map(app => (app.id === appId ? { ...app, status } : app)));
  };

  const handleUpdateCandidateRating = (appId: string, rating: number) => {
    setApplications(prev => prev.map(app => (app.id === appId ? { ...app, rating } : app)));
  };

  const handleScheduleInterview = (appId: string, date: string, link: string) => {
    setApplications(prev => prev.map(app => (app.id === appId ? { ...app, interviewDate: date, interviewLink: link } : app)));

    // Auto post internal message to Candidate Alex Rivera (if applicable)
    const activeApp = applications.find(a => a.id === appId);
    if (activeApp && activeApp.candidateId === "cand-1") {
      const interviewMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: "employer",
        senderName: `${employerProfile.name} Acquisition Team`,
        receiverId: "cand-1",
        text: `Hello Alex! We have scheduled a screening round for your application. Date: ${new Date(date).toLocaleString()}. Joining URL link: ${link}`,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setMessages(prev => [...prev, interviewMsg]);
    }
  };

  // Messaging Actions
  const handleSendMessage = (receiverId: string, text: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: activeRole === "candidate" ? "cand-1" : activeRole,
      senderName: activeRole === "candidate" ? candidateProfile.fullName : `${employerProfile.name} Recruiter`,
      receiverId,
      text,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // HR Notes actions
  const handleAddCollaborationNote = (text: string) => {
    const newNote: CollaborationNote = {
      id: `note-${Date.now()}`,
      author: "Marcus Smith",
      text,
      date: new Date().toISOString().split("T")[0]
    };
    setCollaborationNotes([newNote, ...collaborationNotes]);
  };

  const handleDeleteCollaborationNote = (noteId: string) => {
    setCollaborationNotes(collaborationNotes.filter(n => n.id !== noteId));
  };

  const unreadMessagesCount = messages.filter(m => {
    if (activeRole === "candidate") {
      return m.receiverId === "cand-1" && !m.isRead;
    } else {
      return m.receiverId === activeRole && !m.isRead;
    }
  }).length;

  // Saved Jobs filter for candidate dashboard
  const savedJobsList = jobs.filter(j => j.saved);

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased text-slate-800 flex flex-col justify-between">
      
      {/* Top Banner and Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        unreadCount={unreadMessagesCount}
        onOpenAuth={() => setShowAuthModal(true)}
        userLoggedIn={userLoggedIn}
        onLogout={() => {
          setUserLoggedIn(false);
          setCurrentTab("landing");
        }}
      />

      {/* Main Container Workspace */}
      <main className="flex-1 pb-16">
        {currentTab === "landing" && (
          <LandingPage
            onSearch={handleSearchSync}
            setCurrentTab={setCurrentTab}
            stats={stats}
          />
        )}

        {currentTab === "jobs" && (
          <JobListings
            jobs={jobs}
            onApplyJob={handleApplyJob}
            onToggleSaveJob={handleToggleSaveJob}
            searchFilter={searchFilter}
            onClearSearchFilter={handleClearSearchFilter}
          />
        )}

        {currentTab === "dashboard" && (
          <>
            {activeRole === "candidate" && (
              <CandidateDashboard
                candidateProfile={candidateProfile}
                onChangeProfile={setCandidateProfile}
                applications={applications}
                savedJobs={savedJobsList}
                onApplyJob={handleApplyJob}
                onToggleSaveJob={handleToggleSaveJob}
                setCurrentTab={setCurrentTab}
              />
            )}
            {activeRole === "employer" && (
              <EmployerDashboard
                jobs={jobs}
                onAddJob={handleAddJob}
                onEditJob={handleEditJob}
                onDeleteJob={handleDeleteJob}
                applications={applications}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
                onUpdateCandidateRating={handleUpdateCandidateRating}
                onScheduleInterview={handleScheduleInterview}
                employerProfile={employerProfile}
                onChangeEmployerProfile={setEmployerProfile}
              />
            )}
            {activeRole === "hr" && (
              <HRDashboard
                applications={applications}
                openPositionsCount={jobs.filter(j => j.companyName === employerProfile.name).length}
                teamMembers={initialHRTeam}
                collaborationNotes={collaborationNotes}
                onAddCollaborationNote={handleAddCollaborationNote}
                onDeleteCollaborationNote={handleDeleteCollaborationNote}
              />
            )}
          </>
        )}

        {currentTab === "messages" && (
          <MessagingSystem
            messages={messages}
            onSendMessage={handleSendMessage}
            activeRole={activeRole}
          />
        )}

        {currentTab === "settings" && (
          <SettingsPage />
        )}
      </main>

      {/* Beautiful humble corporate footer */}
      <footer className="border-t border-slate-200 bg-white py-6 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-slate-800 font-extrabold font-sans">TalentHub Solutions</span>
            <span>•</span>
            <span>All rights reserved © 2026</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Security Compliance</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">Applicant Terms</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">API Keys Support</span>
          </div>
        </div>
      </footer>

      {/* AUTHENTICATION MODAL */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={() => {
            setUserLoggedIn(true);
            setCurrentTab("dashboard");
          }}
        />
      )}

    </div>
  );
}
