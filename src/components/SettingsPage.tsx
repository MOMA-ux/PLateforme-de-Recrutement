/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Settings, Shield, Bell, Globe, Sparkles, Check, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const [success, setSuccess] = useState(false);
  const [language, setLanguage] = useState("English (US)");
  const [mfa, setMfa] = useState(true);
  const [alerts, setAlerts] = useState({
    applications: true,
    interviews: true,
    marketing: false,
    digest: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const languagesList = ["English (US)", "Spanish (ES)", "Japanese (JP)", "French (FR)", "German (DE)"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Workspace Settings</h1>
        <p className="text-slate-500 text-xs mt-1.5 font-medium">Fine-tune system alerting triggers, security preferences, and dashboard regional configurations.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs">
        
        {/* Languages section */}
        <div className="p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-500" />
            Language & Regional Localization
          </h3>
          <p className="text-[11px] text-slate-400">Select standard terminology localization configurations across TalentHub services.</p>
          
          <div className="max-w-md">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-220 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {languagesList.map((l, idx) => (
                <option key={idx} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Alerts / Security settings */}
        <div className="p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-500" />
            Safety & Authenticator Protocols
          </h3>
          <p className="text-[11px] text-slate-400">Manage modern defensive measures to lock dashboard workspaces.</p>

          <label className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50 cursor-pointer text-xs">
            <div>
              <p className="font-bold text-slate-800">Trigger 2FA (Multi-Factor Verification)</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Asks security codes on new recruiter connections.</p>
            </div>
            <input
              type="checkbox"
              checked={mfa}
              onChange={e => setMfa(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-slate-220 rounded"
            />
          </label>
        </div>

        {/* Notifications Checkboxes */}
        <div className="p-5 sm:p-6 space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-500" />
            Notification delivery preferences
          </h3>
          <p className="text-[11px] text-slate-400">Indicate communication mechanisms for candidate milestones.</p>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                checked={alerts.applications}
                onChange={e => setAlerts({ ...alerts, applications: e.target.checked })}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-800">Job applications milestones alerts</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Receive email alerts on status mutations (Applied &rarr; Screening &rarr; Interview).</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                checked={alerts.interviews}
                onChange={e => setAlerts({ ...alerts, interviews: e.target.checked })}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-800">Calendar invitations alert notes</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Integrate direct Google calendar scheduling invitations on interview assembly.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
              <input
                type="checkbox"
                checked={alerts.digest}
                onChange={e => setAlerts({ ...alerts, digest: e.target.checked })}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-800">Weekly Talent funnel report digests</span>
                <p className="text-[10px] text-slate-400 mt-0.5">Download general summaries from the Recruiter funnel metrics diagrams.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Save CTA */}
        <div className="p-5 sm:p-6 bg-slate-50/50 flex justify-end gap-3 rounded-b-2xl">
          {success && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-pulse">
              <Check className="w-4 h-4" /> Preferences saved!
            </span>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md transition-colors"
          >
            Apply Preferences
          </button>
        </div>

      </form>
    </div>
  );
}
