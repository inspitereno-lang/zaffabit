import React from "react";
import { 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Download,
  Video,
  FileText,
  Eye
} from "lucide-react";

export const SosIncidentsView: React.FC = () => {
  const incidents = [
    {
      time: "Today, 10:42 AM",
      type: "SOS Alarm Triggered",
      location: "Financial Dist. Block C",
      priority: "CRITICAL",
      status: "Active",
      avatar: "bg-indigo-100 text-indigo-600",
      initials: "JD",
      actionIcon: <Video className="w-3.5 h-3.5" />,
      actionText: "View Live",
      actionColor: "text-rose-600 bg-rose-50 hover:bg-rose-100"
    },
    {
      time: "Today, 09:58 AM",
      type: "Routine Patrol Shift",
      location: "Central Park North",
      priority: "LOW",
      status: "Resolved",
      avatar: "bg-emerald-100 text-emerald-600",
      initials: "MK",
      actionIcon: <FileText className="w-3.5 h-3.5" />,
      actionText: "Report",
      actionColor: "text-slate-600 bg-slate-100 hover:bg-slate-200"
    },
    {
      time: "Today, 09:12 AM",
      type: "Access Denied (3x)",
      location: "Research Lab A",
      priority: "MEDIUM",
      status: "Resolved",
      avatar: "bg-slate-200 text-slate-600",
      initials: "System",
      actionIcon: <Eye className="w-3.5 h-3.5" />,
      actionText: "Details",
      actionColor: "text-slate-600 bg-slate-100 hover:bg-slate-200"
    }
  ];

  const alerts = [
    {
      priority: "CRITICAL",
      time: "02M AGO",
      title: "SOS: Unauthorized Entry",
      body: "Zone 4 Main Entrance. Panic button triggered by Officer Miller.",
      color: "text-rose-600 bg-rose-50 border-rose-100",
      badgeColor: "bg-rose-500 text-white"
    },
    {
      priority: "HIGH",
      time: "15M AGO",
      title: "Sensor Anomaly: Heat Map",
      body: "Server Room B temperature exceeding safe threshold. Equipment malfunction suspected.",
      color: "text-orange-600 bg-orange-50 border-orange-100",
      badgeColor: "bg-orange-500 text-white"
    },
    {
      priority: "MEDIUM",
      time: "32M AGO",
      title: "System Maintenance",
      body: "Firmware update scheduled for Sector A Gateways",
      color: "text-amber-600 bg-amber-50 border-amber-100",
      badgeColor: "bg-amber-500 text-white"
    }
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left gap-1">
          <h1 className="text-[22px] font-bold text-slate-900 font-display">Incident Command</h1>
          <p className="text-[13px] text-slate-500 font-medium">
            Real-time monitoring of 12 active SOS signals across Greater Metro area
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-[13px] font-bold hover:bg-slate-50 transition-all cursor-pointer">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[13px] font-bold transition-all cursor-pointer shadow-sm">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Active SOS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500">
              <AlertTriangle className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active SOS</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">03</h3>
          </div>
        </div>

        {/* On-Duty Agents */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
              <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">On-Duty Agents</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">142</h3>
          </div>
        </div>

        {/* Avg Response */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <Clock className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Response</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">1.8m</h3>
          </div>
        </div>

        {/* Resolved (24h) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Resolved (24h)</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">249</h3>
          </div>
        </div>

      </div>

      {/* Grid Layout (2/3 + 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Global Incident Log */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden flex flex-col flex-1">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-900 font-display">Global Incident Log</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">TIMESTAMP</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">INCIDENT TYPE</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">LOCATION</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">PRIORITY</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">STATUS</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">ASSIGNED</th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((inc, i) => (
                    <tr key={i} className="border-t border-slate-100/60 hover:bg-slate-50/30 transition-colors">
                      <td className="py-3 px-4 text-[12px] font-semibold text-slate-500 whitespace-nowrap">{inc.time}</td>
                      <td className="py-3 px-4 text-[13px] font-bold text-slate-800">{inc.type}</td>
                      <td className="py-3 px-4 text-[12px] font-medium text-slate-500">{inc.location}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          inc.priority === "CRITICAL" ? "bg-rose-100 text-rose-600" :
                          inc.priority === "MEDIUM" ? "bg-amber-100 text-amber-600" :
                          "bg-slate-100 text-slate-500"
                        }`}>
                          {inc.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
                          inc.status === "Active" ? "bg-[#6c5ce7]/10 text-[#6c5ce7]" : "bg-emerald-50 text-emerald-600"
                        }`}>
                          {inc.status === "Active" && <span className="w-1.5 h-1.5 rounded-full bg-[#6c5ce7] animate-pulse"></span>}
                          {inc.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className={`w-7 h-7 rounded-full inline-flex items-center justify-center text-[10px] font-bold ${inc.avatar}`}>
                          {inc.initials === "System" ? "SYS" : inc.initials}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${inc.actionColor}`}>
                          {inc.actionIcon}
                          <span>{inc.actionText}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between mt-auto">
              <span className="text-[11px] text-slate-500 font-medium">Showing 1-10 of 423 incidents</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold text-slate-400 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer transition-colors">Previous</button>
                <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer transition-colors shadow-sm">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Priority Alerts */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[15px] font-bold text-slate-900 font-display">Priority Alerts</h3>
              <span className="px-2 py-0.5 rounded border border-rose-200 bg-rose-50 text-rose-600 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                LIVE
              </span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {alerts.map((alert, idx) => (
                <div key={idx} className={`p-4 rounded-xl border relative overflow-hidden ${alert.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${alert.badgeColor}`}>
                      {alert.priority}
                    </span>
                    <span className="text-[10px] font-bold opacity-60">•</span>
                    <span className="text-[10px] font-bold opacity-60 uppercase tracking-wider">{alert.time}</span>
                  </div>
                  <h4 className="text-[14px] font-bold mb-1">{alert.title}</h4>
                  <p className="text-[12px] opacity-80 font-medium leading-relaxed">
                    {alert.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
