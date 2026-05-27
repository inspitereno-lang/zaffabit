import React from "react";
import { useStore } from "../store/useStore";
import {
  LayoutDashboard,
  Users,
  Award,
  Briefcase,
  Calendar,
  ClipboardList,
  Banknote,
  ArrowRightLeft,
  Undo2,
  Wallet,
  Megaphone,
  Tag,
  Share2,
  LifeBuoy,
  ShieldAlert,
  Star,
  LineChart,
  FileDown,
  Settings,
  ShieldCheck,
  Activity,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const currentView = useStore((state) => state.currentView);
  const setCurrentView = useStore((state) => state.setCurrentView);

  const navSections = [
    {
      label: "MANAGEMENT",
      items: [
        { label: "Users", icon: Users, hasSub: true },
        { label: "Maid Partners", icon: Award, hasSub: true },
        { label: "Operations", icon: Briefcase, hasSub: true },
        { label: "Bookings", icon: Calendar, hasSub: true },
        { label: "Service Management", icon: ClipboardList, hasSub: true },
      ],
    },
    {
      label: "FINANCE",
      items: [
        { label: "Earnings & Payouts", icon: Banknote, hasSub: true },
        { label: "Transactions", icon: ArrowRightLeft, hasSub: true },
        { label: "Refunds", icon: Undo2, hasSub: false },
        { label: "Wallet & Credits", icon: Wallet, hasSub: true },
      ],
    },
    {
      label: "MARKETING",
      items: [
        { label: "Campaigns", icon: Megaphone, hasSub: true },
        { label: "Promotions", icon: Tag, hasSub: true },
        { label: "Referrals", icon: Share2, hasSub: true },
      ],
    },
    {
      label: "SUPPORT & SAFETY",
      items: [
        { label: "Support ticket", icon: LifeBuoy, hasSub: true },
        { label: "SOS & Incidents", icon: ShieldAlert, hasSub: false },
        { label: "Review & Rating", icon: Star, hasSub: false },
      ],
    },
    {
      label: "REPORTS",
      items: [
        { label: "Analytics", icon: LineChart, hasSub: true },
        { label: "Export Data", icon: FileDown, hasSub: true },
      ],
    },
    {
      label: "SYSTEM",
      items: [
        { label: "Settings", icon: Settings, hasSub: true },
        { label: "Admin management", icon: ShieldCheck, hasSub: true },
        { label: "Activity Logs", icon: Activity, hasSub: true },
      ],
    },
  ];

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-[#0f1431] border-r border-[#1e2335]/50 flex flex-col z-20">
      
      {/* Sidebar Brand header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#1e2335]/30">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#6c5ce7] text-white">
          <span className="font-bold text-base font-display">Z</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-white font-display">
            Zafabit
          </span>
          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider -mt-0.5">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5 custom-sidebar-scroll">
        
        {/* Active Dashboard Link */}
        <div className="space-y-1">
          <button
            onClick={() => setCurrentView("dashboard")}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
              currentView === "dashboard"
                ? "bg-[#6c5ce7] text-white shadow-md shadow-[#6c5ce7]/10"
                : "text-slate-400 hover:bg-[#1e2335]/30 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-xs font-semibold">Dashboard</span>
          </button>
        </div>

        {/* Group sections */}
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <h4 className="px-3 text-[9px] font-bold text-slate-500 tracking-wider uppercase">
              {section.label}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item, itemIdx) => {
                const isUsersItem = item.label === "Users" && section.label === "MANAGEMENT";
                const isOperationsItem = item.label === "Operations" && section.label === "MANAGEMENT";
                const isBookingsItem = item.label === "Bookings" && section.label === "MANAGEMENT";
                const isServicesItem = item.label === "Service Management" && section.label === "MANAGEMENT";
                const isEarningsItem = item.label === "Earnings & Payouts" && section.label === "FINANCE";
                const isTransactionsItem = item.label === "Transactions" && section.label === "FINANCE";
                const isRefundsItem = item.label === "Refunds" && section.label === "FINANCE";
                const isWalletItem = item.label === "Wallet & Credits" && section.label === "FINANCE";
                const isCampaignsItem = item.label === "Campaigns" && section.label === "MARKETING";
                const isReferralsItem = item.label === "Referrals" && section.label === "MARKETING";
                const isSupportItem = item.label === "Support ticket" && section.label === "SUPPORT & SAFETY";
                const isSosItem = item.label === "SOS & Incidents" && section.label === "SUPPORT & SAFETY";
                const isReviewsItem = item.label === "Review & Rating" && section.label === "SUPPORT & SAFETY";
                const isAnalyticsItem = item.label === "Analytics" && section.label === "REPORTS";
                const isExportDataItem = item.label === "Export Data" && section.label === "REPORTS";
                const isSettingsItem = item.label === "Settings" && section.label === "SYSTEM";
                const isAdminManagementItem = item.label === "Admin management" && section.label === "SYSTEM";
                const isActivityLogsItem = item.label === "Activity Logs" && section.label === "SYSTEM";
                const isMaidPartnersItem = item.label === "Maid Partners" && section.label === "MANAGEMENT";
                const isPromotionsItem = item.label === "Promotions" && section.label === "MARKETING";

                const isActive = isUsersItem
                  ? currentView === "users"
                  : isOperationsItem
                  ? currentView === "operations"
                  : isBookingsItem
                  ? currentView === "bookings"
                  : isServicesItem
                  ? currentView === "services"
                  : isEarningsItem
                  ? currentView === "earnings"
                  : isTransactionsItem
                  ? currentView === "transactions"
                  : isRefundsItem
                  ? currentView === "refunds"
                  : isWalletItem
                  ? currentView === "wallet"
                  : isCampaignsItem
                  ? currentView === "campaigns"
                  : isReferralsItem
                  ? currentView === "referrals"
                  : isSupportItem
                  ? currentView === "support"
                  : isSosItem
                  ? currentView === "sos"
                  : isReviewsItem
                  ? currentView === "reviews"
                  : isAnalyticsItem
                  ? currentView === "analytics"
                  : isExportDataItem
                  ? currentView === "export_data"
                  : isSettingsItem
                  ? currentView === "settings"
                  : isAdminManagementItem
                  ? currentView === "admin_management"
                  : isActivityLogsItem
                  ? currentView === "activity_logs"
                  : isMaidPartnersItem
                  ? currentView === "maid_partners"
                  : isPromotionsItem
                  ? currentView === "promotions"
                  : false;

                return (
                  <button
                    key={itemIdx}
                    onClick={() => {
                      if (isUsersItem) {
                        setCurrentView("users");
                      } else if (isOperationsItem) {
                        setCurrentView("operations");
                      } else if (isBookingsItem) {
                        setCurrentView("bookings");
                      } else if (isServicesItem) {
                        setCurrentView("services");
                      } else if (isEarningsItem) {
                        setCurrentView("earnings");
                      } else if (isTransactionsItem) {
                        setCurrentView("transactions");
                      } else if (isRefundsItem) {
                        setCurrentView("refunds");
                      } else if (isWalletItem) {
                        setCurrentView("wallet");
                      } else if (isCampaignsItem) {
                        setCurrentView("campaigns");
                      } else if (isReferralsItem) {
                        setCurrentView("referrals");
                      } else if (isSupportItem) {
                        setCurrentView("support");
                      } else if (isSosItem) {
                        setCurrentView("sos");
                      } else if (isReviewsItem) {
                        setCurrentView("reviews");
                      } else if (isAnalyticsItem) {
                        setCurrentView("analytics");
                      } else if (isExportDataItem) {
                        setCurrentView("export_data");
                      } else if (isSettingsItem) {
                        setCurrentView("settings");
                      } else if (isAdminManagementItem) {
                        setCurrentView("admin_management");
                      } else if (isActivityLogsItem) {
                        setCurrentView("activity_logs");
                      } else if (isMaidPartnersItem) {
                        setCurrentView("maid_partners");
                      } else if (isPromotionsItem) {
                        setCurrentView("promotions");
                      }
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-[#6c5ce7] text-white shadow-md shadow-[#6c5ce7]/10"
                        : "text-slate-400 hover:bg-[#1e2335]/30 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium">{item.label}</span>
                    </div>
                    {item.hasSub && (
                      <ChevronRight className="w-3 h-3 opacity-50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Profile Card Footer */}
      <div className="p-4 border-t border-[#1e2335]/30 bg-[#070910]">
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
              alt="Anitha R."
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-semibold text-xs text-white truncate leading-none">
              Anitha R.
            </span>
            <span className="text-[9px] text-slate-500 truncate mt-1">
              Super Admin
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </aside>
  );
};
