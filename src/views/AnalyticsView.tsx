import React from "react";
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, Activity } from "lucide-react";

export const AnalyticsView: React.FC = () => {
  // Mock Data for Charts
  const retentionData = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 78 },
    { name: "Mar", value: 82 },
    { name: "Apr", value: 75 },
    { name: "May", value: 85 },
    { name: "Jun", value: 92 },
    { name: "Jul", value: 88 },
  ];

  const regionalData = [
    { name: "North America", value: 42, fill: "#6c5ce7" },
    { name: "Europe", value: 28, fill: "#a8a5e6" },
    { name: "Asia Pacific", value: 18, fill: "#c4c1f0" },
    { name: "South America", value: 8, fill: "#e0dffa" },
    { name: "Other", value: 4, fill: "#f0efff" },
  ];

  const categoryData = [
    { name: "Enterprise SaaS", value: 186294, color: "#6c5ce7" },
    { name: "Pro Individual", value: 42108, color: "#00b894" },
    { name: "Add-ons", value: 19990, color: "#fdcb6e" },
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-slate-900 font-display">Analytics</h1>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between h-[130px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" strokeWidth={3} />
              25%
            </span>
          </div>
          <div className="flex flex-col mt-2">
            <h3 className="text-[28px] font-bold text-slate-900 tracking-tight font-display">
              $248,392.00
            </h3>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between h-[130px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Users className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" strokeWidth={3} />
              8.2%
            </span>
          </div>
          <div className="flex flex-col mt-2">
            <h3 className="text-[28px] font-bold text-slate-900 tracking-tight font-display">
              14,822
            </h3>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between h-[130px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <Activity className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" strokeWidth={3} />
              2.4%
            </span>
          </div>
          <div className="flex flex-col mt-2">
            <h3 className="text-[28px] font-bold text-slate-900 tracking-tight font-display">
              1.84%
            </h3>
          </div>
        </div>

      </div>

      {/* Charts Grid Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Customer Retention Analysis */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[15px] font-bold text-slate-900 font-display">Customer Retention Analysis</h3>
            <span className="text-[12px] font-bold text-[#6c5ce7] cursor-pointer hover:underline">Cohort View</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retentionData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6c5ce7" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional User Density */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[15px] font-bold text-slate-900 font-display">Regional User Density</h3>
            <span className="px-2 py-0.5 rounded border border-rose-200 bg-rose-50 text-rose-600 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              LIVE FEED
            </span>
          </div>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }} width={100} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            
            {/* Overlay specific highlighted text from OCR */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm border border-slate-100 shadow-sm rounded-lg p-3 pointer-events-none">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider mb-1">Top Region</span>
              <span className="text-[15px] font-bold text-[#6c5ce7]">North America 42%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue by Category (takes 1/3, matching standard layout) */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] p-5 lg:col-span-1">
          <h3 className="text-[15px] font-bold text-slate-900 font-display mb-4">Revenue by Category</h3>
          
          <div className="flex flex-col items-center">
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Inner donut text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[20px] font-bold text-slate-900 leading-none">$248k</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Total</span>
              </div>
            </div>

            {/* Custom Legend to match screenshot EXACTLY */}
            <div className="w-full flex flex-col gap-3 mt-4">
              {categoryData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-[13px] font-semibold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-[13px] font-bold text-slate-900">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty space filler for layout stability if user provided only partial image, or additional placeholders */}
        <div className="bg-slate-50/50 border border-slate-100 border-dashed rounded-2xl p-5 lg:col-span-2 flex items-center justify-center text-slate-400 text-sm font-semibold">
          Additional analytics modules can be placed here
        </div>

      </div>

    </div>
  );
};
