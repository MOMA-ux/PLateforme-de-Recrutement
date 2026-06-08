/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Briefcase, MessageSquare, Settings, Bell, ChevronDown, User, ShieldCheck, Building2, UserCircle, LogOut } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activeRole: "candidate" | "employer" | "hr";
  setActiveRole: (role: "candidate" | "employer" | "hr") => void;
  unreadCount: number;
  onOpenAuth: () => void;
  userLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  activeRole,
  setActiveRole,
  unreadCount,
  onOpenAuth,
  userLoggedIn,
  onLogout
}: NavbarProps) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New application received for Senior Full Stack Engineer", time: "5 mins ago", read: false },
    { id: 2, text: "Charlotte Dupond mentioned you in HR Pipeline Notes", time: "1 hr ago", read: false },
    { id: 3, text: "Alex Rivera accepted your interview invitation", time: "2 hrs ago", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "candidate":
        return { label: "Candidate", color: "bg-teal-50 text-teal-700 border-teal-200" };
      case "employer":
        return { label: "Employer Account", color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "hr":
        return { label: "HR Analyst Panel", color: "bg-indigo-50 text-indigo-700 border-indigo-200" };
      default:
        return { label: "Candidate", color: "bg-teal-50 text-teal-700 border-teal-200" };
    }
  };

  const activeBadge = getRoleBadge(activeRole);

  const handleToggleNotification = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab("landing")}>
            <div id="nav-logo-icon" className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-extrabold shadow-sm">
              <Briefcase className="w-5.5 h-5.5" />
            </div>
            <span id="nav-logo-text" className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
              TalentHub
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            <button
              id="nav-btn-home"
              onClick={() => setCurrentTab("landing")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                currentTab === "landing"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Home
            </button>
            <button
              id="nav-btn-jobs"
              onClick={() => setCurrentTab("jobs")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                currentTab === "jobs"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Find Jobs
            </button>
            <button
              id="nav-btn-dashboard"
              onClick={() => setCurrentTab("dashboard")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                currentTab === "dashboard"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Dashboard
            </button>
            <button
              id="nav-btn-messages"
              onClick={() => setCurrentTab("messages")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1.5 ${
                currentTab === "messages"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Messages
              {unreadCount > 0 && (
                <span className="inline-flex h-4.5 min-w-4.5 px-1 items-center justify-center text-[10px] font-bold bg-rose-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              id="nav-btn-settings"
              onClick={() => setCurrentTab("settings")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1 ${
                currentTab === "settings"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </nav>

          {/* Interactive Actions */}
          <div className="flex items-center gap-4">
            {/* Quick Role Portal Toggle */}
            <div className="relative">
              <button
                id="role-switch-trigger"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-semibold shadow-xs hover:bg-slate-50 transition-colors ${activeBadge.color}`}
              >
                {activeRole === "candidate" && <User className="w-3.5 h-3.5" />}
                {activeRole === "employer" && <Building2 className="w-3.5 h-3.5" />}
                {activeRole === "hr" && <ShieldCheck className="w-3.5 h-3.5" />}
                <span>{activeBadge.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl py-1 z-50">
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 tracking-wider">
                    SIMULATE WORKSPACE PROFILE
                  </div>
                  <button
                    onClick={() => {
                      setActiveRole("candidate");
                      setShowRoleDropdown(false);
                      setCurrentTab("dashboard");
                    }}
                    className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                      activeRole === "candidate" ? "font-bold text-teal-700 bg-teal-50/50" : "text-slate-700"
                    }`}
                  >
                    <UserCircle className="w-4.5 h-4.5 text-teal-600" />
                    <div>
                      <div className="font-semibold text-xs text-slate-800">Job Seeker</div>
                      <div className="text-[10px] text-slate-400">Alex Rivera (Applied/Track status)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setActiveRole("employer");
                      setShowRoleDropdown(false);
                      setCurrentTab("dashboard");
                    }}
                    className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                      activeRole === "employer" ? "font-bold text-blue-700 bg-blue-50/50" : "text-slate-700"
                    }`}
                  >
                    <Building2 className="w-4.5 h-4.5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-xs text-slate-800">Employer Account</div>
                      <div className="text-[10px] text-slate-400">Post jobs, review candidates & schedule</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setActiveRole("hr");
                      setShowRoleDropdown(false);
                      setCurrentTab("dashboard");
                    }}
                    className={`flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 text-sm hover:bg-slate-50 transition-colors ${
                      activeRole === "hr" ? "font-bold text-indigo-700 bg-indigo-50/50" : "text-slate-700"
                    }`}
                  >
                    <ShieldCheck className="w-4.5 h-4.5 text-indigo-600" />
                    <div>
                      <div className="font-semibold text-xs text-slate-800">HR Analytics Panel</div>
                      <div className="text-[10px] text-slate-400">Hiring funnel, trends & team logs</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Panel */}
            <div className="relative">
              <button
                id="notifications-trigger"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-50 transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl py-1 z-50 overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                    <span className="text-xs font-bold text-slate-700">Notifications</span>
                    {unreadNotifs > 0 && (
                      <button
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                        className="text-[10px] font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">All caught up!</div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          className={`p-3 text-xs transition-colors hover:bg-slate-50/80 cursor-pointer ${
                            !notif.read ? "bg-blue-50/30 font-medium" : ""
                          }`}
                          onClick={() => handleToggleNotification(notif.id)}
                        >
                          <div className="flex gap-2 items-start">
                            <span className={`block w-2 h-2 mt-1.5 rounded-full shrink-0 ${!notif.read ? "bg-blue-500" : "bg-transparent"}`}></span>
                            <div className="flex-1">
                              <p className="text-slate-700 leading-normal">{notif.text}</p>
                              <span className="text-[10px] text-slate-400 block mt-1">{notif.time}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown / Auth CTA */}
            {userLoggedIn ? (
              <div className="relative">
                <button
                  id="profile-dropdown-trigger"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-1.5 p-1 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-600 text-teal-100 text-sm font-semibold flex items-center justify-center shadow-xs">
                    AR
                  </div>
                  <span className="hidden leading-none font-medium text-xs text-slate-700 lg:block text-left">
                    Alex R.
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-xl py-1 z-50">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-800">Alex Rivera</p>
                      <p className="text-[10px] text-slate-400 truncate">alex.rivera@workspace.com</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setCurrentTab("dashboard");
                        setActiveRole("candidate");
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <UserCircle className="w-4 h-4 text-slate-400" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setCurrentTab("settings");
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Account Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onLogout();
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="navbar-login-cta"
                onClick={onOpenAuth}
                className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all text-slate-700 flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Nav Helper bar */}
      <div className="flex md:hidden border-t border-slate-100 bg-slate-50 divide-x divide-slate-200">
        <button onClick={() => setCurrentTab("landing")} className={`flex-1 text-center py-2 text-xs font-semibold ${currentTab === 'landing' ? 'text-blue-600 font-bold bg-white' : 'text-slate-500'}`}>Home</button>
        <button onClick={() => setCurrentTab("jobs")} className={`flex-1 text-center py-2 text-xs font-semibold ${currentTab === 'jobs' ? 'text-blue-600 font-bold bg-white' : 'text-slate-500'}`}>Jobs</button>
        <button onClick={() => setCurrentTab("dashboard")} className={`flex-1 text-center py-2 text-xs font-semibold ${currentTab === 'dashboard' ? 'text-blue-600 font-bold bg-white' : 'text-slate-500'}`}>Dashboard</button>
        <button onClick={() => setCurrentTab("messages")} className={`flex-1 text-center py-2 text-xs font-semibold ${currentTab === 'messages' ? 'text-blue-600 font-bold bg-white' : 'text-slate-500'}`}>Chat</button>
      </div>
    </header>
  );
}
