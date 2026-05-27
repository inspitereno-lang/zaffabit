import React from "react";
import { Mail, UserPlus, Banknote, Clock, Download, ChevronLeft, ChevronRight } from "lucide-react";

export const ReferralsView: React.FC = () => {
  const activities = [
    { email: "james.chen@example.com", date: "Oct 24, 2023", status: "Completed" },
    { email: "lisa.v@workplace.co", date: "Oct 23, 2023", status: "Pending" },
    { email: "marcus.t@gmail.com", date: "Oct 22, 2023", status: "Completed" },
    { email: "rebecca.lee@corp.it", date: "Oct 20, 2023", status: "Expired" },
    { email: "sam.p@dev.io", date: "Oct 19, 2023", status: "Completed" },
  ];

  const leaderboard = [
    {
      id: 1,
      name: "Jordan Smith",
      refs: 142,
      earned: "$3,550",
      initials: "JS",
      color: "blue",
      badgeColor: "bg-blue-600",
      borderColor: "border-blue-200",
    },
    {
      id: 2,
      name: "Leo Valdes",
      refs: 98,
      earned: "$2,450",
      initials: "LV",
      color: "purple",
      badgeColor: "bg-[#6c5ce7]",
      borderColor: "border-[#6c5ce7]/30",
    },
    {
      id: 3,
      name: "Maya Lin",
      refs: 76,
      earned: "$1,900",
      initials: "ML",
      color: "orange",
      badgeColor: "bg-orange-500",
      borderColor: "border-orange-200",
    },
    {
      id: 4,
      name: "Ben Kessler",
      refs: 54,
      earned: "$1,350",
      initials: "BK",
      color: "slate",
    },
    {
      id: 5,
      name: "Sasha Reed",
      refs: 42,
      earned: "$1,050",
      initials: "SR",
      color: "slate",
    },
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Page Title Header */}
      <div className="flex flex-col text-left gap-1">
        <h1 className="text-[22px] font-bold text-slate-900 font-display">Referrals</h1>
        <p className="text-[13px] text-slate-500 font-medium">
          Monitor all referral activities across the platform.
        </p>
      </div>

      {/* ==================== 4 KPI CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Invites */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Mail className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 12%
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-medium text-slate-500">Total Invites</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">
              2,450
            </h3>
          </div>
        </div>

        {/* Successful Conversions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
              <UserPlus className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 flex items-center gap-0.5">
              34% Rate
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-medium text-slate-500">Successful Conversions</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">
              840
            </h3>
          </div>
        </div>

        {/* Rewards Issued */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Banknote className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 8%
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-medium text-slate-500">Rewards Issued</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">
              $12,600
            </h3>
          </div>
        </div>

        {/* Pending Referrals */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500">
              <Clock className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-medium text-slate-500">Pending Referrals</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">
              145
            </h3>
          </div>
        </div>

      </div>

      {/* ==================== DOUBLE SPLIT VIEW LAYOUT ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Left Hand: Referral Activity Table (3/5 width) */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden h-full flex flex-col">
            
            <div className="p-5 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-900 font-display">Referral Activity</h3>
              <button className="flex items-center gap-1.5 text-[#6c5ce7] hover:text-[#5b4cd8] text-xs font-semibold cursor-pointer">
                <span>Export Report</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="py-3.5 px-5 text-[11px] font-semibold text-slate-500">Referred User</th>
                    <th className="py-3.5 px-5 text-[11px] font-semibold text-slate-500">Date</th>
                    <th className="py-3.5 px-5 text-[11px] font-semibold text-slate-500 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((item, idx) => (
                    <tr key={idx} className="border-t border-slate-100/60 hover:bg-slate-50/30">
                      <td className="py-4 px-5">
                        <span className="text-[13px] font-medium text-slate-800">{item.email}</span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-[13px] text-slate-500 font-medium">{item.date}</span>
                      </td>
                      <td className="py-4 px-5 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center leading-none ${
                          item.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status === "Pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-500"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Showing 5 of 840 conversions
              </span>
              <div className="flex items-center gap-1.5">
                <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 cursor-pointer">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Hand: Top Referrers Leaderboard (2/5 width) */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] p-6 flex flex-col h-full">
            
            <div className="flex flex-col text-left mb-6">
              <h3 className="text-[15px] font-bold text-slate-900 font-display">Top Referrers</h3>
              <p className="text-[11px] text-slate-500 font-medium">Ranked by successful referrals</p>
            </div>

            <div className="space-y-5 flex-1">
              {leaderboard.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    
                    {/* Avatar with rank badge */}
                    <div className="relative">
                      {item.id <= 3 ? (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-dashed ${item.borderColor} bg-white text-xs font-semibold text-slate-600`}>
                          <span className="opacity-0">{item.initials}</span>
                          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${item.badgeColor} text-white flex items-center justify-center text-[9px] font-bold border border-white`}>
                            {item.id}
                          </div>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-xs font-bold text-slate-600">
                          {item.initials}
                        </div>
                      )}
                      
                      {/* Avatar initial text overlay (so we can see dashed border clearly) */}
                      {item.id <= 3 && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-500">
                          {item.initials}
                        </div>
                      )}
                    </div>
                    
                    {/* User Info */}
                    <div className="flex flex-col text-left">
                      <span className="text-[13px] font-bold text-slate-800">{item.name}</span>
                      <span className="text-[11px] text-slate-500 font-medium">{item.refs} referrals</span>
                    </div>

                  </div>

                  {/* Earnings */}
                  <div className="flex flex-col text-right">
                    <span className={`text-[13px] font-bold ${item.id <= 3 ? "text-[#6c5ce7]" : "text-slate-800"}`}>
                      {item.earned}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Earned</span>
                  </div>

                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2.5 rounded-lg border border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer">
              View Full Leaderboard
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
