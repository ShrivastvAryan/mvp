"use client";

import React, { useState } from 'react';
import { Mail, MessageSquare, Trash2, Clock, User, ShieldCheck } from 'lucide-react';

// Mock Data representing user inquiries
const MOCK_MESSAGES = [
  {
    _id: "1",
    email: "sarah.craft@example.com",
    message: "Hi, I'm interested in the upcoming Pottery Workshop. Is there a discount for group bookings of 5 or more people? Looking forward to your response.",
    createdAt: "2024-05-20T10:30:00Z",
  },
  {
    _id: "2",
    email: "james.woodwork@provider.net",
    message: "I submitted an event for approval yesterday but I don't see it in my dashboard yet. Could you please check if it's still in the queue?",
    createdAt: "2024-05-19T14:45:00Z",
  },
  {
    _id: "3",
    email: "admin.test@artisan.com",
    message: "System alert: New seller registration request from 'The Glass Studio'. Please review their credentials in the seller management tab.",
    createdAt: "2024-05-18T09:00:00Z",
  }
];

const MessagesPage = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#D7CEBC] text-[#2F3523] selection:bg-[#2F3523] selection:text-[#D7CEBC]">
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#2F3523]/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 opacity-60">
              <MessageSquare size={14} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-black">Support Inbox</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">
              User <span className="opacity-50 italic font-medium tracking-normal">Messages</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-[#2F3523]/5 rounded-full border border-[#2F3523]/10">
            <ShieldCheck size={14} className="opacity-60" />
            <span className="text-xs font-bold opacity-60 uppercase tracking-widest">
              {messages.length} Inquiries
            </span>
          </div>
        </div>

        {/* Messages List */}
        <div className="grid gap-6">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div 
                key={msg._id} 
                className="group relative bg-white/30 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] hover:bg-white/40 transition-all shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-[#2F3523] text-[#D7CEBC] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <User size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="opacity-40" />
                        <h3 className="font-black text-lg tracking-tight leading-none">{msg.email}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-2 opacity-40">
                        <Clock size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Received: {new Date(msg.createdAt).toLocaleDateString(undefined, { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="mt-8 p-6 bg-[#2F3523]/5 rounded-[2rem] border border-[#2F3523]/5 relative overflow-hidden">
                  <p className="text-md leading-relaxed font-medium opacity-90 relative z-10">
                    "{msg.message}"
                  </p>
                  {/* Decorative quote icon */}
                  <MessageSquare 
                    className="absolute -right-4 -bottom-4 text-[#2F3523]/5 rotate-12" 
                    size={100} 
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-white/10 rounded-[3rem] border-2 border-dashed border-[#2F3523]/10">
              <div className="p-6 rounded-full bg-[#2F3523]/5 mb-4 text-[#2F3523]/20">
                <MessageSquare size={48} />
              </div>
              <p className="text-sm font-black opacity-30 uppercase tracking-[0.4em]">The inbox is empty</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;