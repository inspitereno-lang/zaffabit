import React, { useState } from "react";
import { 
  FileText, 
  Clock, 
  Calendar, 
  Download, 
  RefreshCw, 
  ChevronDown,
  ArrowRight,
  Check
} from "lucide-react";

export const ExportDataView: React.FC = () => {
  const [dataTypes, setDataTypes] = useState({
    users: true,
    transactions: true,
    revenue: false,
    system: false
  });
  
  const [fileFormat, setFileFormat] = useState("CSV");

  const history = [
    {
      filename: "User_Activity_Log_Q2.csv",
      type: "CSV",
      date: "Jun 14, 2024 - 10:45 AM",
      size: "4.2 MB",
      status: "Ready",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      action: "download"
    },
    {
      filename: "Revenue_Projection_2024.xlsx",
      type: "XLSX",
      date: "Jun 12, 2024 - 03:22 PM",
      size: "12.8 MB",
      status: "Processing",
      statusColor: "bg-[#6c5ce7]/10 text-[#6c5ce7] border-[#6c5ce7]/20",
      action: "disabled"
    },
    {
      filename: "Quarterly_Audit_Final.pdf",
      type: "PDF",
      date: "Jun 01, 2024 - 09:00 AM",
      size: "8.1 MB",
      status: "Expired",
      statusColor: "bg-rose-50 text-rose-600 border-rose-100",
      action: "regenerate"
    }
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1200px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-slate-900 font-display">Export data</h1>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Storage */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[120px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Storage Used</span>
            <div className="flex items-baseline gap-1 mt-1">
              <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">1.24</h3>
              <span className="text-[13px] font-bold text-slate-500">GB</span>
            </div>
            <span className="text-[11px] font-semibold text-[#6c5ce7] flex items-center gap-1 mt-1">
              <TrendingUpIcon /> 12% from last month
            </span>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
              <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[#6c5ce7]" strokeDasharray="150.8" strokeDashoffset={150.8 - (150.8 * 0.75)} strokeLinecap="round" />
            </svg>
            <span className="absolute text-[10px] font-bold text-slate-800">75%</span>
          </div>
        </div>

        {/* Reports Generated */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[120px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Reports Generated</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-1">42</h3>
            <span className="text-[11px] font-semibold text-slate-500 mt-1">
              Past 30 days
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#6c5ce7]/10 flex items-center justify-center text-[#6c5ce7]">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Next Auto-Export */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between h-[120px]">
          <div className="flex flex-col h-full justify-center gap-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Next Auto-Export</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display mt-1">Jun 24</h3>
            <span className="text-[11px] font-semibold text-slate-500 mt-1">
              02:00 AM UTC
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Configure Export */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-[18px] font-bold text-slate-900 font-display">Configure Export</h3>
          <p className="text-[13px] text-slate-500 font-medium mt-1">Select the data parameters for your report generation.</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left: Data Types */}
          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">1. Select Data Types</span>
            <div className="flex flex-col gap-3.5 mt-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-colors ${dataTypes.users ? 'bg-[#6c5ce7] border-[#6c5ce7]' : 'border-slate-300 group-hover:border-[#6c5ce7]'}`}>
                  {dataTypes.users && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <input type="checkbox" className="hidden" checked={dataTypes.users} onChange={() => setDataTypes({...dataTypes, users: !dataTypes.users})} />
                <span className="text-[13px] font-medium text-slate-700">Users & Accounts</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-colors ${dataTypes.transactions ? 'bg-[#6c5ce7] border-[#6c5ce7]' : 'border-slate-300 group-hover:border-[#6c5ce7]'}`}>
                  {dataTypes.transactions && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <input type="checkbox" className="hidden" checked={dataTypes.transactions} onChange={() => setDataTypes({...dataTypes, transactions: !dataTypes.transactions})} />
                <span className="text-[13px] font-medium text-slate-700">Transactions</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-colors ${dataTypes.revenue ? 'bg-[#6c5ce7] border-[#6c5ce7]' : 'border-slate-300 group-hover:border-[#6c5ce7]'}`}>
                  {dataTypes.revenue && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <input type="checkbox" className="hidden" checked={dataTypes.revenue} onChange={() => setDataTypes({...dataTypes, revenue: !dataTypes.revenue})} />
                <span className="text-[13px] font-medium text-slate-700">Revenue Analytics</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-colors ${dataTypes.system ? 'bg-[#6c5ce7] border-[#6c5ce7]' : 'border-slate-300 group-hover:border-[#6c5ce7]'}`}>
                  {dataTypes.system && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                <input type="checkbox" className="hidden" checked={dataTypes.system} onChange={() => setDataTypes({...dataTypes, system: !dataTypes.system})} />
                <span className="text-[13px] font-medium text-slate-700">System Logs</span>
              </label>
            </div>
          </div>

          {/* Right: Format & Date */}
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">2. File Format</span>
              <div className="flex items-center gap-0 bg-slate-50 border border-slate-200 rounded-lg p-1 w-max mt-1">
                {["CSV", "XLSX", "PDF"].map((fmt) => (
                  <button 
                    key={fmt}
                    onClick={() => setFileFormat(fmt)}
                    className={`px-6 py-1.5 rounded-md text-[12px] font-bold transition-all ${
                      fileFormat === fmt 
                        ? 'bg-white text-[#6c5ce7] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">3. Date Range</span>
              <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-[13px] text-slate-700 font-medium cursor-pointer hover:border-slate-300 transition-colors mt-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Jun 01, 2024 - Jun 15, 2024</span>
              </div>
            </div>

          </div>

        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <span className="text-[12px] font-medium text-slate-500">Estimated size: ~12.4 MB</span>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[13px] font-bold transition-all cursor-pointer shadow-sm">
            <Download className="w-4 h-4" />
            <span>Generate Export</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Download History */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900 font-display">Download History</h3>
            <p className="text-[12px] text-slate-500 font-medium mt-1">Access and manage your recently generated reports.</p>
          </div>
          <button className="text-[13px] font-bold text-[#6c5ce7] hover:underline cursor-pointer">
            Clear History
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider">FILENAME</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider">TYPE</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider">GENERATED DATE</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider">SIZE</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider">STATUS</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, idx) => (
                <tr key={idx} className="border-t border-slate-100/60 hover:bg-slate-50/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-700">
                      <FileText className="w-4 h-4 text-[#6c5ce7]" />
                      {item.filename}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[12px] font-semibold text-slate-600">{item.type}</td>
                  <td className="py-4 px-6 text-[12px] font-medium text-slate-500">{item.date}</td>
                  <td className="py-4 px-6 text-[12px] font-semibold text-slate-600">{item.size}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold flex items-center gap-1.5 w-max ${item.statusColor}`}>
                      {item.status === 'Processing' && <span className="w-1.5 h-1.5 rounded-full bg-[#6c5ce7] animate-pulse"></span>}
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {item.action === 'download' && (
                      <button className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors inline-block cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    {item.action === 'disabled' && (
                      <button className="p-1.5 text-slate-300 cursor-not-allowed inline-block" disabled>
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                    {item.action === 'regenerate' && (
                      <button className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-100 rounded transition-colors cursor-pointer ml-auto">
                        <RefreshCw className="w-3 h-3" />
                        Re-generate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center justify-center bg-white">
          <button className="flex items-center gap-1 text-[12px] font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
            View More History <ChevronDown className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

// Mini trending arrow to exactly match the design
const TrendingUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);
