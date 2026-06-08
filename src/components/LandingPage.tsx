/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, MapPin, Briefcase, TrendingUp, Users, Building, FileText, ArrowRight, Star, Globe, ShieldCheck } from "lucide-react";

interface LandingPageProps {
  onSearch: (keyword: string, location: string) => void;
  setCurrentTab: (tab: string) => void;
  stats: {
    activeJobs: number;
    candidates: number;
    companies: number;
    placements: number;
  };
}

export default function LandingPage({ onSearch, setCurrentTab, stats }: LandingPageProps) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, location);
    setCurrentTab("jobs");
  };

  const handleQuickCategory = (cat: string) => {
    onSearch(cat, "");
    setCurrentTab("jobs");
  };

  const quickCategories = [
    { name: "React Engineer", count: "4 open", color: "bg-blue-50 text-blue-700 border-blue-200" },
    { name: "UI/UX Designer", count: "8 open", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { name: "Data Analyst", count: "3 open", color: "bg-teal-50 text-teal-700 border-teal-200" },
    { name: "Marketing", count: "6 open", color: "bg-amber-50 text-amber-700 border-amber-200" }
  ];

  const partners = [
    { name: "CreativeFlow", industry: "Design Studio" },
    { name: "MediCare Analytics", industry: "Healthcare" },
    { name: "Apollo FinTech", industry: "Finance" },
    { name: "CloudPillar Tech", industry: "SaaS Dev" }
  ];

  const reviews = [
    {
      text: "TalentHub made our recruiting cycle twice as fast! The candidate tracking interface and skills matching feature saved us hundreds of screening hours.",
      author: "Sarah Jenkins",
      role: "VP of People, Apollo FinTech",
      rating: 5,
      avatar: "SJ"
    },
    {
      text: "As a developer, the status dashboard is a dream come true. I knew exactly where my application stood at every milestone. Landed my ideal Senior role here!",
      author: "Sophia Martinez",
      role: "Senior Architect (Placed Candidate)",
      rating: 5,
      avatar: "SM"
    },
    {
      text: "The HR analytics and hiring funnel reports are unparalleled. We managed to coordinate interview scheduling and cross-team scorecards effortlessly.",
      author: "Marcus Smith",
      role: "Head of Talent Acquisition",
      rating: 5,
      avatar: "MS"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pt-12 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-6 animate-pulse">
            <Globe className="w-3.5 h-3.5" />
            Introducing TalentHub Enterprise Version 2.0
          </span>
          <h1 id="hero-headline" className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Find the Right <span className="text-blue-700 underline decoration-wavy decoration-blue-400">Talent</span> or Your Next <span className="text-indigo-600">Opportunity</span>
          </h1>
          <p id="hero-subline" className="mt-5 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Leading companies trust our smart recruitment hub to organize pipelines, track metrics, match candidate skillsets, and schedule effortless internal screenings.
          </p>

          {/* Interactive Search Bar Panel */}
          <form onSubmit={handleSubmit} className="mt-8 bg-white p-2.5 rounded-2xl shadow-xl max-w-4xl mx-auto border border-slate-200/80 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
            {/* Keyword Field */}
            <div className="md:col-span-5 flex items-center px-3 border-b md:border-b-0 md:border-r border-slate-100 pb-2 md:pb-0">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                id="search-input-title"
                type="text"
                placeholder="Job title, keywords, or skills..."
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                className="w-full text-sm ml-2.5 focus:outline-none text-slate-800 bg-transparent py-2.5"
              />
            </div>

            {/* Location Field */}
            <div className="md:col-span-4 flex items-center px-3 pb-2 md:pb-0">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                id="search-input-location"
                type="text"
                placeholder="State, City or Remote..."
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full text-sm ml-2.5 focus:outline-none text-slate-800 bg-transparent py-2.5"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <button
                id="search-btn-submit"
                type="submit"
                className="w-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                Search Listings
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Categories list */}
          <div className="mt-5 flex flex-wrap justify-center items-center gap-3.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Search:</span>
            {quickCategories.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickCategory(c.name)}
                className={`px-3 py-1 rounded-full border text-xs font-semibold hover:brightness-95 transition-all cursor-pointer ${c.color}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Dashboard Statistics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y-0 divide-x-0 md:divide-x divide-slate-100">
          
          <div className="text-center p-2">
            <div className="inline-flex p-3 rounded-full bg-blue-50 text-blue-600 mb-2">
              <Briefcase className="w-5 h-5" />
            </div>
            <p id="stat-jobs-count" className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.activeJobs}</p>
            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Active Jobs</p>
          </div>

          <div className="text-center p-2">
            <div className="inline-flex p-3 rounded-full bg-teal-50 text-teal-600 mb-2">
              <Users className="w-5 h-5" />
            </div>
            <p id="stat-candidates-count" className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.candidates}</p>
            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Registered Candidates</p>
          </div>

          <div className="text-center p-2">
            <div className="inline-flex p-3 rounded-full bg-purple-50 text-purple-600 mb-2">
              <Building className="w-5 h-5" />
            </div>
            <p id="stat-companies-count" className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.companies}</p>
            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Partners Hiring</p>
          </div>

          <div className="text-center p-2">
            <div className="inline-flex p-3 rounded-full bg-emerald-50 text-emerald-600 mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p id="stat-placements-count" className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.placements}</p>
            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">Successful Hires</p>
          </div>

        </div>
      </section>

      {/* Partners Logos section */}
      <section className="py-12 bg-white max-w-7xl mx-auto rounded-3xl mt-12 border border-slate-100 px-4">
        <h3 className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-6">
          Empowering Leading Corporate Partners
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto">
          {partners.map((p, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-3 grayscale hover:grayscale-0 transition-all">
              <span className="text-sm font-black tracking-wider text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-lg border border-slate-200">
                {p.name}
              </span>
              <span className="text-[9px] font-semibold text-slate-400 mt-1">{p.industry}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-2">Platform Reviews</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Here's What Hiring Teams and Job Seekers Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between">
              <div>
                <div className="flex gap-0.5 text-amber-500 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200 uppercase">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{rev.author}</h4>
                  <p className="text-[10px] text-slate-400 font-medium">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action Block */}
      <section className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white py-16 px-4 rounded-3xl max-w-7xl mx-auto my-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 h-96 w-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
            Ready to Streamline Your Professional Recruitment?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Create an employer portal, list open positions, or setup real-time screening protocols to invite qualified specialists today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => {
                setCurrentTab("jobs");
              }}
              className="px-6 py-3 text-sm font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-xl transition-all shadow-md w-full sm:w-auto"
            >
              Browse Open Jobs
            </button>
            <button
              onClick={() => {
                onSearch("", "");
                setCurrentTab("dashboard");
              }}
              className="px-6 py-3 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-md w-full sm:w-auto flex items-center justify-center gap-1.5"
            >
              Manage Your Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
