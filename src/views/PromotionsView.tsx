import React from "react";
import { 
  Tag, 
  Users, 
  Banknote, 
  Search, 
  ChevronDown, 
  Plus,
  MoreVertical,
  Ticket
} from "lucide-react";

export const PromotionsView: React.FC = () => {
  const promotions = [
    {
      code: "WELCOME50",
      description: "First-time user discount",
      type: "Percentage",
      discount: "50%",
      status: "Active",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dotColor: "bg-emerald-500",
      redemptions: "1,240 / 5,000",
      expiry: "Dec 31, 2024"
    },
    {
      code: "FESTIVE20",
      description: "Holiday season special",
      type: "Flat Amount",
      discount: "₹200",
      status: "Scheduled",
      statusColor: "bg-[#6c5ce7]/10 text-[#6c5ce7] border-[#6c5ce7]/20",
      dotColor: "bg-[#6c5ce7]",
      redemptions: "0 / 1,000",
      expiry: "Nov 20, 2024"
    },
    {
      code: "SUMMERCLN",
      description: "Summer deep clean promo",
      type: "Percentage",
      discount: "15%",
      status: "Expired",
      statusColor: "bg-rose-50 text-rose-600 border-rose-100",
      dotColor: "bg-rose-500",
      redemptions: "840 / 1,000",
      expiry: "Aug 31, 2023"
    },
    {
      code: "VIPUPGRADE",
      description: "Existing customer upsell",
      type: "Flat Amount",
      discount: "₹500",
      status: "Active",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dotColor: "bg-emerald-500",
      redemptions: "125 / Unlimited",
      expiry: "No Expiry"
    }
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex flex-col text-left gap-1">
          <h1 className="text-[22px] font-bold text-slate-900 font-display">Promotions</h1>
          <p className="text-[13px] text-slate-500 font-medium">Manage active discount codes and promotional offers.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[13px] font-bold transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Create Promotion</span>
        </button>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ACTIVE PROMOTIONS</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">14</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#6c5ce7]">
            <Tag className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL REDEMPTIONS</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">12.4K</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">EST. REVENUE IMPACT</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">₹4.2L</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Banknote className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Filters Row */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          
          <div className="flex flex-col gap-1.5 w-[300px]">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Search Promo</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search code..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1.5 w-[160px]">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Type</label>
              <div className="relative">
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none cursor-pointer">
                  <option>All Types</option>
                  <option>Percentage</option>
                  <option>Flat Amount</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-[160px]">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
              <div className="relative">
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none cursor-pointer">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Expired</option>
                  <option>Scheduled</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">PROMO CODE</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">DISCOUNT</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">STATUS</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">REDEMPTIONS</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">EXPIRY DATE</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo, idx) => (
                <tr key={idx} className="border-b border-slate-100/60 hover:bg-slate-50/50 transition-colors last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 bg-slate-50 border border-slate-200 shrink-0">
                        <Ticket className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-800 font-mono tracking-tight">{promo.code}</span>
                        <span className="text-[12px] font-medium text-slate-500">{promo.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#6c5ce7]">{promo.discount}</span>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">{promo.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1.5 w-max tracking-wide ${promo.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${promo.dotColor}`}></span>
                      {promo.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-bold text-slate-700">{promo.redemptions}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[12px] font-semibold text-slate-600">{promo.expiry}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors inline-block cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <span className="text-[12px] text-slate-500 font-medium ml-2">Showing 4 of 14 promotions</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-[12px] font-semibold text-slate-400 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors">Previous</button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold bg-[#6c5ce7] text-white">1</button>
            <button className="px-3 py-1.5 text-[12px] font-semibold text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors">Next</button>
          </div>
        </div>

      </div>

    </div>
  );
};
