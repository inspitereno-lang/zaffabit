import React, { useState } from "react";
import { useStore } from "../store/useStore";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  SlidersHorizontal,
  Calendar,
  List,
  Sparkles,
  Clock,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

export const BookingManagementView: React.FC = () => {
  const bookings = useStore((state) => state.bookings);
  const addBooking = useStore((state) => state.addBooking);
  const updateBooking = useStore((state) => state.updateBooking);
  const deleteBooking = useStore((state) => state.deleteBooking);

  const bookingSearch = useStore((state) => state.bookingSearch);
  const setBookingSearch = useStore((state) => state.setBookingSearch);
  const bookingServiceFilter = useStore((state) => state.bookingServiceFilter);
  const setBookingServiceFilter = useStore((state) => state.setBookingServiceFilter);
  const bookingStatusFilter = useStore((state) => state.bookingStatusFilter);
  const setBookingStatusFilter = useStore((state) => state.setBookingStatusFilter);
  const bookingViewMode = useStore((state) => state.bookingViewMode);
  const setBookingViewMode = useStore((state) => state.setBookingViewMode);

  // Local editing states
  const [editingBookingIndex, setEditingBookingIndex] = useState<number | null>(null);
  const [editBookingCustomer, setEditBookingCustomer] = useState("");
  const [editBookingService, setEditBookingService] = useState("");
  const [editBookingTime, setEditBookingTime] = useState("");
  const [editBookingStatus, setEditBookingStatus] = useState("Pending");
  const [editBookingAmount, setEditBookingAmount] = useState("");

  const handleEditBookingClick = (index: number) => {
    setEditingBookingIndex(index);
    setEditBookingCustomer(bookings[index].customer);
    setEditBookingService(bookings[index].service);
    setEditBookingTime(bookings[index].scheduledTime);
    setEditBookingStatus(bookings[index].status);
    setEditBookingAmount(bookings[index].amount);
  };

  const handleSaveBookingClick = (index: number) => {
    if (!editBookingCustomer.trim()) return;
    updateBooking(index, {
      id: bookings[index].id,
      customer: editBookingCustomer,
      service: editBookingService,
      scheduledTime: editBookingTime || "Oct 28, 2023 • 10:00 AM",
      status: editBookingStatus,
      amount: editBookingAmount.startsWith("₹") ? editBookingAmount : `₹${editBookingAmount}`,
    });
    setEditingBookingIndex(null);
  };

  const handleAddBookingClick = () => {
    const newBookingId = `ZB-${Math.floor(9000 + Math.random() * 1000)}`;
    const newBooking = {
      id: newBookingId,
      customer: "New Customer Name",
      service: "Deep Clean",
      scheduledTime: "Oct 28, 2023 • 10:00 AM",
      status: "Pending",
      amount: "₹240.00",
    };
    addBooking(newBooking);
    setEditingBookingIndex(0); // Focus editing index on the new top booking
    setEditBookingCustomer(newBooking.customer);
    setEditBookingService(newBooking.service);
    setEditBookingTime(newBooking.scheduledTime);
    setEditBookingStatus(newBooking.status);
    setEditBookingAmount(newBooking.amount);
  };

  // Calendar Day Generator for October 2023
  const getDaysInMonth = () => {
    const days = [];
    // October 2023 starts on a Sunday (day 0) and has 31 days.
    // 0 blank slots needed before day 1!
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  };

  const getBookingsForDay = (day: number) => {
    const targetDateStr = `Oct ${String(day).padStart(2, "0")}`;
    return bookings.filter(b => b.scheduledTime.includes(targetDateStr));
  };

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
      
      {/* Breadcrumb & Title */}
      <div className="flex flex-col text-left gap-1">
        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
          <span>Dashboard</span>
          <span className="opacity-50">/</span>
          <span className="text-slate-500">Bookings Management</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-lg font-bold text-slate-900 font-display">Bookings Management</h1>
            <p className="text-xs text-slate-400 font-light">
              Efficiently manage and track all your scheduled service sessions.
            </p>
          </div>
          <button
            onClick={handleAddBookingClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold shadow-sm shadow-[#6c5ce7]/15 transition-all duration-150 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Booking</span>
          </button>
        </div>
      </div>

      {/* ==================== 4 KPI CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: TOTAL BOOKINGS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 text-[#6c5ce7]">
              <Sparkles className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 12.5%
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">1,284</h3>
          </div>
        </div>

        {/* Card 2: PENDING BOOKINGS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-amber-50 text-amber-500">
              <Clock className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600">
              48 Today
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pending Bookings</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">64</h3>
          </div>
        </div>

        {/* Card 3: REVENUE */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
              <CreditCard className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 8.2%
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">₹42,910</h3>
          </div>
        </div>

        {/* Card 4: CANCELLED */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-rose-50 text-rose-500">
              <AlertTriangle className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">
              -1.5%
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Cancelled Bookings</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">12</h3>
          </div>
        </div>
      </div>

      {/* ==================== WIDGET MAIN PANEL ==================== */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden">
        
        {/* Header containing Filters & Toggle Switches */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-slate-800 font-display">Service Schedule</h3>
            <p className="text-[11px] text-slate-400 font-light">Monitor booking request flows, customer details, and dates.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle Switch */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-0.5">
              <button
                onClick={() => setBookingViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold transition-all duration-150 cursor-pointer ${
                  bookingViewMode === "table" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setBookingViewMode("calendar")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold transition-all duration-150 cursor-pointer ${
                  bookingViewMode === "calendar" ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Calendar</span>
              </button>
            </div>

            {/* Filters (Search Box) */}
            <div className="relative min-w-[200px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search by ID or Name..."
                className="pl-9 pr-4 py-1.5 w-full text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6c5ce7] focus:border-[#6c5ce7] placeholder:text-slate-400 text-slate-800 transition-colors"
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
              />
            </div>

            {/* Service Filter */}
            <select
              className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
              value={bookingServiceFilter}
              onChange={(e) => setBookingServiceFilter(e.target.value)}
            >
              <option value="ALL">All Services</option>
              <option value="Deep Clean">Deep Clean</option>
              <option value="Maintenance">Maintenance</option>
              <option value="General Support">General Support</option>
              <option value="Sweep & Mop">Sweep & Mop</option>
              <option value="Dish Washing">Dish Washing</option>
            </select>

            {/* Status Filter */}
            <select
              className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#6c5ce7] cursor-pointer"
              value={bookingStatusFilter}
              onChange={(e) => setBookingStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter & Export</span>
            </button>
          </div>
        </div>

        {/* View Mode Switching */}
        {bookingViewMode === "table" ? (
          /* ==================== 1. DETAIL LIST TABLE VIEW ==================== */
          <div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/30">
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">BOOKING ID</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">CUSTOMER</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">SERVICE</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">SCHEDULED TIME</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">STATUS</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">AMOUNT</th>
                    <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    .filter((b) => {
                      const matchesSearch =
                        b.customer.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                        b.id.toLowerCase().includes(bookingSearch.toLowerCase());
                      const matchesService = bookingServiceFilter === "ALL" || b.service === bookingServiceFilter;
                      const matchesStatus = bookingStatusFilter === "ALL" || b.status === bookingStatusFilter;
                      return matchesSearch && matchesService && matchesStatus;
                    })
                    .map((b, idx) => (
                      <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                        {editingBookingIndex === idx ? (
                          <>
                            <td className="py-3 px-6 text-[11px] font-bold text-slate-400">{b.id}</td>
                            <td className="py-3 px-6">
                              <input
                                className="w-full text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                                value={editBookingCustomer}
                                onChange={(e) => setEditBookingCustomer(e.target.value)}
                              />
                            </td>
                            <td className="py-3 px-6">
                              <select
                                className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-1.5 py-1 focus:outline-none focus:border-[#6c5ce7]"
                                value={editBookingService}
                                onChange={(e) => setEditBookingService(e.target.value)}
                              >
                                <option value="Deep Clean">Deep Clean</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="General Support">General Support</option>
                                <option value="Sweep & Mop">Sweep & Mop</option>
                                <option value="Dish Washing">Dish Washing</option>
                              </select>
                            </td>
                            <td className="py-3 px-6">
                              <input
                                className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                                value={editBookingTime}
                                onChange={(e) => setEditBookingTime(e.target.value)}
                              />
                            </td>
                            <td className="py-3 px-6">
                              <select
                                className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-1.5 py-1 focus:outline-none focus:border-[#6c5ce7]"
                                value={editBookingStatus}
                                onChange={(e) => setEditBookingStatus(e.target.value)}
                              >
                                <option value="Completed">Completed</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3 px-6">
                              <input
                                className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                                value={editBookingAmount}
                                onChange={(e) => setEditBookingAmount(e.target.value)}
                              />
                            </td>
                            <td className="py-3 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleSaveBookingClick(idx)}
                                  className="p-1.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100/60 cursor-pointer"
                                  title="Save Changes"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setEditingBookingIndex(null)}
                                  className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100/60 cursor-pointer"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3.5 px-6 text-[11px] font-bold text-slate-400">{b.id}</td>
                            <td className="py-3.5 px-6">
                              <span className="text-[11px] font-bold text-slate-700">{b.customer}</span>
                            </td>
                            <td className="py-3.5 px-6 text-[11px] text-slate-500 font-semibold">{b.service}</td>
                            <td className="py-3.5 px-6 text-[11px] text-slate-400 font-light">{b.scheduledTime}</td>
                            <td className="py-3.5 px-6">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider leading-none inline-flex items-center ${
                                b.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : b.status === "Pending"
                                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                                  : "bg-rose-50 text-rose-600 border border-rose-100"
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-6 text-[11px] font-bold text-slate-800">{b.amount}</td>
                            <td className="py-3.5 px-6 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleEditBookingClick(idx)}
                                  className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-[#6c5ce7] hover:bg-indigo-50/50 cursor-pointer"
                                  title="Edit Booking"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteBooking(idx)}
                                  className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 cursor-pointer"
                                  title="Delete Booking"
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

            {/* Table Pagination */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 bg-slate-50/10">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Showing 1-{bookings.length} of 1,284 Bookings
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
                  5
                </button>
                <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 cursor-pointer font-bold">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ==================== 2. HIGH-END CALENDAR VIEW (OCTOBER 2023) ==================== */
          <div className="p-6">
            
            {/* Calendar header with months selection */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-700">October 2023</h3>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 rounded bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-400 hover:bg-slate-100 cursor-pointer">
                  &lt; Prev
                </button>
                <span className="text-xs font-bold text-slate-600 px-3">October 2023</span>
                <button className="px-3 py-1 rounded bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-400 hover:bg-slate-100 cursor-pointer">
                  Next &gt;
                </button>
              </div>
            </div>

            {/* Day titles */}
            <div className="grid grid-cols-7 gap-3 mb-2">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => (
                <div key={i} className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1 bg-slate-50 rounded-lg">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Days Oct 1-31 (Oct 2023 starts on Sunday, so 0 offset boxes!) */}
            <div className="grid grid-cols-7 gap-3">
              {getDaysInMonth().map((day) => {
                const dayBookings = getBookingsForDay(day);
                
                return (
                  <div
                    key={day}
                    className="min-h-[90px] border border-slate-100 hover:border-[#6c5ce7]/50 rounded-xl p-2.5 flex flex-col justify-between transition-colors bg-white text-left relative"
                  >
                    {/* Day number */}
                    <span className="text-[11px] font-bold text-slate-700">{day}</span>
                    
                    {/* Day Event tag metrics list */}
                    <div className="flex-1 mt-2 space-y-1 overflow-y-auto max-h-[55px] custom-sidebar-scroll">
                      {dayBookings.slice(0, 3).map((b, idx) => (
                        <div
                          key={idx}
                          className={`text-[8px] font-bold px-1 py-0.5 rounded truncate border leading-tight ${
                            b.status === "Completed"
                              ? "bg-emerald-50/50 text-emerald-600 border-emerald-100"
                              : b.status === "Pending"
                              ? "bg-amber-50/50 text-amber-600 border-amber-100"
                              : "bg-rose-50/50 text-rose-600 border-rose-100"
                          }`}
                          title={`${b.customer} - ${b.service}`}
                        >
                          {b.customer.split(" ")[0]}: {b.service}
                        </div>
                      ))}
                      {dayBookings.length > 3 && (
                        <div className="text-[7px] text-slate-400 font-bold text-center">
                          +{dayBookings.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
