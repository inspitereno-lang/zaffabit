import React from "react";
import { 
  Calendar, 
  Activity, 
  AlertTriangle, 
  Users, 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

export const ActivityLogsView: React.FC = () => {
  const logs = [
    {
      initials: "SJ",
      name: "Sarah Jenkins",
      email: "s.jenkins@userflow.io",
      action: "Update Configuration",
      status: "Success",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dotColor: "bg-emerald-500",
      time: "10m ago",
      connection: "192.168.1.45",
      avatarBg: "bg-rose-100 text-rose-600"
    },
    {
      initials: "MK",
      name: "Marcus Knight",
      email: "knight.m@userflow.io",
      action: "Delete Job ID #4421",
      status: "Warning",
      statusColor: "bg-amber-50 text-amber-600 border-amber-100",
      dotColor: "bg-amber-500",
      time: "4h ago",
      connection: "45.23.112.9",
      avatarBg: "bg-slate-100 text-slate-600"
    },
    {
      initials: "SP",
      name: "System Process",
      email: "system@userflow.io",
      action: "Database Backup",
      status: "Success",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dotColor: "bg-emerald-500",
      time: "1 day ago",
      connection: "Internal",
      avatarBg: "bg-indigo-100 text-indigo-600"
    },
    {
      initials: "AB",
      name: "Alex Bennett",
      email: "alex@userflow.io",
      action: "System Login",
      status: "Success",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dotColor: "bg-emerald-500",
      time: "2 days ago",
      connection: "82.11.45.201",
      avatarBg: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex flex-col text-left gap-1">
          <h1 className="text-[22px] font-bold text-slate-900 font-display">Activity Logs</h1>
          <p className="text-[13px] text-slate-500 font-medium">Monitor real-time system events and administrative actions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Oct 24, 2023 - Oct 31, 2023</span>
        </button>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SYSTEM HEALTH</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">99.9%</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ANOMALIES DETECTED</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">2</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[100px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ACTIVE ADMINS</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-0.5">24</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#6c5ce7]/10 flex items-center justify-center text-[#6c5ce7]">
            <Users className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Filters Row */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-4 bg-slate-50/50">
          
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">User</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search user..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-medium text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-[180px]">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Role</label>
            <div className="relative">
              <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none cursor-pointer">
                <option>All Roles</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-[180px]">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Action Type</label>
            <div className="relative">
              <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none cursor-pointer">
                <option>All Actions</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-[180px]">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Status</label>
            <div className="relative">
              <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none cursor-pointer">
                <option>All Status</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">USER</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">ACTION</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">STATUS</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">TIME</th>
                <th className="py-3.5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">CONNECTION</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="border-b border-slate-100/60 hover:bg-slate-50/50 transition-colors last:border-b-0">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${log.avatarBg}`}>
                        {log.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-slate-800">{log.name}</span>
                        <span className="text-[11px] font-medium text-slate-500">{log.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-semibold text-slate-700">{log.action}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold flex items-center gap-1.5 w-max tracking-wide ${log.statusColor}`}>
                      <span className={`w-1 h-1 rounded-full ${log.dotColor}`}></span>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[12px] font-medium text-slate-500">{log.time}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[13px] font-mono font-medium text-slate-600">{log.connection}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <span className="text-[12px] text-slate-500 font-medium ml-2">Show 1-4 of 32</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-slate-600 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
