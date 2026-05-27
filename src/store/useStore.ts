import { create } from "zustand";

export interface User {
  email: string;
  phone: string;
  location: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  joinDate: string;
}

export interface Booking {
  id: string;
  customer: string;
  service: string;
  scheduledTime: string;
  status: string;
  amount: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  basePrice: string;
  peakPrice: string;
  status: boolean;
}

export interface LiveRequest {
  id: string;
  service: string;
  customer: string;
  location: string;
  time: string;
  priority: string;
  theme: string;
}

export interface ActiveJob {
  id: string;
  service: string;
  customer: string;
  phone: string;
  location: string;
  timeRange: string;
  timeDetail: string;
  timeDetailColor: string;
  maid: string;
  rating: string;
  status: string;
  tab: "assigned" | "inProgress" | "nearCompletion" | "delayed";
}

export interface PayoutTransaction {
  id: string;
  partner: string;
  amount: string;
  status: "PAID" | "PENDING" | "FAILED";
  scheduledDate: string;
}

export interface PlatformTransaction {
  id: string;
  user: string;
  amount: string;
  method: string;
  status: "Succeeded" | "Pending" | "Failed";
  date: string;
}

export interface PlatformRefund {
  id: string;
  user: string;
  amount: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

export interface WalletLedgerItem {
  id: string;
  type: "Credit Added" | "Wallet Refund" | "Deduction";
  amount: string;
  status: "Completed" | "Pending" | "Rejected";
  date: string;
}

export interface UserWalletInfo {
  userId: string;
  user: string;
  tier: string;
  balance: string;
  creditsIssued: string;
  lastUsed: string;
  frozen: boolean;
  timeline: string[];
}

export interface PlatformCampaign {
  id: string;
  name: string;
  budget: string;
  reach: string;
  conversions: string;
  ctr: string;
  status: "Active" | "Paused" | "Completed";
  date: string;
}

export interface CampaignActivity {
  id: string;
  action: string;
  user: string;
  date: string;
}

interface AppStore {
  // Navigation
  currentView: "dashboard" | "users" | "operations" | "bookings" | "services" | "earnings" | "transactions" | "refunds" | "wallet" | "campaigns" | "promotions" | "referrals" | "support" | "sos" | "reviews" | "analytics" | "export_data" | "settings" | "admin_management" | "activity_logs" | "maid_partners";
  setCurrentView: (view: "dashboard" | "users" | "operations" | "bookings" | "services" | "earnings" | "transactions" | "refunds" | "wallet" | "campaigns" | "promotions" | "referrals" | "support" | "sos" | "reviews" | "analytics" | "export_data" | "settings" | "admin_management" | "activity_logs" | "maid_partners") => void;

  // User Management
  users: User[];
  userSearch: string;
  setUserSearch: (search: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  addUser: (user: User) => void;
  updateUser: (index: number, updatedUser: User) => void;
  deleteUser: (index: number) => void;

  // Booking Management
  bookings: Booking[];
  bookingSearch: string;
  setBookingSearch: (search: string) => void;
  bookingServiceFilter: string;
  setBookingServiceFilter: (filter: string) => void;
  bookingStatusFilter: string;
  setBookingStatusFilter: (filter: string) => void;
  bookingViewMode: "table" | "calendar";
  setBookingViewMode: (mode: "table" | "calendar") => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (index: number, updatedBooking: Booking) => void;
  deleteBooking: (index: number) => void;

  // Service Management Catalog
  servicesCatalog: ServiceItem[];
  serviceSearch: string;
  setServiceSearch: (search: string) => void;
  serviceCategoryFilter: string;
  setServiceCategoryFilter: (filter: string) => void;
  addService: (service: ServiceItem) => void;
  updateService: (index: number, updatedService: ServiceItem) => void;
  deleteService: (index: number) => void;
  toggleServiceStatus: (index: number) => void;

  // Operations Hub
  operationsSearch: string;
  setOperationsSearch: (search: string) => void;
  activeJobTab: "assigned" | "inProgress" | "nearCompletion" | "delayed";
  setActiveJobTab: (tab: "assigned" | "inProgress" | "nearCompletion" | "delayed") => void;
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  opsLiveRequests: LiveRequest[];
  removeLiveRequest: (id: string) => void;
  activeJobs: ActiveJob[];
  addActiveJob: (job: ActiveJob) => void;
  updateJobStatus: (id: string, newStatus: string, newTab: "assigned" | "inProgress" | "nearCompletion" | "delayed") => void;
  assignMaidToJob: (id: string, maidName: string) => void;

  // Earnings & Payouts
  earningsSearch: string;
  setEarningsSearch: (search: string) => void;
  earningsStatusFilter: string;
  setEarningsStatusFilter: (filter: string) => void;
  payoutTransactions: PayoutTransaction[];
  addPayoutTransaction: (transaction: PayoutTransaction) => void;
  updatePayoutStatus: (index: number, status: "PAID" | "PENDING" | "FAILED") => void;
  deletePayoutTransaction: (index: number) => void;

  // Transactions View State
  transactionsSearch: string;
  setTransactionsSearch: (search: string) => void;
  transactionsMethodFilter: string;
  setTransactionsMethodFilter: (filter: string) => void;
  transactionsStatusFilter: string;
  setTransactionsStatusFilter: (filter: string) => void;
  transactionsPeriodFilter: string;
  setTransactionsPeriodFilter: (filter: string) => void;
  platformTransactions: PlatformTransaction[];
  addPlatformTransaction: (transaction: PlatformTransaction) => void;
  updatePlatformTransactionStatus: (index: number, status: "Succeeded" | "Pending" | "Failed") => void;
  deletePlatformTransaction: (index: number) => void;

  // Refunds View State
  refundSearch: string;
  setRefundSearch: (search: string) => void;
  refundStatusFilter: string;
  setRefundStatusFilter: (filter: string) => void;
  platformRefunds: PlatformRefund[];
  addPlatformRefund: (refund: PlatformRefund) => void;
  updateRefundStatus: (index: number, status: "Pending" | "Approved" | "Rejected") => void;
  deletePlatformRefund: (index: number) => void;

  // Wallet View State
  walletSearch: string;
  setWalletSearch: (search: string) => void;
  walletLedger: WalletLedgerItem[];
  addWalletLedgerItem: (item: WalletLedgerItem) => void;
  updateLedgerStatus: (index: number, status: "Completed" | "Pending" | "Rejected") => void;
  deleteLedgerItem: (index: number) => void;
  selectedUserWallet: UserWalletInfo;
  setSelectedUserWallet: (info: UserWalletInfo) => void;
  updateSelectedUserWalletBalance: (balance: string) => void;
  toggleSelectedUserWalletFrozen: () => void;

  // Campaigns View State
  campaignSearch: string;
  setCampaignSearch: (search: string) => void;
  campaignsList: PlatformCampaign[];
  addCampaign: (campaign: PlatformCampaign) => void;
  updateCampaignStatus: (index: number, status: "Active" | "Paused" | "Completed") => void;
  deleteCampaign: (index: number) => void;
  campaignActivities: CampaignActivity[];
  addCampaignActivity: (act: CampaignActivity) => void;
}

export const useStore = create<AppStore>((set) => ({
  // Navigation
  currentView: "dashboard",
  setCurrentView: (view) => set({ currentView: view }),

  // Campaigns Initial State
  campaignSearch: "",
  setCampaignSearch: (search) => set({ campaignSearch: search }),
  campaignsList: [
    { id: "CMP-001", name: "Summer Cleaning Blitz", budget: "₹45,000.00", reach: "245,000", conversions: "2,840", ctr: "5.12%", status: "Active", date: "Oct 24, 2023" },
    { id: "CMP-002", name: "Festive Home Glow", budget: "₹78,000.00", reach: "612,000", conversions: "7,890", ctr: "6.24%", status: "Active", date: "Oct 22, 2023" },
    { id: "CMP-003", name: "Weekly Dust-off Promo", budget: "₹12,500.00", reach: "89,400", conversions: "920", ctr: "3.85%", status: "Paused", date: "Oct 20, 2023" },
    { id: "CMP-004", name: "VIP Elite Rewards", budget: "₹35,000.00", reach: "150,000", conversions: "1,550", ctr: "4.10%", status: "Completed", date: "Oct 15, 2023" },
    { id: "CMP-005", name: "Eco-Friendly Maid Ads", budget: "₹22,000.00", reach: "98,000", conversions: "1,120", ctr: "4.55%", status: "Active", date: "Oct 12, 2023" },
  ],
  addCampaign: (campaign) => set((state) => ({ campaignsList: [campaign, ...state.campaignsList] })),
  updateCampaignStatus: (index, status) => set((state) => {
    const updated = [...state.campaignsList];
    updated[index] = { ...updated[index], status };
    return { campaignsList: updated };
  }),
  deleteCampaign: (index) => set((state) => ({
    campaignsList: state.campaignsList.filter((_, i) => i !== index),
  })),
  campaignActivities: [
    { id: "ACT-001", action: "Updated bid strategy to \"Max Conversions\"", user: "Jane Doe", date: "2 mins ago" },
    { id: "ACT-002", action: "Uploaded 12 new creative assets", user: "Mike Ross", date: "45 mins ago" },
    { id: "ACT-003", action: "Campaign paused due to budget cap", user: "System Bot", date: "2 hours ago" },
  ],
  addCampaignActivity: (act) => set((state) => ({ campaignActivities: [act, ...state.campaignActivities] })),

  // Wallet Initial State
  walletSearch: "",
  setWalletSearch: (search) => set({ walletSearch: search }),
  walletLedger: [
    { id: "TXN-8821", type: "Credit Added", amount: "+₹2,450.00", status: "Completed", date: "Oct 24, 2023 - 14:20" },
    { id: "TXN-8822", type: "Wallet Refund", amount: "+₹820.00", status: "Pending", date: "Oct 24, 2023 - 12:45" },
    { id: "TXN-8823", type: "Deduction", amount: "-₹1,200.00", status: "Completed", date: "Oct 24, 2023 - 09:12" },
    { id: "TXN-8824", type: "Credit Added", amount: "+₹1,500.00", status: "Completed", date: "Oct 23, 2023 - 16:30" },
    { id: "TXN-8825", type: "Deduction", amount: "-₹450.00", status: "Completed", date: "Oct 22, 2023 - 11:15" },
    { id: "TXN-8826", type: "Wallet Refund", amount: "+₹320.00", status: "Rejected", date: "Oct 21, 2023 - 10:00" },
  ],
  addWalletLedgerItem: (item) => set((state) => ({ walletLedger: [item, ...state.walletLedger] })),
  updateLedgerStatus: (index, status) => set((state) => {
    const updated = [...state.walletLedger];
    updated[index] = { ...updated[index], status };
    return { walletLedger: updated };
  }),
  deleteLedgerItem: (index) => set((state) => ({
    walletLedger: state.walletLedger.filter((_, i) => i !== index),
  })),
  selectedUserWallet: {
    userId: "9942",
    user: "Sarah Koven",
    tier: "Silver Loyalty Member",
    balance: "₹14,250.00",
    creditsIssued: "₹2,450.00",
    lastUsed: "2 hours ago",
    frozen: false,
    timeline: [
      "System Issued Credits: ₹2,450.00 added",
      "Refund Processed: ₹820.00 approved",
      "TXN-4421 approved by Admin",
    ],
  },
  setSelectedUserWallet: (info) => set({ selectedUserWallet: info }),
  updateSelectedUserWalletBalance: (balance) => set((state) => ({
    selectedUserWallet: { ...state.selectedUserWallet, balance }
  })),
  toggleSelectedUserWalletFrozen: () => set((state) => ({
    selectedUserWallet: { ...state.selectedUserWallet, frozen: !state.selectedUserWallet.frozen }
  })),

  // Refunds Initial State
  refundSearch: "",
  setRefundSearch: (search) => set({ refundSearch: search }),
  refundStatusFilter: "ALL",
  setRefundStatusFilter: (filter) => set({ refundStatusFilter: filter }),
  platformRefunds: [
    { id: "RFD-9901", user: "Sarah Jenkins", amount: "₹240.00", reason: "Cancellation", status: "Pending", date: "Oct 24, 2023, 02:45 PM" },
    { id: "RFD-9902", user: "Michael Ross", amount: "₹85.50", reason: "Double Charge", status: "Approved", date: "Oct 24, 2023, 01:12 PM" },
    { id: "RFD-9903", user: "Emma Wilson", amount: "₹1,120.00", reason: "Quality Issue", status: "Rejected", date: "Oct 22, 2023, 11:30 PM" },
    { id: "RFD-9904", user: "John Smith", amount: "₹450.00", reason: "Cancellation", status: "Pending", date: "Oct 21, 2023, 10:00 AM" },
    { id: "RFD-9905", user: "Sneha Nair", amount: "₹650.00", reason: "Service Delay", status: "Approved", date: "Oct 20, 2023, 09:15 AM" },
    { id: "RFD-9906", user: "Rahul Menon", amount: "₹320.00", reason: "Cancellation", status: "Approved", date: "Oct 19, 2023, 04:30 PM" },
    { id: "RFD-9907", user: "Elena Rodriguez", amount: "₹980.00", reason: "Quality Issue", status: "Rejected", date: "Oct 18, 2023, 11:45 AM" },
  ],
  addPlatformRefund: (refund) => set((state) => ({ platformRefunds: [refund, ...state.platformRefunds] })),
  updateRefundStatus: (index, status) => set((state) => {
    const updated = [...state.platformRefunds];
    updated[index] = { ...updated[index], status };
    return { platformRefunds: updated };
  }),
  deletePlatformRefund: (index) => set((state) => ({
    platformRefunds: state.platformRefunds.filter((_, i) => i !== index),
  })),

  // Transactions Initial State
  transactionsSearch: "",
  setTransactionsSearch: (search) => set({ transactionsSearch: search }),
  transactionsMethodFilter: "ALL",
  setTransactionsMethodFilter: (filter) => set({ transactionsMethodFilter: filter }),
  transactionsStatusFilter: "ALL",
  setTransactionsStatusFilter: (filter) => set({ transactionsStatusFilter: filter }),
  transactionsPeriodFilter: "Last 30 Days",
  setTransactionsPeriodFilter: (filter) => set({ transactionsPeriodFilter: filter }),
  platformTransactions: [
    { id: "TXN-7201", user: "Sarah Jenkins", amount: "₹1,240.00", method: "Visa •••• 4242", status: "Succeeded", date: "Oct 24, 2023, 02:45 PM" },
    { id: "TXN-7202", user: "Michael Chen", amount: "₹5,400.00", method: "ACH Transfer", status: "Pending", date: "Oct 24, 2023, 01:12 PM" },
    { id: "TXN-7203", user: "Emma Watson", amount: "₹89.00", method: "PayPal", status: "Failed", date: "Oct 23, 2023, 11:30 PM" },
    { id: "TXN-7204", user: "Anitha R.", amount: "₹1,500.00", method: "UPI Transfer", status: "Succeeded", date: "Oct 22, 2023, 09:15 AM" },
    { id: "TXN-7205", user: "Sneha Nair", amount: "₹2,100.00", method: "Mastercard •••• 8812", status: "Succeeded", date: "Oct 21, 2023, 04:30 PM" },
    { id: "TXN-7206", user: "Rahul Menon", amount: "₹3,450.00", method: "ACH Transfer", status: "Pending", date: "Oct 20, 2023, 10:00 AM" },
    { id: "TXN-7207", user: "Elena Rodriguez", amount: "₹890.00", method: "Visa •••• 1099", status: "Failed", date: "Oct 19, 2023, 11:45 AM" },
    { id: "TXN-7208", user: "Linda McCarty", amount: "₹620.00", method: "PayPal", status: "Succeeded", date: "Oct 18, 2023, 03:22 PM" },
  ],
  addPlatformTransaction: (transaction) => set((state) => ({ platformTransactions: [transaction, ...state.platformTransactions] })),
  updatePlatformTransactionStatus: (index, status) => set((state) => {
    const updated = [...state.platformTransactions];
    updated[index] = { ...updated[index], status };
    return { platformTransactions: updated };
  }),
  deletePlatformTransaction: (index) => set((state) => ({
    platformTransactions: state.platformTransactions.filter((_, i) => i !== index),
  })),

  // Earnings & Payouts Initial State
  earningsSearch: "",
  setEarningsSearch: (search) => set({ earningsSearch: search }),
  earningsStatusFilter: "ALL",
  setEarningsStatusFilter: (filter) => set({ earningsStatusFilter: filter }),
  payoutTransactions: [
    { id: "TXN-8801", partner: "Sarah Jenkins", amount: "₹1,450.00", status: "PAID", scheduledDate: "Oct 25, 2023" },
    { id: "TXN-8802", partner: "Elena Rodriguez", amount: "₹2,840.50", status: "PENDING", scheduledDate: "Oct 26, 2023" },
    { id: "TXN-8803", partner: "Jessica Thorne", amount: "₹912.40", status: "FAILED", scheduledDate: "Oct 23, 2023" },
    { id: "TXN-8804", partner: "Linda McCarty", amount: "₹842.00", status: "PAID", scheduledDate: "Oct 23, 2023" },
    { id: "TXN-8805", partner: "Anitha R.", amount: "₹1,200.50", status: "PENDING", scheduledDate: "Oct 25, 2023" },
    { id: "TXN-8806", partner: "Reshma K.", amount: "₹450.00", status: "PAID", scheduledDate: "Oct 24, 2023" },
    { id: "TXN-8807", partner: "Jancy P.", amount: "₹2,100.00", status: "FAILED", scheduledDate: "Oct 22, 2023" },
    { id: "TXN-8808", partner: "Asha B.", amount: "₹735.25", status: "PAID", scheduledDate: "Oct 23, 2023" },
  ],
  addPayoutTransaction: (transaction) => set((state) => ({ payoutTransactions: [transaction, ...state.payoutTransactions] })),
  updatePayoutStatus: (index, status) => set((state) => {
    const updated = [...state.payoutTransactions];
    updated[index] = { ...updated[index], status };
    return { payoutTransactions: updated };
  }),
  deletePayoutTransaction: (index) => set((state) => ({
    payoutTransactions: state.payoutTransactions.filter((_, i) => i !== index),
  })),

  // User Management Initial State
  users: [
    {
      email: "jane.cooper@example.com",
      phone: "(270) 555-0117",
      location: "New York, USA",
      status: "ACTIVE",
      joinDate: "Jan 12, 2024",
    },
    {
      email: "cody.fisher@example.com",
      phone: "(603) 555-0123",
      location: "San Francisco, USA",
      status: "INACTIVE",
      joinDate: "Feb 05, 2024",
    },
    {
      email: "esther.h@example.com",
      phone: "(208) 555-0112",
      location: "London, UK",
      status: "PENDING",
      joinDate: "Mar 15, 2024",
    },
  ],
  userSearch: "",
  setUserSearch: (search) => set({ userSearch: search }),
  statusFilter: "ALL",
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (index, updatedUser) =>
    set((state) => {
      const updated = [...state.users];
      updated[index] = updatedUser;
      return { users: updated };
    }),
  deleteUser: (index) =>
    set((state) => ({
      users: state.users.filter((_, i) => i !== index),
    })),

  // Booking Management Initial State
  bookings: [
    {
      id: "ZB-9102",
      customer: "Sarah Connor",
      service: "Deep Clean",
      scheduledTime: "Oct 28, 2023 • 09:00 AM",
      status: "Completed",
      amount: "₹240.00",
    },
    {
      id: "ZB-9103",
      customer: "Marcus Wright",
      service: "Maintenance",
      scheduledTime: "Oct 29, 2023 • 02:30 PM",
      status: "Pending",
      amount: "₹185.00",
    },
    {
      id: "ZB-9104",
      customer: "Elena Fisher",
      service: "General Support",
      scheduledTime: "Oct 30, 2023 • 11:15 AM",
      status: "Cancelled",
      amount: "₹90.00",
    },
    {
      id: "ZB-9105",
      customer: "Julianne Moore",
      service: "Deep Clean",
      scheduledTime: "Oct 31, 2023 • 10:00 AM",
      status: "Pending",
      amount: "₹240.00",
    },
    {
      id: "ZB-9106",
      customer: "Thomas Anderson",
      service: "Sweep & Mop",
      scheduledTime: "Nov 01, 2023 • 08:30 AM",
      status: "Completed",
      amount: "₹150.00",
    },
    {
      id: "ZB-9107",
      customer: "Bruce Wayne",
      service: "Deep Clean",
      scheduledTime: "Nov 02, 2023 • 04:00 PM",
      status: "Pending",
      amount: "₹320.00",
    },
    {
      id: "ZB-9108",
      customer: "Selina Kyle",
      service: "Dish Washing",
      scheduledTime: "Nov 03, 2023 • 10:30 AM",
      status: "Completed",
      amount: "₹120.00",
    },
  ],
  bookingSearch: "",
  setBookingSearch: (search) => set({ bookingSearch: search }),
  bookingServiceFilter: "ALL",
  setBookingServiceFilter: (filter) => set({ bookingServiceFilter: filter }),
  bookingStatusFilter: "ALL",
  setBookingStatusFilter: (filter) => set({ bookingStatusFilter: filter }),
  bookingViewMode: "table",
  setBookingViewMode: (mode) => set({ bookingViewMode: mode }),
  addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
  updateBooking: (index, updatedBooking) =>
    set((state) => {
      const updated = [...state.bookings];
      updated[index] = updatedBooking;
      return { bookings: updated };
    }),
  deleteBooking: (index) =>
    set((state) => ({
      bookings: state.bookings.filter((_, i) => i !== index),
    })),

  // Service Management Catalog Initial State
  servicesCatalog: [
    {
      id: "SVC-001",
      name: "Premium Sanitization",
      category: "HOME",
      basePrice: "₹340.00",
      peakPrice: "₹395.00",
      status: true,
    },
    {
      id: "SVC-002",
      name: "Floor Buffing",
      category: "OFFICE",
      basePrice: "₹120.00",
      peakPrice: "₹145.00",
      status: true,
    },
    {
      id: "SVC-003",
      name: "HVAC Inspection",
      category: "INDUSTRIAL",
      basePrice: "₹850.00",
      peakPrice: "₹990.00",
      status: true,
    },
    {
      id: "SVC-004",
      name: "Deep House Cleaning",
      category: "HOME",
      basePrice: "₹240.00",
      peakPrice: "₹280.00",
      status: true,
    },
    {
      id: "SVC-005",
      name: "Window Washing",
      category: "OFFICE",
      basePrice: "₹95.00",
      peakPrice: "₹110.00",
      status: false,
    },
  ],
  serviceSearch: "",
  setServiceSearch: (search) => set({ serviceSearch: search }),
  serviceCategoryFilter: "ALL",
  setServiceCategoryFilter: (filter) => set({ serviceCategoryFilter: filter }),
  addService: (service) => set((state) => ({ servicesCatalog: [...state.servicesCatalog, service] })),
  updateService: (index, updatedService) =>
    set((state) => {
      const updated = [...state.servicesCatalog];
      updated[index] = updatedService;
      return { servicesCatalog: updated };
    }),
  deleteService: (index) =>
    set((state) => ({
      servicesCatalog: state.servicesCatalog.filter((_, i) => i !== index),
    })),
  toggleServiceStatus: (index) =>
    set((state) => {
      const updated = [...state.servicesCatalog];
      updated[index] = { ...updated[index], status: !updated[index].status };
      return { servicesCatalog: updated };
    }),

  // Operations Hub Initial State
  operationsSearch: "",
  setOperationsSearch: (search) => set({ operationsSearch: search }),
  activeJobTab: "assigned",
  setActiveJobTab: (tab) => set({ activeJobTab: tab }),
  selectedJobId: "ZB-12568",
  setSelectedJobId: (id) => set({ selectedJobId: id }),
  opsLiveRequests: [
    {
      id: "REQ-01",
      service: "Sweep & Mop",
      customer: "Rahul Menon",
      location: "Kakkanad, Kochi",
      time: "2 min ago",
      priority: "Urgent",
      theme: "purple",
    },
    {
      id: "REQ-02",
      service: "Dish Washing",
      customer: "Sneha Nair",
      location: "Panampilly Nagar, Kochi",
      time: "4 min ago",
      priority: "Normal",
      theme: "green",
    },
    {
      id: "REQ-03",
      service: "HVAC Repair",
      customer: "George Kutty",
      location: "Edappally, Kochi",
      time: "10 min ago",
      priority: "Urgent",
      theme: "amber",
    },
  ],
  removeLiveRequest: (id) =>
    set((state) => ({
      opsLiveRequests: state.opsLiveRequests.filter((r) => r.id !== id),
    })),
  activeJobs: [
    {
      id: "ZB-12568",
      service: "Sweep & Mop",
      customer: "Rohan D.",
      phone: "+91 94462 89012",
      location: "Kakkanad, Kochi, Kerala 682030",
      timeRange: "10:00 AM - 11:30 AM",
      timeDetail: "Due in 15 mins",
      timeDetailColor: "text-rose-500 bg-rose-50/50",
      maid: "Reshma K.",
      rating: "4.8",
      status: "In Progress",
      tab: "inProgress",
    },
    {
      id: "ZB-12569",
      service: "HVAC Inspection",
      customer: "Vipin K.",
      phone: "+91 99955 77661",
      location: "Vyttila, Kochi, Kerala 682019",
      timeRange: "10:30 AM - 12:00 PM",
      timeDetail: "Due in 45 mins",
      timeDetailColor: "text-amber-500 bg-amber-50/50",
      maid: "Anjali M.",
      rating: "4.9",
      status: "Assigned",
      tab: "assigned",
    },
    {
      id: "ZB-12570",
      service: "Dish Washing",
      customer: "Meera R.",
      phone: "+91 98450 11223",
      location: "Kadavanthra, Kochi, Kerala 682020",
      timeRange: "09:00 AM - 10:00 AM",
      timeDetail: "Finished 20m ago",
      timeDetailColor: "text-emerald-500 bg-emerald-50/50",
      maid: "Devi S.",
      rating: "5.0",
      status: "Completed",
      tab: "assigned", // fallback helper
    },
    {
      id: "ZB-12571",
      service: "Window Washing",
      customer: "Kishore A.",
      phone: "+91 90610 33445",
      location: "Ravipuram, Kochi, Kerala 682015",
      timeRange: "08:30 AM - 10:00 AM",
      timeDetail: "Delayed by 15m",
      timeDetailColor: "text-rose-500 bg-rose-50/50",
      maid: "Lakshmi P.",
      rating: "4.7",
      status: "Delayed",
      tab: "delayed",
    },
  ],
  addActiveJob: (job) => set((state) => ({ activeJobs: [job, ...state.activeJobs] })),
  updateJobStatus: (id, newStatus, newTab) =>
    set((state) => ({
      activeJobs: state.activeJobs.map((j) => (j.id === id ? { ...j, status: newStatus, tab: newTab } : j)),
    })),
  assignMaidToJob: (id, maidName) =>
    set((state) => ({
      activeJobs: state.activeJobs.map((j) => (j.id === id ? { ...j, maid: maidName } : j)),
    })),
}));
