import React from "react";
import { 
  Users, 
  Activity, 
  Star, 
  Search, 
  ChevronDown, 
  Plus,
  MoreVertical
} from "lucide-react";

export const MaidPartnersView: React.FC = () => {
  const partners = [
    {
      initials: "RK",
      name: "Reshma K.",
      phone: "+91 94462 89012",
      specialization: "Deep Clean, HVAC",
      status: "Active Now",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dotColor: "bg-emerald-500",
      jobs: "342",
      rating: "4.8",
      avatarBg: "bg-[#6c5ce7]/10 text-[#6c5ce7]"
    },
    {
      initials: "AM",
      name: "Anjali M.",
      phone: "+91 99955 77661",
      specialization: "Standard Clean",
      status: "Offline",
      statusColor: "bg-slate-50 text-slate-500 border-slate-200",
      dotColor: "bg-slate-400",
      jobs: "128",
      rating: "4.6",
      avatarBg: "bg-amber-100 text-amber-600"
    },
    {
      initials: "DS",
      name: "Devi S.",
      phone: "+91 98450 11223",
      specialization: "Dish Washing",
      status: "Active Now",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dotColor: "bg-emerald-500",
      jobs: "512",
      rating: "5.0",
      avatarBg: "bg-rose-100 text-rose-600"
    },
    {
      initials: "LP",
      name: "Lakshmi P.",
      phone: "+91 90610 33445",
      specialization: "Window Washing",
      status: "On Leave",
      statusColor: "bg-amber-50 text-amber-600 border-amber-100",
      dotColor: "bg-amber-500",
      jobs: "215",
      rating: "4.7",
      avatarBg: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex flex-col text-left gap-1">
          <h1 className="text-[22px] font-bold text-slate-900 font-display">Maid Partners</h1>
          <p className="text-[13px] text-slate-500 font-medium">Manage and monitor registered service professionals.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[13px] font-bold transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add New Partner</span>
        </button>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">TOTAL PARTNERS</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">142</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-[#6c5ce7]">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ACTIVE NOW</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">38</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AVERAGE RATING</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">4.8</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Star className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Filters Row */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          
          <div className="flex flex-col gap-1.5 w-[300px]">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Search Partner</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search name, phone..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1.5 w-[160px]">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Specialization</label>
              <div className="relative">
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none cursor-pointer">
                  <option>All Skills</option>
                  <option>Deep Clean</option>
                  <option>HVAC</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-[160px]">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
              <div className="relative">
                <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none cursor-pointer">
                  <option>All Status</option>
                  <option>Active Now</option>
                  <option>Offline</option>
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
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">PARTNER NAME</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">SPECIALIZATION</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">STATUS</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">COMPLETED JOBS</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">RATING</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner, idx) => (
                <tr key={idx} className="border-b border-slate-100/60 hover:bg-slate-50/50 transition-colors last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${partner.avatarBg}`}>
                        {partner.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-800">{partner.name}</span>
                        <span className="text-[12px] font-medium text-slate-500">{partner.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">{partner.specialization}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1.5 w-max tracking-wide ${partner.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${partner.dotColor}`}></span>
                      {partner.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-bold text-slate-700">{partner.jobs}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-[13px] font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      {partner.rating}
                    </div>
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
          <span className="text-[12px] text-slate-500 font-medium ml-2">Showing 4 of 142 partners</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-[12px] font-semibold text-slate-400 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors">Previous</button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold bg-[#6c5ce7] text-white">1</button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold text-slate-600 hover:bg-slate-50">2</button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold text-slate-600 hover:bg-slate-50">3</button>
            <button className="px-3 py-1.5 text-[12px] font-semibold text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors">Next</button>
          </div>
        </div>

      </div>

    </div>
  );
};
