"use client";

import React from "react";
import {
  Mail,
  MessageSquare,
  Trash2,
  Clock,
  User,
  ShieldCheck,
  Loader2
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Message {
  _id: string;
  email: string;
  content: string;
  createdAt: string;
}

const fetchMessages = async (): Promise<Message[]> => {
  const res = await fetch("/api/get-contact", { method: "GET" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch messages");
  return data.messages;
};

const MessagesPage = () => {
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) return (
    /* Adjusted ml-0 for mobile and lg:ml-72 to match your Sidebar width */
    <main className="w-full lg:pl-72 min-h-screen bg-[#D7CEBC] flex items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-[#2F3523]/5 flex items-center justify-center border border-[#2F3523]/10 animate-pulse">
          <Loader2 className="animate-spin opacity-40" size={40} strokeWidth={1} />
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter italic mb-2">
            Curating <span className="opacity-40">Messages</span>
          </h2>
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-[#D7CEBC] text-[#2F3523]">
      {/* RESOURCES FOR RESPONSIVENESS:
          1. lg:pl-72: Pushes content to the right only on desktop to make room for Sidebar.
          2. pt-28: Extra top padding on mobile to stay below the Mobile Header.
      */}
      <main className="w-full lg:pl-72 mx-auto px-4 md:px-8 lg:px-12 py-12 pt-28 lg:pt-16 space-y-10">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-[#2F3523]/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 opacity-60">
              <MessageSquare size={14} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-black">
                Support Inbox
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
              Inbound <span className="opacity-40">Inquiries</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-[#2F3523] text-[#D7CEBC] rounded-full shadow-lg">
            <ShieldCheck size={14} className="opacity-80" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {messages.length} Active
            </span>
          </div>
        </div>

        {/* Messages List */}
        <div className="grid gap-6 max-w-5xl">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className="group relative bg-white/30 backdrop-blur-md border border-white/20 p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/40 transition-all shadow-sm"
              >
                {/* Header of the Card */}
                <div className="flex flex-col xs:flex-row items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-2xl bg-[#2F3523] text-[#D7CEBC] flex items-center justify-center shadow-md">
                      <User size={20}  />
                    </div>
                    <div className="min-w-0"> {/* min-w-0 helps text truncation work */}
                      <div className="flex items-center gap-2">
                        <Mail size={12} className="opacity-40 shrink-0" />
                        <h3 className="font-black text-sm md:text-lg tracking-tight truncate max-w-[180px] sm:max-w-none">
                          {msg.email}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1 opacity-40">
                        <Clock size={11} />
                        <span className="text-[10px] md:text-xs font-bold">
                          {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Content Box */}
                <div className="mt-6 p-5 md:p-6 bg-[#2F3523]/5 rounded-2xl md:rounded-[2rem] border border-[#2F3523]/5 relative overflow-hidden">
                  <p className="text-sm md:text-base leading-relaxed font-medium opacity-90 relative z-10">
                    {msg.content}
                  </p>
                  {/* Decorative background icon - hides on tiny screens to keep clean */}
                  <MessageSquare
                    className="absolute -right-4 -bottom-4 text-[#2F3523]/5 rotate-12 hidden xs:block"
                    size={80}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-24 md:py-32 bg-white/10 rounded-[2.5rem] border-2 border-dashed border-[#2F3523]/10">
              <MessageSquare size={48} className="opacity-10 mb-4" />
              <p className="text-[10px] md:text-sm font-black opacity-30 uppercase tracking-[0.4em] text-center px-6">
                The inbox is currently quiet
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;