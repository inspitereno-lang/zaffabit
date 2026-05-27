import React from "react";
import { Plus, Users, Megaphone, MousePointerClick, Target } from "lucide-react";

export const CampaignsView: React.FC = () => {
  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Page Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left gap-0.5">
          <h1 className="text-xl font-bold text-slate-900 font-display">Campaigns</h1>
          <p className="text-[13px] text-slate-500 font-medium">
            Monitor and manage your marketing performance.
          </p>
        </div>

        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[13px] font-semibold transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* ==================== 4 KPI CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Reach */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left h-[120px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL REACH</span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
              <Users className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
            1.2M
          </h3>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left h-[120px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE CAMPAIGNS</span>
            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-500">
              <Megaphone className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
            24
          </h3>
        </div>

        {/* Avg CTR */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left h-[120px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">AVG. CTR</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <MousePointerClick className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
            4.82%
          </h3>
        </div>

        {/* Conversions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left h-[120px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL CONVERSIONS</span>
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Target className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight font-display">
              12.4k
            </h3>
            <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600">
              14%
            </span>
          </div>
        </div>

      </div>

      {/* ==================== RECENT ACTIVITY TABLE ==================== */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden text-left mt-2">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 font-display">Recent Activity</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/20">
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 tracking-wider">ACTION</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 tracking-wider">USER</th>
                <th className="py-3.5 px-6 text-[11px] font-bold text-slate-400 tracking-wider">DATE</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Row 1 */}
              <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                <td className="py-4 px-6">
                  <span className="text-[13px] font-medium text-slate-700">Updated bid strategy to "Max Conversions"</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold">
                      wp
                    </div>
                    <span className="text-[13px] font-medium text-slate-700">Jane Doe</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[13px] text-slate-500 font-medium">
                  2 mins ago
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                <td className="py-4 px-6">
                  <span className="text-[13px] font-medium text-slate-700">Uploaded 12 new creative assets</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                      MR
                    </div>
                    <span className="text-[13px] font-medium text-slate-700">Mike Ross</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[13px] text-slate-500 font-medium">
                  45 mins ago
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                <td className="py-4 px-6">
                  <span className="text-[13px] font-medium text-slate-700">Campaign paused due to budget cap</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                      @
                    </div>
                    <span className="text-[13px] font-medium text-slate-700">System Bot</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[13px] text-slate-500 font-medium">
                  2 hours ago
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full py-2.5 text-[13px] font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer">
            View all activity
          </button>
        </div>

      </div>

    </div>
  );
};
