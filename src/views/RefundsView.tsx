import React, { useState } from "react";
import { useStore, type PlatformRefund } from "../store/useStore";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Download,
  AlertTriangle,
  TrendingUp,
  Calendar,
  RefreshCw,
  Clock,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export const RefundsView: React.FC = () => {
  // Global store states
  const platformRefunds = useStore((state) => state.platformRefunds);
  const refundSearch = useStore((state) => state.refundSearch);
  const setRefundSearch = useStore((state) => state.setRefundSearch);
  
  const refundStatusFilter = useStore((state) => state.refundStatusFilter);
  const setRefundStatusFilter = useStore((state) => state.setRefundStatusFilter);

  const addPlatformRefund = useStore((state) => state.addPlatformRefund);
  const updateRefundStatus = useStore((state) => state.updateRefundStatus);
  const deletePlatformRefund = useStore((state) => state.deletePlatformRefund);

  // Local Component States
  const [isAdding, setIsAdding] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newReason, setNewReason] = useState("Cancellation");
  const [newStatus, setNewStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");

  // Sparkline data for cards
  const sparklineData = [
    { value: 200 }, { value: 400 }, { value: 300 }, { value: 600 },
    { value: 500 }, { value: 800 }, { value: 700 }, { value: 1100 }
  ];

  // Helper Handlers
  const handleCreateRefund = () => {
    if (!newUserName.trim() || !newAmount.trim()) return;
    const formattedAmount = newAmount.startsWith("₹") ? newAmount : `₹${parseFloat(newAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    const newRefund: PlatformRefund = {
      id: `RFD-${Math.floor(9000 + Math.random() * 999)}`,
      user: newUserName,
      amount: formattedAmount,
      reason: newReason,
      status: newStatus,
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }),
    };
    addPlatformRefund(newRefund);
    setNewUserName("");
    setNewAmount("");
    setNewReason("Cancellation");
    setNewStatus("Pending");
    setIsAdding(false);
  };

  const startEditing = (idx: number, refund: PlatformRefund) => {
    setEditingIndex(idx);
    setEditStatus(refund.status);
  };

  const saveEditedStatus = (idx: number) => {
    updateRefundStatus(idx, editStatus);
    setEditingIndex(null);
  };

  // Calculations for KPI summaries
  const totalRefunded = platformRefunds
    .filter(r => r.status === "Approved")
    .reduce((sum, curr) => sum + parseFloat(curr.amount.replace(/[^\d.]/g, "")), 0);

  const pendingRequests = platformRefunds
    .filter(r => r.status === "Pending").length;

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Page Title & Head Bar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left gap-0.5">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <span>Zafabit</span>
            <span>&gt;</span>
            <span className="text-[#6c5ce7]">Finance</span>
            <span>&gt;</span>
            <span className="text-[#6c5ce7]">Refunds</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 font-display mt-0.5 font-display">Refunds</h1>
          <p className="text-xs text-slate-400 font-light">
            Monitor and manage all Refund process across the platform.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold shadow-sm shadow-[#6c5ce7]/15 transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Request Refund</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-semibold transition-all duration-150 cursor-pointer">
            <Download className="w-4 h-4 text-slate-450" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Record Creation Overlay card */}
      {isAdding && (
        <div className="bg-white border border-[#6c5ce7]/20 p-5 rounded-2xl shadow-lg shadow-[#6c5ce7]/5 text-left max-w-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Record New Refund Request</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">User / Partner</label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#6c5ce7]"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 240"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#6c5ce7]"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reason</label>
              <select
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-850 focus:outline-none focus:border-[#6c5ce7] cursor-pointer font-medium"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
              >
                <option value="Cancellation">Cancellation</option>
                <option value="Double Charge">Double Charge</option>
                <option value="Quality Issue">Quality Issue</option>
                <option value="Service Delay">Service Delay</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</label>
              <select
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-850 focus:outline-none focus:border-[#6c5ce7] cursor-pointer font-medium"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
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
              onClick={handleCreateRefund}
              className="px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold cursor-pointer"
            >
              Add Request
            </button>
          </div>
        </div>
      )}

      {/* ==================== ROW 1: 4 ELGANT WHITE CARD BOXES ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Total Refunded */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 text-[#6c5ce7]">
              <RefreshCw className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 12.5%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Refunded</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                ₹{totalRefunded.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            {/* Sparkline in right corner */}
            <div className="w-16 h-8 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <Area type="monotone" dataKey="value" stroke="#6c5ce7" strokeWidth={1.5} fill="#6c5ce7" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 2: Pending Requests */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-sky-50 text-sky-500">
              <Clock className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-100 uppercase tracking-wider">
              {pendingRequests} Active
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pending Requests</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                28
              </h3>
            </div>
            <div className="w-16 h-8 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={1.5} fill="#0ea5e9" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 3: Refund Rate */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-rose-50 text-rose-500">
              <AlertTriangle className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-500 border border-rose-100 uppercase tracking-wider">
              High Priority
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Refund Rate</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                1.84%
              </h3>
            </div>
          </div>
        </div>

        {/* Card 4: Average Refund Value */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-teal-50 text-teal-650">
              <TrendingUp className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-50 text-teal-600 border border-teal-100 uppercase tracking-wider">
              Target: 2.1%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Average Refund Time</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                2.4 Days
              </h3>
            </div>
            <div className="w-16 h-8 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <Area type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={1.5} fill="#14b8a6" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* ==================== LOGS DATA FILTER DIRECTORY ==================== */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden">
        
        {/* Interactive filters bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-slate-800 font-display">Recent Refund Requests</h3>
            <p className="text-[11px] text-slate-400 font-light">Real-time platform billing and payment refunds</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[200px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search ID or User..."
                className="pl-9 pr-4 py-1.5 w-full text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6c5ce7] focus:border-[#6c5ce7] placeholder:text-slate-400 text-slate-850 transition-colors text-left"
                value={refundSearch}
                onChange={(e) => setRefundSearch(e.target.value)}
              />
            </div>

            {/* Status Select Filter */}
            <select
              className="text-[10px] font-semibold text-slate-655 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
              value={refundStatusFilter}
              onChange={(e) => setRefundStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-all">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/20">
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">REFUND ID</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">USER</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">AMOUNT</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">REASON</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">STATUS</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">DATE / TIME</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {platformRefunds
                .filter((rfd) => {
                  const matchesSearch =
                    rfd.user.toLowerCase().includes(refundSearch.toLowerCase()) ||
                    rfd.id.toLowerCase().includes(refundSearch.toLowerCase());
                  const matchesStatus = refundStatusFilter === "ALL" || rfd.status === refundStatusFilter;

                  return matchesSearch && matchesStatus;
                })
                .map((rfd, idx) => (
                  <tr key={rfd.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                    <td className="py-3.5 px-6 text-[11px] font-bold text-slate-400">{rfd.id}</td>
                    <td className="py-3.5 px-6">
                      <span className="text-[11px] font-bold text-slate-700">{rfd.user}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="text-[11px] text-slate-800 font-semibold">{rfd.amount}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="text-[11px] text-slate-500 font-semibold">{rfd.reason}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      {editingIndex === idx ? (
                        <select
                          className="text-[10px] font-semibold text-slate-650 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value as any)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider inline-flex items-center leading-none ${
                          rfd.status === "Approved"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : rfd.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-rose-50 text-rose-600 border border-rose-100"
                        }`}>
                          {rfd.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1 text-[11px] text-slate-455 font-light">
                        <Calendar className="w-3.5 h-3.5 text-slate-350 shrink-0" />
                        <span>{rfd.date}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {editingIndex === idx ? (
                          <>
                            <button
                              onClick={() => saveEditedStatus(idx)}
                              className="p-1.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100/60 cursor-pointer"
                              title="Save Status"
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
                              onClick={() => startEditing(idx, rfd)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-[#6c5ce7] hover:bg-indigo-50/50 cursor-pointer"
                              title="Modify Status"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deletePlatformRefund(idx)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 cursor-pointer"
                              title="Delete Request"
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
            Showing 1-{platformRefunds.length} of 142 refunds
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
              15
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
