import React from "react";
import { useStore } from "../store/useStore";
import { Search, Calendar, ChevronDown, Bell, SlidersHorizontal } from "lucide-react";

export const Navbar: React.FC = () => {
  const currentView = useStore((state) => state.currentView);
  const userSearch = useStore((state) => state.userSearch);
  const setUserSearch = useStore((state) => state.setUserSearch);
  const operationsSearch = useStore((state) => state.operationsSearch);
  const setOperationsSearch = useStore((state) => state.setOperationsSearch);

  const getPageTitle = () => {
    switch (currentView) {
      case "dashboard":
        return "Dashboard";
      case "users":
        return "User Management";
      case "operations":
        return "Operations Center";
      case "bookings":
        return "Bookings Management";
      case "services":
        return "Service Management";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-3 bg-white border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
      
      {/* Header left breadcrumbs */}
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold text-slate-900 tracking-tight font-display text-left">
          {getPageTitle()}
        </h2>
      </div>

      {/* Search bar & utilities */}
      <div className="flex items-center gap-3">
        
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder={
              currentView === "dashboard"
                ? "Search by booking ID, name, phone..."
                : currentView === "users"
                ? "Search users, roles or logs..."
                : currentView === "operations"
                ? "Search partners, regions, or earnings..."
                : currentView === "bookings"
                ? "Search bookings or customers..."
                : "Search service catalogs..."
            }
            value={
              currentView === "dashboard"
                ? ""
                : currentView === "users"
                ? userSearch
                : currentView === "operations"
                ? operationsSearch
                : ""
            }
            disabled={currentView === "dashboard" || currentView === "bookings" || currentView === "services"}
            onChange={(e) => {
              if (currentView === "users") {
                setUserSearch(e.target.value);
              } else if (currentView === "operations") {
                setOperationsSearch(e.target.value);
              }
            }}
            className="w-72 pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-slate-200 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
          />
        </div>

        {currentView === "operations" && (
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold shadow-sm shadow-[#6c5ce7]/10 transition-colors cursor-pointer">
            <span>Add Partner</span>
          </button>
        )}

        {/* Date Picker Card */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-100 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>14 May 2025</span>
          <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
        </button>

        {/* Notification bell */}
        <button className="p-2 rounded-lg border border-slate-100 bg-white text-slate-600 hover:bg-slate-50 relative cursor-pointer">
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></span>
        </button>

        {/* Filters Button */}
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-xs font-semibold shadow-sm shadow-[#6c5ce7]/15 cursor-pointer">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
        </button>
      </div>
    </header>
  );
};
