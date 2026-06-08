/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Lock, User, Github, Chrome, Linkedin, X, Check, Eye, EyeOff } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AuthModal({ onClose, onLoginSuccess }: AuthModalProps) {
  const [activeSubTab, setActiveSubTab] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccess(true);
    setTimeout(() => {
      setAuthSuccess(false);
      onLoginSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scale-up border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors"
        >
          <X className="w-5.5 h-5.5" />
        </button>

        {/* Heading */}
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">TalentHub Accounts</span>
          <h2 className="text-xl font-extrabold text-slate-950">
            {activeSubTab === "login" && "Welcome back!"}
            {activeSubTab === "signup" && "Create your digital profile"}
            {activeSubTab === "forgot" && "Recover passkey"}
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">Connect with premier corporate networks and explore vacancies</p>
        </div>

        {/* Subtabs selectors */}
        {activeSubTab !== "forgot" && (
          <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setActiveSubTab("login")}
              className={`flex-1 py-2 text-center rounded-lg font-bold transition-colors ${
                activeSubTab === "login" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveSubTab("signup")}
              className={`flex-1 py-2 text-center rounded-lg font-bold transition-colors ${
                activeSubTab === "signup" ? "bg-white text-slate-800 shadow-xs" : "text-slate-400"
              }`}
            >
              Create Profile
            </button>
          </div>
        )}

        {/* Forms area */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {activeSubTab === "signup" && (
            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
              <div className="relative">
                <input required type="text" placeholder="Alex Rivera" value={name} onChange={e => setName(e.target.value)} className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500 text-slate-800" />
                <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-3.5" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-bold text-slate-500 uppercase tracking-wider block">Corporate Email Address</label>
            <div className="relative">
              <input required type="email" placeholder="alex.rivera@workspace.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500 text-slate-800" />
              <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-3.5" />
            </div>
          </div>

          {activeSubTab !== "forgot" && (
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="font-bold text-slate-500 uppercase tracking-wider">Passkey Password</label>
                {activeSubTab === "login" && (
                  <button type="button" onClick={() => setActiveSubTab("forgot")} className="text-[10px] text-blue-600 hover:underline font-semibold">Forgot code?</button>
                )}
              </div>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} placeholder="••••••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full text-xs pl-8 pr-10 py-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500 text-slate-800" />
                <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-3.5" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {activeSubTab === "forgot" && (
            <div className="pt-2">
              <button type="button" onClick={() => setActiveSubTab("login")} className="text-xs text-blue-600 font-bold hover:underline">← Returns as Sign In</button>
            </div>
          )}

          {/* Error / Success representation */}
          {authSuccess ? (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-bold font-semibold flex items-center justify-center gap-2">
              <Check className="w-4.5 h-4.5 text-emerald-500" />
              Syncing verification profiles...
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold font-semibold rounded-xl text-xs shadow-md transition-all uppercase tracking-wide"
            >
              {activeSubTab === "login" && "Authenticate Inbound Session"}
              {activeSubTab === "signup" && "Establish Database Account"}
              {activeSubTab === "forgot" && "Send Passkey Recovery Link"}
            </button>
          )}
        </form>

        {activeSubTab !== "forgot" && (
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-150"></span></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-white px-2.5 text-slate-400">Or connect using social logs</span></div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => { setAuthSuccess(true); setTimeout(() => { onLoginSuccess(); onClose(); }, 1000); }}
                className="py-2 px-3 border border-slate-210 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:border-slate-300 transition-all text-xs"
              >
                <Chrome className="w-4.5 h-4.5 text-red-500" />
              </button>
              <button
                onClick={() => { setAuthSuccess(true); setTimeout(() => { onLoginSuccess(); onClose(); }, 1000); }}
                className="py-2 px-3 border border-slate-210 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:border-slate-300 transition-all text-xs"
              >
                <Linkedin className="w-4.5 h-4.5 text-blue-600" />
              </button>
              <button
                onClick={() => { setAuthSuccess(true); setTimeout(() => { onLoginSuccess(); onClose(); }, 1000); }}
                className="py-2 px-3 border border-slate-210 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-700 hover:border-slate-300 transition-all text-xs"
              >
                <Github className="w-4.5 h-4.5 text-slate-900" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
