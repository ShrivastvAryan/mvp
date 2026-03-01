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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Message {
  _id: string;
  email: string;
  content: string;
  createdAt: string;
}

/* ------------------ FETCH ------------------ */

const fetchMessages = async (): Promise<Message[]> => {
  const res = await fetch("/api/get-contact", {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch messages");
  }

  return data.messages;
};

const MessagesPage = () => {

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });


   if (isLoading) return (
      <main className="w-full ml-36 mx-auto px-6 py-12 space-y-12">
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#D7CEBC] text-[#2F3523]">
        <div className="relative">
          {/* Pulsing artisan-style loader */}
          <div className="w-24 h-24 rounded-[2rem] bg-[#2F3523]/5 flex items-center justify-center border border-[#2F3523]/10 animate-pulse">
            <Loader2 className="animate-spin opacity-40" size={40} strokeWidth={1} />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-black tracking-tighter italic mb-2">Curating <span className="opacity-40">Messages</span></h2>
        </div>
      </div>
      </main>
  );

  return (
    <div className="min-h-screen bg-[#D7CEBC] text-[#2F3523]">
      <main className="w-full ml-36 mx-auto px-6 py-12 space-y-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#2F3523]/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 opacity-60">
              <MessageSquare size={14} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-black">
                Support Inbox
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Messages{" "}
            </h1>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-[#2F3523]/5 rounded-full border border-[#2F3523]/10">
            <ShieldCheck size={14} className="opacity-60" />
            <span className="text-xs font-bold opacity-60 uppercase tracking-widest">
              {messages.length} Inquiries
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="grid gap-6">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className="group relative bg-white/30 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] hover:bg-white/40 transition-all shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-[#2F3523] text-[#D7CEBC] flex items-center justify-center shadow-xl">
                      <User size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="opacity-40" />
                        <h3 className="font-black text-lg tracking-tight">
                          {msg.email}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mt-2 opacity-40">
                        <Clock size={12} />
                       {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-8 p-6 bg-[#2F3523]/5 rounded-[2rem] border border-[#2F3523]/5 relative overflow-hidden">
                  <p className="text-md leading-relaxed font-medium opacity-90 relative z-10">
                    "{msg.content}"
                  </p>
                  <MessageSquare
                    className="absolute -right-4 -bottom-4 text-[#2F3523]/5 rotate-12"
                    size={100}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-white/10 rounded-[3rem] border-2 border-dashed border-[#2F3523]/10">
              <MessageSquare size={48} className="opacity-20 mb-4" />
              <p className="text-sm font-black opacity-30 uppercase tracking-[0.4em]">
                The inbox is empty
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;