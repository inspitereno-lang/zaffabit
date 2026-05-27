import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";
import { KpiCard } from "../components/KpiCard";
import {
  mockKpiCardsData,
  mockBookingsOverview,
  mockCategoryDistribution,
  mockLiveRequests,
  mockRecentBookings,
  mockEarningsWeekly,
  mockTopMaids,
  mockServicePrices,
  mockAiInsights,
  mockQuickActions,
} from "../data/mockKpiData";

export const DashboardView: React.FC = () => {
  // Local state for dashboard-specific simple Service Pricing Management widget
  const [servicePrices, setServicePrices] = useState(mockServicePrices);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempName, setTempName] = useState("");
  const [tempBasePrice, setTempBasePrice] = useState("");
  const [tempPeakPrice, setTempPeakPrice] = useState("");

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setTempName(servicePrices[index].name);
    setTempBasePrice(servicePrices[index].basePrice);
    setTempPeakPrice(servicePrices[index].peakPrice);
  };

  const handleSave = (index: number) => {
    if (!tempName.trim()) return;
    const updated = [...servicePrices];
    updated[index] = {
      name: tempName,
      basePrice: tempBasePrice.startsWith("₹") ? tempBasePrice : `₹${tempBasePrice}`,
      peakPrice: tempPeakPrice.startsWith("₹") ? tempPeakPrice : `₹${tempPeakPrice}`,
    };
    setServicePrices(updated);
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    const updated = servicePrices.filter((_, i) => i !== index);
    setServicePrices(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleAdd = () => {
    const newService = {
      name: "New Service",
      basePrice: "₹199",
      peakPrice: "₹249",
    };
    const updated = [...servicePrices, newService];
    setServicePrices(updated);
    setEditingIndex(updated.length - 1);
    setTempName(newService.name);
    setTempBasePrice(newService.basePrice);
    setTempPeakPrice(newService.peakPrice);
  };

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
      
      {/* Headline Greeting */}
      <div className="flex flex-col gap-0.5 text-left">
        <h1 className="text-lg font-bold text-slate-900 font-display">Dashboard</h1>
        <p className="text-xs text-slate-400 font-light">
          Welcome back, Anitha! Here's what's happening today.
        </p>
      </div>

      {/* ==================== ROW 1: 6 boxes ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {mockKpiCardsData.map((card, idx) => (
          <KpiCard
            key={idx}
            title={card.title}
            timeframeLabel={card.timeframeLabel}
            value={card.value}
            changeText={card.changeText}
            changeType={card.changeType}
            vsLabel={card.vsLabel}
            icon={card.icon}
            themeColor={card.themeColor}
            chartData={card.chartData}
          />
        ))}
      </div>

      {/* ==================== ROW 2: 3 Components ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Box 2.1: Bookings Overview */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] relative min-h-[340px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col text-left">
              <h3 className="font-bold text-slate-800 text-sm">Bookings Overview</h3>
              {/* Legends */}
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 rounded-full bg-[#6c5ce7] inline-block" />
                  <span className="text-[10px] font-semibold text-slate-400">Bookings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-0.5 rounded-full border-t border-dashed border-emerald-500 inline-block" />
                  <span className="text-[10px] font-semibold text-slate-400">Completed</span>
                </div>
              </div>
            </div>

            {/* Range selection */}
            <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg border border-slate-100 bg-white text-[9px] font-semibold text-slate-500 hover:bg-slate-50">
              <span>Weekly</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>
          </div>

          {/* Simple clean visual chart widget (Recharts) */}
          <div className="flex-1 w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockBookingsOverview} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 500 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 500 }}
                  domain={[0, 750]}
                />
                <Tooltip
                  cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #f1f5f9",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                    padding: "8px 12px",
                  }}
                  labelStyle={{ fontSize: "10px", fontWeight: "bold", color: "#64748b", textAlign: "left" }}
                  itemStyle={{ fontSize: "11px", fontWeight: "semibold", padding: "2px 0", textAlign: "left" }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#6c5ce7"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#6c5ce7" }}
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                  activeDot={{ r: 4, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Box 2.2: Service Category Distribution */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[340px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Service Category Distribution</h3>
            <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg border border-slate-100 bg-white text-[9px] font-semibold text-slate-500 hover:bg-slate-50">
              <span>This Month</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>
          </div>

          {/* Simple clean visual chart widget (Recharts Doughnut) */}
          <div className="flex-1 flex items-center justify-between gap-2">
            
            {/* Center Total label */}
            <div className="w-[160px] h-[160px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCategoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {mockCategoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total</span>
                <span className="text-xl font-bold text-slate-800 font-display">1,248</span>
              </div>
            </div>

            {/* Right Legend Indicators */}
            <div className="flex-1 flex flex-col gap-2.5 pl-2 text-left">
              {mockCategoryDistribution.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-1.5 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-[10px] font-semibold text-slate-500 truncate w-24">
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-800">{entry.value}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Box 2.3: Live Requests */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[340px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 text-sm">Live Requests</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-500">
              3 Active
            </span>
          </div>

          {/* Simple scrollable list */}
          <div className="flex-1 flex flex-col gap-3.5 overflow-y-auto pr-1">
            {mockLiveRequests.map((req, idx) => {
              const borderTheme =
                req.themeColor === "purple"
                  ? "border-l-[3px] border-l-[#6c5ce7]"
                  : req.themeColor === "green"
                  ? "border-l-[3px] border-l-emerald-500"
                  : "border-l-[3px] border-l-amber-500";

              const badgeTheme =
                req.themeColor === "purple"
                  ? "bg-indigo-50 text-[#6c5ce7]"
                  : req.themeColor === "green"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600";

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border border-slate-100 flex items-start justify-between gap-3 text-left hover:bg-slate-50/40 transition-colors ${borderTheme}`}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-800 truncate">{req.service}</span>
                      <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full ${badgeTheme}`}>
                        {req.isNew ? "New" : "Live"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <span className="text-[10px] text-slate-500 font-semibold">Verified Customer</span>
                      <span className="text-[9px] text-slate-400 font-light truncate">{req.address}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400 shrink-0 mt-0.5">
                    {req.time}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ==================== ROW 3: 3 Components ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Box 3.1: Recent Bookings */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[340px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Recent Bookings</h3>
            <button className="text-[10px] font-bold text-[#6c5ce7] hover:underline">
              View All
            </button>
          </div>

          {/* Simple Table */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-2 text-[9px] font-bold text-slate-400 tracking-wider">Booking ID</th>
                  <th className="py-2 text-[9px] font-bold text-slate-400 tracking-wider">Customer</th>
                  <th className="py-2 text-[9px] font-bold text-slate-400 tracking-wider">Service</th>
                  <th className="py-2 text-[9px] font-bold text-slate-400 tracking-wider">Status</th>
                  <th className="py-2 text-[9px] font-bold text-slate-400 tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockRecentBookings.map((b, idx) => {
                  const badgeColor =
                    b.status === "Completed"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : b.status === "In Progress"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : b.status === "Assigned"
                      ? "bg-indigo-50 text-[#6c5ce7] border-indigo-100"
                      : "bg-amber-50 text-amber-600 border-amber-100";

                  return (
                    <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                      <td className="py-3 text-[10px] font-bold text-slate-400">{b.id}</td>
                      <td className="py-3 text-[10px] font-bold text-slate-700">{b.customer}</td>
                      <td className="py-3 text-[10px] text-slate-500 font-semibold">{b.service}</td>
                      <td className="py-3">
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${badgeColor}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 text-[10px] font-bold text-slate-800 text-right">{b.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* Box 3.2: Earnings Overview */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[340px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col text-left">
              <h3 className="font-bold text-slate-800 text-sm">Earnings Overview</h3>
              <span className="text-xl font-bold text-slate-800 font-display mt-0.5">₹17,64,320</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-50">
              <ArrowUpRight className="w-3 h-3" />
              <span>+14.2%</span>
            </div>
          </div>

          {/* Simple clean visual chart widget (Recharts Bar) */}
          <div className="flex-1 w-full h-[180px] mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockEarningsWeekly} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 500 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 500 }}
                  domain={[0, 45000]}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9", opacity: 0.3 }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #f1f5f9",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                    padding: "6px 10px",
                  }}
                  labelStyle={{ fontSize: "9px", fontWeight: "bold", color: "#64748b", textAlign: "left" }}
                  itemStyle={{ fontSize: "10px", fontWeight: "semibold", padding: "1px 0", color: "#6c5ce7", textAlign: "left" }}
                />
                <Bar dataKey="value" fill="#6c5ce7" radius={[4, 4, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Box 3.3: Top Performing Maids */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[340px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Top Performing Maids</h3>
            <button className="text-[10px] font-bold text-[#6c5ce7] hover:underline">
              Roster
            </button>
          </div>

          {/* List */}
          <div className="flex-1 flex flex-col gap-4 mt-2">
            {mockTopMaids.map((maid, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center gap-3">
                  
                  {/* Avatar */}
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-xs font-bold ${maid.avatarColor} shrink-0`}>
                    {maid.initial}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800">{maid.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                        ★ {maid.rating}
                      </span>
                      <span className="text-[10px] text-slate-400 font-light">{maid.jobs}</span>
                    </div>
                  </div>

                </div>

                <span className="text-xs font-bold text-slate-900">{maid.earnings}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ==================== ROW 4: 4 Components ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Box 4.1: Service Pricing Management */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[320px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col text-left">
              <h3 className="font-bold text-slate-800 text-xs">Service Pricing Management</h3>
              <span className="text-[9px] text-slate-400 font-light mt-0.5">Manage prices for different services and areas</span>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-[#6c5ce7] shrink-0">
              {servicePrices.length} Items
            </span>
          </div>

          {/* Simple Table */}
          <div className="flex-1 overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-1.5 text-[9px] font-bold text-slate-400 tracking-wider w-2/5">Service</th>
                  <th className="py-1.5 text-[9px] font-bold text-slate-400 tracking-wider w-1/5">Base Price</th>
                  <th className="py-1.5 text-[9px] font-bold text-slate-400 tracking-wider w-1/5">Peak Price</th>
                  <th className="py-1.5 text-[9px] font-bold text-slate-400 tracking-wider text-right w-1/5">Action</th>
                </tr>
              </thead>
              <tbody>
                {servicePrices.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                    {editingIndex === idx ? (
                      <>
                        <td className="py-2">
                          <input
                            className="w-full text-[10px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#6c5ce7]"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            placeholder="Service name"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            className="w-20 text-[10px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#6c5ce7]"
                            value={tempBasePrice}
                            onChange={(e) => setTempBasePrice(e.target.value)}
                            placeholder="₹ base"
                          />
                        </td>
                        <td className="py-2">
                          <input
                            className="w-20 text-[10px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#6c5ce7]"
                            value={tempPeakPrice}
                            onChange={(e) => setTempPeakPrice(e.target.value)}
                            placeholder="₹ peak"
                          />
                        </td>
                        <td className="py-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleSave(idx)}
                              className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100/60 cursor-pointer"
                              title="Save Changes"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingIndex(null)}
                              className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100/60 cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-2.5 text-[10px] font-bold text-slate-700 text-left">{item.name}</td>
                        <td className="py-2.5 text-[10px] text-slate-500 text-left">{item.basePrice}</td>
                        <td className="py-2.5 text-[10px] text-slate-500 text-left">{item.peakPrice}</td>
                        <td className="py-2.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleEdit(idx)}
                              className="p-1 rounded bg-slate-50 text-slate-400 hover:text-[#6c5ce7] hover:bg-indigo-50/50 cursor-pointer"
                              title="Edit Price"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(idx)}
                              className="p-1 rounded bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 cursor-pointer"
                              title="Delete Service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add New Service Button */}
          <button
            onClick={handleAdd}
            className="w-full mt-3 py-2 text-center text-[11px] font-semibold text-white bg-[#6c5ce7] hover:bg-[#5b4cd8] rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-[#6c5ce7]/10 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Service</span>
          </button>

        </div>

        {/* Box 4.2: Geo Heatmap */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[320px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 text-xs">Geo Heatmap (Bookings)</h3>
            <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg border border-slate-100 bg-white text-[9px] font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer">
              <span>Kochi</span>
              <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
            </button>
          </div>

          {/* Simulated Geo Coordinates grid */}
          <div className="flex-1 rounded-xl bg-slate-50 border border-slate-100/50 relative overflow-hidden flex items-center justify-center">
            
            {/* Visual Vector Grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:12px_12px] opacity-60" />
            
            {/* Map Labels representing regions in Kochi */}
            <div className="absolute top-10 left-12 flex flex-col items-center">
              <span className="text-[9px] font-bold text-slate-700 bg-white/95 px-2 py-0.5 rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                <span>Kakkanad</span>
              </span>
              <span className="text-[7px] text-slate-400 font-semibold mt-0.5 uppercase">High Demand</span>
            </div>

            <div className="absolute bottom-16 right-10 flex flex-col items-center">
              <span className="text-[9px] font-bold text-slate-700 bg-white/95 px-2 py-0.5 rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
                <span>Vyttila</span>
              </span>
              <span className="text-[7px] text-slate-400 font-semibold mt-0.5 uppercase">Very High</span>
            </div>

            <div className="absolute bottom-12 left-16 flex flex-col items-center">
              <span className="text-[9px] font-bold text-slate-700 bg-white/95 px-2 py-0.5 rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block animate-pulse" />
                <span>Kadavanthra</span>
              </span>
              <span className="text-[7px] text-slate-400 font-semibold mt-0.5 uppercase">Medium Demand</span>
            </div>

            {/* Map compass helper */}
            <div className="absolute top-3 right-3 text-[8px] font-bold text-slate-300">
              N 9°58' / E 76°18'
            </div>

          </div>

        </div>

        {/* Box 4.3: AI Insights */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[320px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 text-xs">AI Insights & Optimization</h3>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
              Live Feed
            </span>
          </div>

          {/* Insight Cards list */}
          <div className="flex-1 flex flex-col gap-3 mt-2">
            {mockAiInsights.map((insight, idx) => {
              const indicatorColor =
                insight.type === "success"
                  ? "bg-emerald-500"
                  : insight.type === "info"
                  ? "bg-blue-500"
                  : "bg-amber-500";

              return (
                <div key={idx} className="flex gap-2.5 items-start text-left border-b border-slate-50 last:border-0 pb-2.5 last:pb-0">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${indicatorColor}`} />
                  <div className="flex flex-col">
                    <p className="text-[10px] text-slate-600 leading-normal font-light">
                      {insight.text}
                    </p>
                    <span className="text-[8px] text-slate-400 mt-1 font-light">{insight.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Box 4.4: Quick Actions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[320px]">
          
          {/* Header */}
          <div className="mb-3 text-left">
            <h3 className="font-bold text-slate-800 text-xs">Quick Actions</h3>
          </div>

          {/* 2x3 Grid layout */}
          <div className="flex-1 grid grid-cols-2 gap-3 mt-2">
            {mockQuickActions.map((action, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-50 bg-slate-50/20 hover:bg-slate-50 transition-colors text-center cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.bgColor}`}>
                  <action.icon className={`w-4 h-4 ${action.iconColor}`} strokeWidth={2.2} />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-2 truncate w-full px-1">
                  {action.label}
                </span>
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
