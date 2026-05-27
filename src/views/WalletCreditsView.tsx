import React, { useState } from "react";
import { useStore, type WalletLedgerItem } from "../store/useStore";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Download,
  TrendingUp,
  Clock,
  Wallet,
  Gift,
  ArrowDownLeft,
  ShieldAlert,
  Unlock,
  Lock,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export const WalletCreditsView: React.FC = () => {
  // Store variables
  const walletLedger = useStore((state) => state.walletLedger);
  const walletSearch = useStore((state) => state.walletSearch);
  const setWalletSearch = useStore((state) => state.setWalletSearch);

  const addWalletLedgerItem = useStore((state) => state.addWalletLedgerItem);
  const updateLedgerStatus = useStore((state) => state.updateLedgerStatus);
  const deleteLedgerItem = useStore((state) => state.deleteLedgerItem);

  const selectedUserWallet = useStore((state) => state.selectedUserWallet);
  const updateSelectedUserWalletBalance = useStore((state) => state.updateSelectedUserWalletBalance);
  const toggleSelectedUserWalletFrozen = useStore((state) => state.toggleSelectedUserWalletFrozen);

  // Local state
  const [isAddingLedger, setIsAddingLedger] = useState(false);
  const [ledgerType, setLedgerType] = useState<"Credit Added" | "Wallet Refund" | "Deduction">("Credit Added");
  const [ledgerAmount, setLedgerAmount] = useState("");
  const [ledgerStatus, setLedgerStatus] = useState<"Completed" | "Pending" | "Rejected">("Completed");

  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editLedgerStatus, setEditLedgerStatus] = useState<"Completed" | "Pending" | "Rejected">("Completed");

  // User Quick Action States
  const [isAdjustingBalance, setIsAdjustingBalance] = useState(false);
  const [balanceAdjustmentAmount, setBalanceAdjustmentAmount] = useState("");
  const [adjustmentType, setAdjustmentType] = useState<"add" | "deduct">("add");
  const [isFlagged, setIsFlagged] = useState(false);

  // Sparkline mini metrics data
  const sparklineData = [
    { value: 400 }, { value: 600 }, { value: 550 }, { value: 700 },
    { value: 850 }, { value: 800 }, { value: 950 }, { value: 1100 }
  ];

  // Credit Usage Analytics compound Recharts data
  const analyticData = [
    { name: "Mon", balance: 14000, credits: 2100 },
    { name: "Tue", balance: 14100, credits: 2300 },
    { name: "Wed", balance: 13900, credits: 2200 },
    { name: "Thu", balance: 14350, credits: 2450 },
    { name: "Fri", balance: 14200, credits: 2400 },
    { name: "Sat", balance: 14500, credits: 2500 },
    { name: "Sun", balance: 14250, credits: 2450 },
  ];

  // Helper actions
  const handleCreateLedgerItem = () => {
    if (!ledgerAmount.trim()) return;
    
    const sign = ledgerType === "Deduction" ? "-" : "+";
    const formattedAmount = `${sign}₹${parseFloat(ledgerAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

    const newItem: WalletLedgerItem = {
      id: `TXN-${Math.floor(8820 + Math.random() * 999)}`,
      type: ledgerType,
      amount: formattedAmount,
      status: ledgerStatus,
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).replace(",", " -"),
    };

    addWalletLedgerItem(newItem);

    // If completed adjustment, let's also update the Sarah Koven user's profile balance
    if (ledgerStatus === "Completed") {
      const currentNumeric = parseFloat(selectedUserWallet.balance.replace(/[^\d.]/g, ""));
      const delta = parseFloat(ledgerAmount);
      const newTotal = ledgerType === "Deduction" ? currentNumeric - delta : currentNumeric + delta;
      updateSelectedUserWalletBalance(`₹${newTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`);
    }

    setLedgerAmount("");
    setIsAddingLedger(false);
  };

  const handleAdjustUserBalance = () => {
    if (!balanceAdjustmentAmount.trim()) return;
    const delta = parseFloat(balanceAdjustmentAmount);
    const currentNumeric = parseFloat(selectedUserWallet.balance.replace(/[^\d.]/g, ""));
    const newTotal = adjustmentType === "deduct" ? currentNumeric - delta : currentNumeric + delta;

    updateSelectedUserWalletBalance(`₹${newTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`);

    // Add to ledger
    const sign = adjustmentType === "deduct" ? "-" : "+";
    const formattedAmount = `${sign}₹${delta.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    const newItem: WalletLedgerItem = {
      id: `TXN-${Math.floor(8820 + Math.random() * 999)}`,
      type: adjustmentType === "deduct" ? "Deduction" : "Credit Added",
      amount: formattedAmount,
      status: "Completed",
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).replace(",", " -"),
    };
    addWalletLedgerItem(newItem);

    setBalanceAdjustmentAmount("");
    setIsAdjustingBalance(false);
  };

  const startEditing = (idx: number, item: WalletLedgerItem) => {
    setEditingIdx(idx);
    setEditLedgerStatus(item.status);
  };

  const saveEditedStatus = (idx: number) => {
    updateLedgerStatus(idx, editLedgerStatus);
    setEditingIdx(null);
  };

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
            <span className="text-[#6c5ce7]">Wallet &amp; Credits</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 font-display mt-0.5 font-display">Wallet &amp; Credits</h1>
          <p className="text-xs text-slate-400 font-light">
            Manage global wallet balances, issued credits, and manual adjustments.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddingLedger(!isAddingLedger)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold shadow-sm shadow-[#6c5ce7]/15 transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Credits</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-655 text-xs font-semibold transition-all duration-150 cursor-pointer">
            <Download className="w-4 h-4 text-slate-450" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Record Creation Overlay card */}
      {isAddingLedger && (
        <div className="bg-white border border-[#6c5ce7]/20 p-5 rounded-2xl shadow-lg shadow-[#6c5ce7]/5 text-left max-w-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Record New Adjustment Transaction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Adjustment Type</label>
              <select
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-850 focus:outline-none focus:border-[#6c5ce7] cursor-pointer font-medium"
                value={ledgerType}
                onChange={(e) => setLedgerType(e.target.value as any)}
              >
                <option value="Credit Added">Credit Added (Addition)</option>
                <option value="Wallet Refund">Wallet Refund (Refund)</option>
                <option value="Deduction">Deduction (Subtraction)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 1500"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#6c5ce7]"
                value={ledgerAmount}
                onChange={(e) => setLedgerAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Billing Status</label>
              <select
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-855 focus:outline-none focus:border-[#6c5ce7] cursor-pointer font-medium"
                value={ledgerStatus}
                onChange={(e) => setLedgerStatus(e.target.value as any)}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              onClick={() => setIsAddingLedger(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateLedgerItem}
              className="px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold cursor-pointer"
            >
              Process Transaction
            </button>
          </div>
        </div>
      )}

      {/* ==================== ROW 1: 4 ELGANT WHITE CARD BOXES ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Total Wallet Balance */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 text-[#6c5ce7]">
              <Wallet className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 12%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Wallet Balance</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                ₹1,482,905.00
              </h3>
            </div>
            <div className="w-16 h-8 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <Area type="monotone" dataKey="value" stroke="#6c5ce7" strokeWidth={1.5} fill="#6c5ce7" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 2: Credits Issued (YTD) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-amber-50 text-amber-500">
              <Gift className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 8.4%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Credits Issued (YTD)</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                ₹428,200.00
              </h3>
            </div>
            <div className="w-16 h-8 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={1.5} fill="#f59e0b" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Card 3: Credits Used */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-teal-50 text-teal-650">
              <TrendingUp className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-teal-50 text-teal-600 border border-teal-100 uppercase tracking-wider">
              Stable
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Credits Used</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                ₹391,150.00
              </h3>
            </div>
          </div>
        </div>

        {/* Card 4: Pending Refunds */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-rose-50 text-rose-500">
              <ArrowDownLeft className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 flex items-center gap-0.5">
              <span>↘</span> -21%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pending Refunds</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                ₹12,400.00
              </h3>
            </div>
            <div className="w-16 h-8 opacity-70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={1.5} fill="#f43f5e" fillOpacity={0.08} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* ==================== DOUBLE SPLIT VIEW LAYOUT ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Hand: Analytics Graph + Ledger Table (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Graph: Credit Usage Analytics */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.003)] text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Wallet Balance Trend</h3>
                <p className="text-[10px] text-slate-400 font-light">Credit Usage Analytics &amp; Flow Cycles</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#6c5ce7]/10 text-[#6c5ce7]">This Month</span>
            </div>
            
            <div className="w-full h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticData}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: "12px", fontSize: "10px" }} />
                  <Bar dataKey="balance" fill="#6c5ce7" radius={[4, 4, 0, 0]} barSize={25} />
                  <Bar dataKey="credits" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table: Ledger Activities */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col text-left">
                <h3 className="text-sm font-bold text-slate-800 font-display">Recent Activities</h3>
                <p className="text-[11px] text-slate-400 font-light">Active global balance adjustment activities ledger</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative min-w-[200px]">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search ledger..."
                    className="pl-9 pr-4 py-1.5 w-full text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6c5ce7] focus:border-[#6c5ce7] placeholder:text-slate-400 text-slate-850 transition-colors text-left"
                    value={walletSearch}
                    onChange={(e) => setWalletSearch(e.target.value)}
                  />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/20">
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">TRANSACTION ID</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">TYPE</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">AMOUNT</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">STATUS</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">DATE &amp; TIME</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {walletLedger
                    .filter((item) => {
                      return item.id.toLowerCase().includes(walletSearch.toLowerCase()) ||
                             item.type.toLowerCase().includes(walletSearch.toLowerCase());
                    })
                    .map((item, idx) => (
                      <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                        <td className="py-3.5 px-6 text-[11px] font-bold text-slate-400">{item.id}</td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] font-bold text-slate-700">{item.type}</span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className={`text-[11px] font-bold ${item.amount.startsWith("-") ? "text-rose-500" : "text-emerald-500"}`}>
                            {item.amount}
                          </span>
                        </td>
                        <td className="py-3.5 px-6">
                          {editingIdx === idx ? (
                            <select
                              className="text-[10px] font-semibold text-slate-650 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
                              value={editLedgerStatus}
                              onChange={(e) => setEditLedgerStatus(e.target.value as any)}
                            >
                              <option value="Completed">Completed</option>
                              <option value="Pending">Pending</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider inline-flex items-center leading-none ${
                              item.status === "Completed"
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : item.status === "Pending"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-rose-50 text-rose-600 border border-rose-100"
                            }`}>
                              {item.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] text-slate-500 font-light">{item.date}</span>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {editingIdx === idx ? (
                              <>
                                <button
                                  onClick={() => saveEditedStatus(idx)}
                                  className="p-1.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100/60 cursor-pointer"
                                  title="Save Status"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingIdx(null)}
                                  className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100/60 cursor-pointer"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => startEditing(idx, item)}
                                  className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-[#6c5ce7] hover:bg-indigo-50/50 cursor-pointer"
                                  title="Modify Status"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteLedgerItem(idx)}
                                  className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 cursor-pointer"
                                  title="Delete Ledger"
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

            <div className="p-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 bg-slate-50/10">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Showing 1-10 of 2,450 results
              </span>
              <div className="flex items-center gap-1.5">
                <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer">Previous</button>
                <button className="px-2.5 py-1 text-[10px] rounded-lg bg-[#6c5ce7] text-white font-bold cursor-pointer">1</button>
                <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer">2</button>
                <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer">Next</button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Hand: Selected User Profile (1/3 width) */}
        <div className="space-y-6 text-left">
          
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Selected User Profile</h3>
              <span className="text-[10px] text-slate-400 font-semibold">User ID: {selectedUserWallet.userId}</span>
            </div>

            {/* Profile Avatar Card Info */}
            <div className="flex items-center gap-3.5 mb-5 bg-slate-50/40 border border-slate-100 p-3.5 rounded-2xl">
              <div className="w-11 h-11 rounded-full bg-[#6c5ce7]/10 flex items-center justify-center text-[#6c5ce7] font-bold">
                SK
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800">{selectedUserWallet.user}</span>
                <span className="text-[10px] font-bold text-[#6c5ce7] bg-[#6c5ce7]/10 px-2 py-0.5 rounded-full mt-0.5 self-start">
                  {selectedUserWallet.tier}
                </span>
              </div>
            </div>

            {/* Balances list */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Balance</span>
                <span className="text-base font-black text-slate-800 tracking-tight">{selectedUserWallet.balance}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-50 pb-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Credits Issued</span>
                <span className="text-xs font-bold text-slate-650">{selectedUserWallet.creditsIssued}</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Used</span>
                <span className="text-[11px] font-semibold text-slate-550 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-350" />
                  <span>{selectedUserWallet.lastUsed}</span>
                </span>
              </div>
            </div>

            {/* Freeze control panel */}
            <div className="flex items-center justify-between bg-slate-50/50 rounded-2xl p-4 border border-slate-100 mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Freeze Account</span>
                <span className="text-[9px] text-slate-400 font-light mt-0.5">Restrict wallet actions</span>
              </div>
              <button
                onClick={toggleSelectedUserWalletFrozen}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedUserWallet.frozen
                    ? "bg-[#6c5ce7] text-white hover:bg-[#5b4cd8]"
                    : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                }`}
              >
                {selectedUserWallet.frozen ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unfreeze</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Freeze Wallet</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Balance Actions input */}
            <div className="mb-6 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Quick Actions</span>
                <button
                  onClick={() => setIsAdjustingBalance(!isAdjustingBalance)}
                  className="text-[10px] font-bold text-[#6c5ce7] hover:underline cursor-pointer"
                >
                  Adjust Balance
                </button>
              </div>

              {isAdjustingBalance && (
                <div className="bg-slate-50 border border-slate-150 p-3 rounded-2xl space-y-3 mb-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAdjustmentType("add")}
                      className={`flex-1 py-1 rounded text-[9px] font-bold uppercase ${
                        adjustmentType === "add"
                          ? "bg-[#6c5ce7] text-white"
                          : "bg-white border border-slate-200 text-slate-500"
                      }`}
                    >
                      Add Credit
                    </button>
                    <button
                      onClick={() => setAdjustmentType("deduct")}
                      className={`flex-1 py-1 rounded text-[9px] font-bold uppercase ${
                        adjustmentType === "deduct"
                          ? "bg-rose-550 text-white"
                          : "bg-white border border-slate-200 text-slate-500"
                      }`}
                    >
                      Deduct
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1 w-full text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#6c5ce7]"
                      value={balanceAdjustmentAmount}
                      onChange={(e) => setBalanceAdjustmentAmount(e.target.value)}
                    />
                    <button
                      onClick={handleAdjustUserBalance}
                      className="px-3 py-1 bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[10px] font-bold rounded-lg cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button className="flex-1 py-2 text-center text-[10px] font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer transition-all">
                  REFUND
                </button>
                <button className="flex-1 py-2 text-center text-[10px] font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer transition-all">
                  View All Audit Logs
                </button>
              </div>
            </div>

            {/* Timeline Activities list */}
            <div>
              <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider block mb-3.5">Activity Logs Timeline</span>
              <div className="relative border-l border-slate-100 pl-3.5 space-y-4 text-left">
                {selectedUserWallet.timeline.map((act, i) => (
                  <div key={i} className="relative">
                    {/* Circle bullet */}
                    <span className="absolute -left-[19.5px] top-1.5 w-2 h-2 rounded-full bg-[#6c5ce7] ring-4 ring-indigo-50 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-700">{act.split(":")[0]}</span>
                      {act.includes(":") && (
                        <span className="text-[10px] text-slate-455 font-light mt-0.5">{act.split(":")[1].trim()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flag Alert Checkbox */}
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
              <input
                type="checkbox"
                id="fraud-flag"
                className="w-3.5 h-3.5 rounded accent-rose-500 cursor-pointer"
                checked={isFlagged}
                onChange={(e) => setIsFlagged(e.target.checked)}
              />
              <label htmlFor="fraud-flag" className="text-[10px] font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1 cursor-pointer">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>flag for fraud</span>
              </label>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
