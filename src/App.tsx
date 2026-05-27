import { useStore } from "./store/useStore";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { DashboardView } from "./views/DashboardView";
import { UserManagementView } from "./views/UserManagementView";
import { BookingManagementView } from "./views/BookingManagementView";
import { ServiceManagementView } from "./views/ServiceManagementView";
import { OperationsCenterView } from "./views/OperationsCenterView";
import { EarningsPayoutView } from "./views/EarningsPayoutView";
import { TransactionsView } from "./views/TransactionsView";
import { RefundsView } from "./views/RefundsView";
import { WalletCreditsView } from "./views/WalletCreditsView";
import { CampaignsView } from "./views/CampaignsView";
import { ReferralsView } from "./views/ReferralsView";
import { SupportTicketView } from "./views/SupportTicketView";
import { SosIncidentsView } from "./views/SosIncidentsView";
import { ReviewRatingView } from "./views/ReviewRatingView";
import { AnalyticsView } from "./views/AnalyticsView";
import { ExportDataView } from "./views/ExportDataView";
import { SettingsView } from "./views/SettingsView";
import { AdminManagementView } from "./views/AdminManagementView";
import { ActivityLogsView } from "./views/ActivityLogsView";
import { MaidPartnersView } from "./views/MaidPartnersView";
import { PromotionsView } from "./views/PromotionsView";

function App() {
  const currentView = useStore((state) => state.currentView);

  const renderActiveView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "users":
        return <UserManagementView />;
      case "maid_partners":
        return <MaidPartnersView />;
      case "bookings":
        return <BookingManagementView />;
      case "services":
        return <ServiceManagementView />;
      case "operations":
        return <OperationsCenterView />;
      case "earnings":
        return <EarningsPayoutView />;
      case "transactions":
        return <TransactionsView />;
      case "refunds":
        return <RefundsView />;
      case "wallet":
        return <WalletCreditsView />;
      case "campaigns":
        return <CampaignsView />;
      case "promotions":
        return <PromotionsView />;
      case "referrals":
        return <ReferralsView />;
      case "support":
        return <SupportTicketView />;
      case "sos":
        return <SosIncidentsView />;
      case "reviews":
        return <ReviewRatingView />;
      case "analytics":
        return <AnalyticsView />;
      case "export_data":
        return <ExportDataView />;
      case "settings":
        return <SettingsView />;
      case "admin_management":
        return <AdminManagementView />;
      case "activity_logs":
        return <ActivityLogsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fb] text-slate-800 font-sans antialiased select-none">
      
      {/* 1. Global Dark Sidebar */}
      <Sidebar />

      {/* 2. Main Content Body */}
      <main className="flex-1 pl-64 min-h-screen flex flex-col">
        
        {/* Top Navbar */}
        <Navbar />

        {/* Active Panel View Body */}
        {renderActiveView()}
        
      </main>

    </div>
  );
}

export default App;
