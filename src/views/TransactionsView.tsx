import React, { useState } from "react";
import { useStore, type PlatformTransaction } from "../store/useStore";
import {
  CreditCard,
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
  DollarSign,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export const TransactionsView: React.FC = () => {
  // Global store states
  const platformTransactions = useStore((state) => state.platformTransactions);
  const transactionsSearch = useStore((state) => state.transactionsSearch);
  const setTransactionsSearch = useStore((state) => state.setTransactionsSearch);
  
  const transactionsMethodFilter = useStore((state) => state.transactionsMethodFilter);
  const setTransactionsMethodFilter = useStore((state) => state.setTransactionsMethodFilter);
  
  const transactionsStatusFilter = useStore((state) => state.transactionsStatusFilter);
  const setTransactionsStatusFilter = useStore((state) => state.setTransactionsStatusFilter);
  
  const transactionsPeriodFilter = useStore((state) => state.transactionsPeriodFilter);
  const setTransactionsPeriodFilter = useStore((state) => state.setTransactionsPeriodFilter);

  const addPlatformTransaction = useStore((state) => state.addPlatformTransaction);
  const updatePlatformTransactionStatus = useStore((state) => state.updatePlatformTransactionStatus);
  const deletePlatformTransaction = useStore((state) => state.deletePlatformTransaction);

  // Local Component States
  const [isAdding, setIsAdding] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newMethod, setNewMethod] = useState("Visa •••• 4242");
  const [newStatus, setNewStatus] = useState<"Succeeded" | "Pending" | "Failed">("Succeeded");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editStatus, setEditStatus] = useState<"Succeeded" | "Pending" | "Failed">("Succeeded");

  // Sparkline data for cards
  const sparklineData = [
    { value: 400 }, { value: 600 }, { value: 500 }, { value: 900 },
    { value: 800 }, { value: 1200 }, { value: 1000 }, { value: 1400 }
  ];

  // Helper Handlers
  const handleCreateTransaction = () => {
    if (!newUserName.trim() || !newAmount.trim()) return;
    const formattedAmount = newAmount.startsWith("₹") ? newAmount : `₹${parseFloat(newAmount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    const newTxn: PlatformTransaction = {
      id: `TXN-${Math.floor(7000 + Math.random() * 2000)}`,
      user: newUserName,
      amount: formattedAmount,
      method: newMethod,
      status: newStatus,
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }),
    };
    addPlatformTransaction(newTxn);
    setNewUserName("");
    setNewAmount("");
    setNewMethod("Visa •••• 4242");
    setNewStatus("Succeeded");
    setIsAdding(false);
  };

  const startEditing = (idx: number, txn: PlatformTransaction) => {
    setEditingIndex(idx);
    setEditStatus(txn.status);
  };

  const saveEditedStatus = (idx: number) => {
    updatePlatformTransactionStatus(idx, editStatus);
    setEditingIndex(null);
  };

  // Calculations for KPI summaries
  const totalVolume = platformTransactions
    .filter(t => t.status === "Succeeded")
    .reduce((sum, curr) => sum + parseFloat(curr.amount.replace(/[^\d.]/g, "")), 0);

  const averageValue = totalVolume / (platformTransactions.filter(t => t.status === "Succeeded").length || 1);

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
            <span className="text-[#6c5ce7]">Transactions</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 font-display mt-0.5 font-display">Transactions</h1>
          <p className="text-xs text-slate-400 font-light">
            Monitor and manage all financial movements across the platform.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold shadow-sm shadow-[#6c5ce7]/15 transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Transaction</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-semibold transition-all duration-150 cursor-pointer">
            <Download className="w-4 h-4 text-slate-450" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Record Creation Overlay card */}
      {isAdding && (
        <div className="bg-white border border-[#6c5ce7]/20 p-5 rounded-2xl shadow-lg shadow-[#6c5ce7]/5 text-left max-w-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Record New Platform Transaction</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">User / Payer</label>
              <input
                type="text"
                placeholder="e.g. Michael Chen"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#6c5ce7]"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 5400"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#6c5ce7]"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Method</label>
              <select
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-850 focus:outline-none focus:border-[#6c5ce7] cursor-pointer font-medium"
                value={newMethod}
                onChange={(e) => setNewMethod(e.target.value)}
              >
                <option value="Visa •••• 4242">Visa •••• 4242</option>
                <option value="Visa •••• 1099">Visa •••• 1099</option>
                <option value="Mastercard •••• 8812">Mastercard •••• 8812</option>
                <option value="ACH Transfer">ACH Transfer</option>
                <option value="PayPal">PayPal</option>
                <option value="UPI Transfer">UPI Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Status</label>
              <select
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-slate-850 focus:outline-none focus:border-[#6c5ce7] cursor-pointer font-medium"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
              >
                <option value="Succeeded">Succeeded</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
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
              onClick={handleCreateTransaction}
              className="px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold cursor-pointer"
            >
              Add Log
            </button>
          </div>
        </div>
      )}

      {/* ==================== ROW 1: 4 ELGANT WHITE CARD BOXES ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1: Gross Volume */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 text-[#6c5ce7]">
              <DollarSign className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 12.4%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Gross Volume</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                ₹{totalVolume.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

        {/* Card 2: Net Revenue */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-teal-50 text-teal-650">
              <TrendingUp className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 8.6%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Net Revenue</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                ₹{(totalVolume * 0.589).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

        {/* Card 3: Failed Transactions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-rose-50 text-rose-500">
              <AlertTriangle className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-500 border border-rose-100 uppercase tracking-wider">
              High Alert
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Failed Transactions</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                1.2%
              </h3>
            </div>
          </div>
        </div>

        {/* Card 4: Average Order Value */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left relative overflow-hidden min-h-[135px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-amber-50 text-amber-500">
              <CreditCard className="w-4.5 h-4.5" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 flex items-center gap-0.5">
              <span>↗</span> 2.8%
            </span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Average Order Value</span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">
                ₹{averageValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

      </div>

      {/* ==================== LOGS DATA FILTER DIRECTORY ==================== */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden">
        
        {/* Interactive filters bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-slate-800 font-display">Financial Movements</h3>
            <p className="text-[11px] text-slate-400 font-light">Real-time platform billing and payment transactions</p>
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
                value={transactionsSearch}
                onChange={(e) => setTransactionsSearch(e.target.value)}
              />
            </div>

            {/* Methods Select Filter */}
            <select
              className="text-[10px] font-semibold text-slate-655 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
              value={transactionsMethodFilter}
              onChange={(e) => setTransactionsMethodFilter(e.target.value)}
            >
              <option value="ALL">All Payment Methods</option>
              <option value="Visa">Visa Cards</option>
              <option value="Mastercard">Mastercard</option>
              <option value="ACH">ACH Transfer</option>
              <option value="PayPal">PayPal</option>
              <option value="UPI">UPI Transfer</option>
            </select>

            {/* Status Select Filter */}
            <select
              className="text-[10px] font-semibold text-slate-655 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
              value={transactionsStatusFilter}
              onChange={(e) => setTransactionsStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Succeeded">Succeeded</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>

            {/* Period Select Filter */}
            <select
              className="text-[10px] font-semibold text-slate-655 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
              value={transactionsPeriodFilter}
              onChange={(e) => setTransactionsPeriodFilter(e.target.value)}
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Year">This Year</option>
            </select>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-all">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Transactions Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/20">
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">TRANSACTION ID</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">USER</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">AMOUNT</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">METHOD</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">STATUS</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">DATE / TIME</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {platformTransactions
                .filter((txn) => {
                  const matchesSearch =
                    txn.user.toLowerCase().includes(transactionsSearch.toLowerCase()) ||
                    txn.id.toLowerCase().includes(transactionsSearch.toLowerCase());
                  const matchesStatus = transactionsStatusFilter === "ALL" || txn.status === transactionsStatusFilter;
                  
                  const matchesMethod =
                    transactionsMethodFilter === "ALL" ||
                    txn.method.toLowerCase().includes(transactionsMethodFilter.toLowerCase());

                  return matchesSearch && matchesStatus && matchesMethod;
                })
                .map((txn, idx) => (
                  <tr key={txn.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                    <td className="py-3.5 px-6 text-[11px] font-bold text-slate-400">{txn.id}</td>
                    <td className="py-3.5 px-6">
                      <span className="text-[11px] font-bold text-slate-700">{txn.user}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="text-[11px] text-slate-800 font-semibold">{txn.amount}</span>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{txn.method}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      {editingIndex === idx ? (
                        <select
                          className="text-[10px] font-semibold text-slate-650 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value as any)}
                        >
                          <option value="Succeeded">Succeeded</option>
                          <option value="Pending">Pending</option>
                          <option value="Failed">Failed</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider inline-flex items-center leading-none ${
                          txn.status === "Succeeded"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : txn.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : "bg-rose-50 text-rose-600 border border-rose-100"
                        }`}>
                          {txn.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1 text-[11px] text-slate-450 font-light">
                        <Calendar className="w-3.5 h-3.5 text-slate-350 shrink-0" />
                        <span>{txn.date}</span>
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
                              onClick={() => startEditing(idx, txn)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-[#6c5ce7] hover:bg-indigo-50/50 cursor-pointer"
                              title="Modify Status"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deletePlatformTransaction(idx)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 cursor-pointer"
                              title="Delete Transaction"
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
            Showing 1-{platformTransactions.length} of 428 transactions
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
              43
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
