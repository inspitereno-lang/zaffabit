import React, { useState } from "react";
import { useStore, type PayoutTransaction } from "../store/useStore";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  CreditCard,
  Search,
  SlidersHorizontal,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

export const EarningsPayoutView: React.FC = () => {
  // Global Store States & Actions
  const payoutTransactions = useStore((state) => state.payoutTransactions);
  const earningsSearch = useStore((state) => state.earningsSearch);
  const setEarningsSearch = useStore((state) => state.setEarningsSearch);
  const earningsStatusFilter = useStore((state) => state.earningsStatusFilter);
  const setEarningsStatusFilter = useStore((state) => state.setEarningsStatusFilter);
  const addPayoutTransaction = useStore((state) => state.addPayoutTransaction);
  const updatePayoutStatus = useStore((state) => state.updatePayoutStatus);
  const deletePayoutTransaction = useStore((state) => state.deletePayoutTransaction);

  // Local States
  const [isAdding, setIsAdding] = useState(false);
  const [newPartner, setNewPartner] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newStatus, setNewStatus] = useState<"PAID" | "PENDING" | "FAILED">("PAID");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<"PAID" | "PENDING" | "FAILED">("PAID");

  // Chart Mock Data
  const revenueChartData = [
    { name: "Mon", revenue: 14000, payout: 11000 },
    { name: "Tue", revenue: 22000, payout: 18000 },
    { name: "Wed", revenue: 18000, payout: 14000 },
    { name: "Thu", revenue: 29000, payout: 24000 },
    { name: "Fri", revenue: 24000, payout: 19000 },
    { name: "Sat", revenue: 35000, payout: 29000 },
    { name: "Sun", revenue: 28000, payout: 23000 },
  ];

  const payoutDistributionData = [
    { name: "Completed", value: 842, color: "#6c5ce7" },
    { name: "Pending", value: 312, color: "#38bdf8" },
    { name: "Failed", value: 94, color: "#ef4444" },
  ];

  // Helper Actions
  const handleAddNewPayout = () => {
    if (!newPartner.trim() || !newAmount.trim()) return;
    const formattedAmount = newAmount.startsWith("₹") ? newAmount : `₹${parseFloat(newAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    const newTxn: PayoutTransaction = {
      id: `TXN-${Math.floor(8000 + Math.random() * 2000)}`,
      partner: newPartner,
      amount: formattedAmount,
      status: newStatus,
      scheduledDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };
    addPayoutTransaction(newTxn);
    setNewPartner("");
    setNewAmount("");
    setNewStatus("PAID");
    setIsAdding(false);
  };

  const handleEditClick = (idx: number, txn: PayoutTransaction) => {
    setEditingIndex(idx);
    setEditStatus(txn.status);
  };

  const handleSaveClick = (idx: number) => {
    updatePayoutStatus(idx, editStatus);
    setEditingIndex(null);
  };

  // KPI Calculations
  const totalRevenueVal = payoutTransactions
    .filter(t => t.status === "PAID" || t.status === "PENDING")
    .reduce((sum, curr) => sum + parseFloat(curr.amount.replace(/[^\d.]/g, "")), 0);

  const pendingPayoutVal = payoutTransactions
    .filter(t => t.status === "PENDING")
    .reduce((sum, curr) => sum + parseFloat(curr.amount.replace(/[^\d.]/g, "")), 0);

  const completedPayoutVal = payoutTransactions
    .filter(t => t.status === "PAID")
    .reduce((sum, curr) => sum + parseFloat(curr.amount.replace(/[^\d.]/g, "")), 0);

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Header and Title */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left gap-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <span>Zafabit</span>
            <span>&gt;</span>
            <span className="text-[#6c5ce7]">Earnings & Payouts</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 font-display mt-0.5">Earnings & Payouts</h1>
          <p className="text-xs text-slate-400 font-light">
            Manage partner earnings and automated disbursements
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold shadow-sm shadow-[#6c5ce7]/15 transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record Payout</span>
        </button>
      </div>

      {/* Adding Record Modal/Card Overlay */}
      {isAdding && (
        <div className="bg-white border border-[#6c5ce7]/20 p-5 rounded-2xl shadow-lg shadow-[#6c5ce7]/5 text-left max-w-xl animate-in fade-in slide-in-from-top-3 duration-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Record Partner Disbursement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Partner Name</label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#6c5ce7]"
                value={newPartner}
                onChange={(e) => setNewPartner(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 1450"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#6c5ce7]"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Disbursement Status</label>
              <select
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-850 focus:outline-none focus:border-[#6c5ce7] cursor-pointer font-medium"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
              >
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>
                <option value="FAILED">FAILED</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNewPayout}
              className="px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold cursor-pointer"
            >
              Add Payout
            </button>
          </div>
        </div>
      )}

      {/* ==================== TOP ROW: 4 KPI CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: TOTAL REVENUE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 text-[#6c5ce7]">
              <TrendingUp className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-[#6c5ce7] flex items-center gap-0.5">
              <span>↗</span> 12.8%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
              ₹{totalRevenueVal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        {/* Card 2: PENDING PAYOUTS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-amber-50 text-amber-500">
              <Clock className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 flex items-center gap-0.5">
              <span>↗</span> 4.5%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pending Payouts</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
              ₹{pendingPayoutVal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        {/* Card 3: COMPLETED PAYOUTS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
              <CheckCircle className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 8.2%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Completed Payouts</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
              ₹{completedPayoutVal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        {/* Card 4: AVERAGE DISBURSEMENT */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-teal-50 text-teal-600">
              <CreditCard className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-600 flex items-center gap-0.5">
              <span>↗</span> 7.8%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Average Payout</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
              ₹842.15
            </h3>
          </div>
        </div>

      </div>

      {/* ==================== MIDDLE ROW: CHARTS ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Revenue Analytics Area Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[350px]">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex flex-col text-left">
              <h3 className="font-bold text-slate-800 text-sm">Revenue Analytics</h3>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">Global revenue performance across all regions</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-0.5">
                {["Daily", "Weekly", "Monthly"].map((mode) => (
                  <button
                    key={mode}
                    className={`px-2.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${
                      mode === "Weekly" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[9px] font-bold text-slate-600 transition-all cursor-pointer">
                <Download className="w-3 h-3 text-slate-400" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Area Chart Widget */}
          <div className="flex-1 w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6c5ce7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="payout"
                  stroke="#38bdf8"
                  strokeWidth={1.8}
                  fillOpacity={1}
                  fill="url(#colorPayout)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Payout Overview Doughnut Chart */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[350px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col text-left">
              <h3 className="font-bold text-slate-800 text-sm">Payout Overview</h3>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">Status distribution for current period</p>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 border border-slate-150">
              Active
            </span>
          </div>

          <div className="flex-1 flex items-center justify-between gap-4 mt-2">
            {/* Doughnut Wrapper */}
            <div className="w-[145px] h-[145px] relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={payoutDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {payoutDistributionData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Total Actions</span>
                <span className="text-lg font-bold text-slate-800 font-display">1,248</span>
              </div>
            </div>

            {/* List Legend Metrics */}
            <div className="flex-1 flex flex-col gap-2 pl-1 text-left">
              {payoutDistributionData.map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-1.5 last:pb-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                    <span className="text-[10px] font-semibold text-slate-500">
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-800">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ==================== BOTTOM ROW: TRANSACTION LOGS TABLE ==================== */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden">
        
        {/* Table Filters Panel */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-slate-800 font-display">Recent Transactions</h3>
            <p className="text-[11px] text-slate-400 font-light">Real-time partner disbursement logs</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Filter by name or ID..."
                className="pl-9 pr-4 py-1.5 w-full text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6c5ce7] focus:border-[#6c5ce7] placeholder:text-slate-400 text-slate-850 transition-colors text-left"
                value={earningsSearch}
                onChange={(e) => setEarningsSearch(e.target.value)}
              />
            </div>

            {/* Status Select */}
            <select
              className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
              value={earningsStatusFilter}
              onChange={(e) => setEarningsStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="PAID">PAID</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILED">FAILED</option>
            </select>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-all">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/20">
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">TRANSACTION ID</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">PARTNER</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">AMOUNT</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">STATUS</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">SCHEDULED DATE</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {payoutTransactions
                .filter((txn) => {
                  const matchesSearch =
                    txn.partner.toLowerCase().includes(earningsSearch.toLowerCase()) ||
                    txn.id.toLowerCase().includes(earningsSearch.toLowerCase());
                  const matchesStatus = earningsStatusFilter === "ALL" || txn.status === earningsStatusFilter;
                  return matchesSearch && matchesStatus;
                })
                .map((txn, idx) => (
                  <tr key={txn.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                    <td className="py-3.5 px-6 text-[11px] font-bold text-slate-400">{txn.id}</td>
                    <td className="py-3.5 px-6">
                      <span className="text-[11px] font-bold text-slate-700">{txn.partner}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="text-[11px] text-slate-800 font-semibold">{txn.amount}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      {editingIndex === idx ? (
                        <select
                          className="text-[10px] font-semibold text-slate-650 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value as any)}
                        >
                          <option value="PAID">PAID</option>
                          <option value="PENDING">PENDING</option>
                          <option value="FAILED">FAILED</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider inline-flex items-center leading-none ${
                          txn.status === "PAID"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : txn.status === "PENDING"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-rose-50 text-rose-600 border border-rose-100"
                        }`}>
                          {txn.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="text-[11px] text-slate-400 font-light">{txn.scheduledDate}</span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {editingIndex === idx ? (
                          <>
                            <button
                              onClick={() => handleSaveClick(idx)}
                              className="p-1.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100/60 cursor-pointer"
                              title="Save Changes"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingIndex(null)}
                              className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100/60 cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(idx, txn)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-[#6c5ce7] hover:bg-indigo-50/50 cursor-pointer"
                              title="Modify Status"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deletePayoutTransaction(idx)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 cursor-pointer"
                              title="Delete Log"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Directory Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 bg-slate-50/10">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Showing 1-{payoutTransactions.length} of 248 entries
          </span>
          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 cursor-pointer font-bold">
              &lt;
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg bg-[#6c5ce7] text-white font-bold cursor-pointer">
              1
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer">
              2
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer">
              3
            </button>
            <span className="text-slate-400 text-[10px] px-1 font-semibold">...</span>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer">
              25
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 cursor-pointer font-bold">
              &gt;
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
