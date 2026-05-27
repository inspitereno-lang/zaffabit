import React, { useState } from "react";
import { MoreVertical, Send, Paperclip, CheckCircle2 } from "lucide-react";

export const SupportTicketView: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tickets = [
    {
      id: "#TK-8821",
      user: "Jordan Smith",
      time: "2m ago",
      title: "API integration failing on production endpoint",
      priority: "Urgent",
      active: true,
    },
    {
      id: "#TK-8819",
      user: "Marcus Aurelius",
      time: "15m ago",
      title: "Billing cycle update for Q3 Enterprise",
      priority: "High",
      active: false,
    },
    {
      id: "#TK-8817",
      user: "Sarah Connor",
      time: "1h ago",
      title: "Password reset link not arriving",
      priority: "Medium",
      active: false,
    },
    {
      id: "#TK-8815",
      user: "Jane Lynch",
      time: "3h ago",
      title: "Documentation typo in v2.4 webhooks",
      priority: "Low",
      active: false,
    },
  ];

  return (
    <div className="p-8 h-full max-w-[1400px] mx-auto w-full flex flex-col">
      
      {/* Page Title Header */}
      <div className="flex flex-col text-left mb-6">
        <h1 className="text-[22px] font-bold text-slate-900 font-display">Tickets</h1>
        <p className="text-[13px] text-slate-500 font-medium">
          Active Queue
        </p>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden h-[calc(100vh-160px)]">
        
        {/* Left Hand: Ticket Queue (1/3 width) */}
        <div className="w-[380px] bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] flex flex-col overflow-hidden shrink-0">
          
          <div className="p-4 border-b border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                All (24)
              </button>
              <button
                onClick={() => setActiveTab("closed")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === "closed" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                Closed
              </button>
              <button
                onClick={() => setActiveTab("urgent")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === "urgent" ? "bg-rose-500 text-white" : "bg-rose-50 text-rose-500 hover:bg-rose-100"
                }`}
              >
                Urgent
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-sidebar-scroll">
            {tickets.map((ticket, idx) => (
              <div 
                key={idx} 
                className={`p-4 border-b border-slate-50 flex flex-col gap-2 cursor-pointer transition-colors ${
                  ticket.active ? "bg-indigo-50/40 border-l-2 border-l-[#6c5ce7]" : "hover:bg-slate-50 border-l-2 border-l-transparent"
                }`}
              >
                <div className="flex items-center justify-between text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">{ticket.id}</span>
                    <span className="text-[11px] font-semibold text-slate-400">•</span>
                    <span className="text-[11px] font-semibold text-slate-400">{ticket.time}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-bold uppercase tracking-wider ${
                    ticket.priority === "Urgent" ? "bg-rose-100 text-rose-600" :
                    ticket.priority === "High" ? "bg-orange-100 text-orange-600" :
                    ticket.priority === "Medium" ? "bg-amber-100 text-amber-600" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                
                <div className="flex flex-col text-left gap-1">
                  <span className="text-[13px] font-bold text-slate-800">{ticket.user}</span>
                  <p className="text-[12px] font-medium text-slate-600 line-clamp-1">{ticket.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hand: Ticket Thread (2/3 width) */}
        <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] flex flex-col overflow-hidden">
          
          {/* Thread Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex flex-col text-left gap-1.5">
              <h2 className="text-[16px] font-bold text-slate-900 font-display">
                API integration failing on production endpoint
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#6c5ce7]">#TK-8821</span>
                <span className="text-[10px] text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">Jordan Smith (Enterprise Tier)</span>
                <span className="text-[10px] text-slate-300">•</span>
                <span className="text-xs font-semibold text-slate-500">Assigned to Alex Rivera</span>
              </div>
            </div>
            
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 cursor-pointer transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Thread Messages */}
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30 flex flex-col gap-6 custom-sidebar-scroll">
            
            {/* Customer Message 1 */}
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                JS
              </div>
              <div className="flex flex-col text-left flex-1 max-w-[85%]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[13px] font-bold text-slate-800">Jordan Smith</span>
                  <span className="text-[11px] font-semibold text-slate-400">10:42 AM</span>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-[13px] text-slate-700 leading-relaxed font-medium">
                  We're seeing intermittent 502 errors when hitting the <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">/v1/transactions/sync</code> endpoint in our production environment. This started about 20 minutes ago. Our logs show a spike in timeout requests specifically for the AWS us-east-1 region.
                </div>
              </div>
            </div>

            {/* System Event */}
            <div className="flex items-center justify-center py-2 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative bg-[#f5f7fb] px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Assigned to Alex Rivera</span>
              </div>
            </div>

            {/* Agent Reply */}
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                AR
              </div>
              <div className="flex flex-col text-right flex-1 max-w-[85%] items-end">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[13px] font-bold text-slate-800">Alex Rivera (Support Engineer)</span>
                  <span className="text-[11px] font-semibold text-slate-400">10:45 AM</span>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl rounded-tr-none shadow-sm text-[13px] text-slate-700 leading-relaxed font-medium text-left">
                  Hi Jordan, I'm looking into this now. You're correct, we have a reported latency issue in us-east-1 affecting the transaction microservice. Our devops team is already rerouting traffic. Can you confirm if you're seeing any improvement in the last 2 minutes?
                </div>
              </div>
            </div>

            {/* Customer Reply */}
            <div className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                JS
              </div>
              <div className="flex flex-col text-left flex-1 max-w-[85%]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[13px] font-bold text-slate-800">Jordan Smith</span>
                  <span className="text-[11px] font-semibold text-slate-400">10:47 AM</span>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm text-[13px] text-slate-700 leading-relaxed font-medium">
                  Still seeing some 502s, but the frequency has decreased significantly. I'll keep monitoring. Do you have an ETA for a full fix? We have a high-priority batch sync scheduled for 11:30 AM.
                </div>
              </div>
            </div>

          </div>

          {/* Thread Reply Input Box */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-end gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 pl-4 focus-within:border-[#6c5ce7] focus-within:ring-1 focus-within:ring-[#6c5ce7] transition-all">
              
              <textarea 
                rows={2}
                placeholder="Write your reply to Jordan..."
                className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[13px] text-slate-800 placeholder:text-slate-400 resize-none py-2"
              ></textarea>
              
              <div className="flex items-center gap-2 pb-1 shrink-0">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                  <Paperclip className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1.5 bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer transition-colors">
                  <span>Send Reply</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
