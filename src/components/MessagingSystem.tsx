/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { Send, Search, CheckCheck, User, Sparkles, Phone, Video, MoreHorizontal, ArrowLeft, SendHorizontal } from "lucide-react";
import { Message } from "../types";

interface MessagingProps {
  messages: Message[];
  onSendMessage: (receiverId: string, text: string) => void;
  activeRole: "candidate" | "employer" | "hr";
}

export default function MessagingSystem({ messages, onSendMessage, activeRole }: MessagingProps) {
  const [activeThreadId, setActiveThreadId] = useState<string>("employer-cand-1"); // Default thread
  const [typedText, setTypedText] = useState("");

  const candidateId = "cand-1"; // Alex Rivera

  // Separate conversations/threads representation
  const threads = [
    {
      id: "employer-cand-1",
      name: "Charlotte Dupond",
      title: "Lead Recruiter at TalentHub",
      avatar: "CD",
      targetId: "employer",
      role: "employer"
    },
    {
      id: "hr-cand-1",
      name: "Marcus Smith",
      title: "Head of HR & Talent",
      avatar: "MS",
      targetId: "hr",
      role: "hr"
    }
  ];

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  // Filter messages mapping to active thread
  // In a candidate role, we correspond with employer or hr
  // In employer or hr roles, we correspond with cand-1
  const activeMessages = messages.filter(msg => {
    if (activeRole === "candidate") {
      // Chatting with activeThread.targetId
      return (msg.senderId === candidateId && msg.receiverId === activeThread.targetId) ||
             (msg.senderId === activeThread.targetId && msg.receiverId === candidateId);
    } else {
      // Chatting with cand-1 (Alex Rivera)
      // Representing employer or hr
      return (msg.senderId === activeRole && msg.receiverId === candidateId) ||
             (msg.senderId === candidateId && msg.receiverId === activeRole);
    }
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedText.trim()) {
      if (activeRole === "candidate") {
        onSendMessage(activeThread.targetId, typedText.trim());
      } else {
        onSendMessage(candidateId, typedText.trim());
      }
      setTypedText("");
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    if (activeRole === "candidate") {
      onSendMessage(activeThread.targetId, prompt);
    } else {
      onSendMessage(candidateId, prompt);
    }
  };

  const candidatePrompts = [
    "Yes, Tuesday at 11 AM works perfectly for me. Send over the calendar invite!",
    "Thank you. I have recently re-submitted my updated resume portfolio to my profile workspace.",
    "Could you provide a brief overview of the healthcare benefits package available?"
  ];

  const recruiterPrompts = [
    "Our team was highly impressed by your design system portfolio! Can we jump on a call?",
    "We have finalized our salary figures. I will compile your official offer blueprint now.",
    "The screening session will focus on live React performance logic. No heavy whiteboards!"
  ];

  const quickPrompts = activeRole === "candidate" ? candidatePrompts : recruiterPrompts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Messaging Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Communication Workspace</h1>
        <p className="text-slate-500 text-xs mt-1.5 font-medium">Verify screening schedules, communicate with recruitment stakeholders, and manage quick replies.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 h-[70vh] items-stretch">
        
        {/* Threads Sidebar - spans 4 cols */}
        <div className="md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex flex-col justify-between">
          <div className="p-4 space-y-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Conversations</span>
            <div className="space-y-2">
              {threads.map(thread => {
                const threadMessages = messages.filter(msg => {
                  if (activeRole === "candidate") {
                    return (msg.senderId === candidateId && msg.receiverId === thread.targetId) ||
                           (msg.senderId === thread.targetId && msg.receiverId === candidateId);
                  } else {
                    return (msg.senderId === thread.role && msg.receiverId === candidateId) ||
                           (msg.senderId === candidateId && msg.receiverId === thread.role);
                  }
                });
                const lastMsg = threadMessages[threadMessages.length - 1];

                return (
                  <div
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                      activeThreadId === thread.id
                        ? "bg-white border-blue-200 shadow-xs"
                        : "border-slate-100 hover:bg-white bg-slate-50/30"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 font-extrabold flex items-center justify-center shrink-0">
                      {thread.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{thread.name}</h4>
                        <span className="text-[9px] text-slate-400 font-semibold uppercase">Live</span>
                      </div>
                      <p className="text-[9px] text-slate-500 font-semibold truncate mt-0.5">{thread.title}</p>
                      {lastMsg && (
                        <p className="text-[10px] text-slate-400 truncate mt-1 italic">"{lastMsg.text}"</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-100/60 p-4 border-t border-slate-200/60">
            <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest block mb-1">Your Identity context:</span>
            {activeRole === "candidate" ? (
              <p className="text-[11px] text-slate-600 font-medium">Chatting as Candidate <span className="font-bold text-slate-800">Alex Rivera</span></p>
            ) : (
              <p className="text-[11px] text-slate-600 font-medium font-semibold">Chatting as Admin <span className="font-bold text-blue-700">{activeRole === "employer" ? "Hiring Manager" : "HR Recruiter"}</span></p>
            )}
          </div>
        </div>

        {/* Messaging Pane - spans 8 cols */}
        <div className="md:col-span-8 flex flex-col justify-between bg-white h-full overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/20 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                {activeThread.avatar}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-950 leading-tight">{activeThread.name}</h3>
                <p className="text-[10px] text-blue-600 font-bold mt-0.5">{activeThread.title}</p>
              </div>
            </div>

            <div className="flex gap-1.5">
              <button disabled className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg cursor-not-allowed"><Phone className="w-4 h-4" /></button>
              <button disabled className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg cursor-not-allowed"><Video className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                No conversation history. Send a greeting to start chatting!
              </div>
            ) : (
              activeMessages.map((msg, idx) => {
                const selfCandidate = msg.senderId === candidateId && activeRole === "candidate";
                const selfRecruiter = (msg.senderId === "employer" || msg.senderId === "hr") && activeRole !== "candidate";
                const isSelf = selfCandidate || selfRecruiter;

                return (
                  <div
                    key={msg.id || idx}
                    className={`flex ${isSelf ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    <div className={`max-w-[75%] rounded-2xl p-3 shadow-xs text-xs ${
                      isSelf
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/50"
                    }`}>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div className={`text-[9px] mt-1.5 flex items-center justify-end gap-1 ${
                        isSelf ? "text-blue-100" : "text-slate-400"
                      }`}>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {isSelf && <CheckCheck className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Prompt Assist Ribbon & Send Input */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/50 shrink-0 space-y-3">
            {/* Assistance Quick chips */}
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold text-blue-600 uppercase tracking-widest block flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-500" /> Professional assistant template chips
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickPrompt(p)}
                    className="px-3.5 py-1.5 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 text-[10px] rounded-lg cursor-pointer whitespace-nowrap font-medium transition-colors"
                  >
                    {p.substring(0, 42)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="flex gap-2.5 items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={typedText}
                onChange={e => setTypedText(e.target.value)}
                className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-slate-220 outline-none focus:border-blue-500 bg-white placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm shrink-0 flex items-center justify-center"
              >
                <SendHorizontal className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
