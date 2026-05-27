import {
  Wallet,
  Users,
  Award,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Sparkles,
  UserCheck,
  ShieldCheck,
  Send,
  BarChart3,
  Settings,
} from "lucide-react";
import type { KpiCardProps } from "../components/KpiCard";

// 1. KPI Cards Data
export const mockKpiCardsData: (Omit<KpiCardProps, "icon"> & { icon: any })[] = [
  {
    title: "Total Revenue",
    timeframeLabel: "Today",
    value: "₹2,48,340",
    changeText: "↗ 15.8%",
    changeType: "positive",
    vsLabel: "vs yesterday",
    themeColor: "purple",
    icon: Wallet,
    chartData: [
      { value: 160 }, { value: 180 }, { value: 140 }, { value: 240 },
      { value: 200 }, { value: 260 }, { value: 248 }
    ],
  },
  {
    title: "New Customers",
    timeframeLabel: "Today",
    value: "282",
    changeText: "↗ 8.4%",
    changeType: "positive",
    vsLabel: "vs yesterday",
    themeColor: "blue",
    icon: Users,
    chartData: [
      { value: 210 }, { value: 230 }, { value: 200 }, { value: 260 },
      { value: 220 }, { value: 250 }, { value: 282 }
    ],
  },
  {
    title: "New Customers", // maintaining duplicate/typo card from reference
    timeframeLabel: "Today",
    value: "42",
    changeText: "↗ 12.4%",
    changeType: "positive",
    vsLabel: "vs yesterday",
    themeColor: "orange",
    icon: Award,
    chartData: [
      { value: 25 }, { value: 30 }, { value: 22 }, { value: 35 },
      { value: 28 }, { value: 38 }, { value: 42 }
    ],
  },
  {
    title: "Completion Rate",
    timeframeLabel: "Today",
    value: "142",
    changeText: "↗ 5.4%",
    changeType: "positive",
    vsLabel: "vs yesterday",
    themeColor: "blue",
    icon: CheckCircle2,
    chartData: [
      { value: 90 }, { value: 110 }, { value: 95 }, { value: 130 },
      { value: 110 }, { value: 135 }, { value: 142 }
    ],
  },
  {
    title: "Cancellation Rate",
    timeframeLabel: "Today",
    value: "2.8%",
    changeText: "↗ .4%",
    changeType: "negative",
    vsLabel: "vs yesterday",
    themeColor: "red",
    icon: XCircle,
    chartData: [
      { value: 2.1 }, { value: 2.3 }, { value: 2.0 }, { value: 2.5 },
      { value: 2.3 }, { value: 2.6 }, { value: 2.8 }
    ],
  },
  {
    title: "Refunds",
    timeframeLabel: "Today",
    value: "₹8,690",
    changeText: "↗ 5.4%",
    changeType: "positive",
    vsLabel: "vs yesterday",
    themeColor: "purple",
    icon: RefreshCw,
    chartData: [
      { value: 6500 }, { value: 7800 }, { value: 7000 }, { value: 8900 },
      { value: 8000 }, { value: 8500 }, { value: 8690 }
    ],
  },
];

// 2. Bookings Overview Chart Data (Dual line)
export interface BookingsOverviewData {
  time: string;
  bookings: number;
  completed: number;
}

export const mockBookingsOverview: BookingsOverviewData[] = [
  { time: "12 AM", bookings: 210, completed: 170 },
  { time: "4 AM", bookings: 210, completed: 170 },
  { time: "8 AM", bookings: 330, completed: 250 },
  { time: "12 PM", bookings: 620, completed: 512 },
  { time: "4 PM", bookings: 590, completed: 410 },
  { time: "8 PM", bookings: 680, completed: 580 },
  { time: "12 AM", bookings: 650, completed: 590 },
];

// 3. Service Category Distribution Data (Doughnut segment)
export interface CategorySegment {
  name: string;
  value: number;
  percentage: string;
  color: string;
}

export const mockCategoryDistribution: CategorySegment[] = [
  { name: "Sweep & Mop", value: 32, percentage: "32%", color: "#6c5ce7" }, // purple
  { name: "Dish Washing", value: 24, percentage: "24%", color: "#369eff" }, // sky blue
  { name: "Deep Cleaning", value: 18, percentage: "18%", color: "#00d1c1" }, // teal/cyan
  { name: "Laundry", value: 14, percentage: "14%", color: "#fa9f1b" }, // orange
  { name: "Others", value: 12, percentage: "12%", color: "#1fcb4f" }, // light green
];

// 4. Live Requests Feed Data
export interface LiveRequest {
  service: string;
  address: string;
  time: string;
  isNew: boolean;
  themeColor: "purple" | "green" | "orange";
}

export const mockLiveRequests: LiveRequest[] = [
  {
    service: "Sweep & Mop",
    address: "Flat 12B, Sunrise Apartments",
    time: "2 min ago",
    isNew: true,
    themeColor: "purple",
  },
  {
    service: "Dish Washing",
    address: "A-101, Greenfield Apartments",
    time: "4 min ago",
    isNew: true,
    themeColor: "green",
  },
  {
    service: "Deep Cleaning",
    address: "Villa 45, Palm Drive",
    time: "6 min ago",
    isNew: true,
    themeColor: "orange",
  },
];

// 5. Recent Bookings Table Data
export interface RecentBooking {
  id: string;
  customer: string;
  service: string;
  time: string;
  status: "Completed" | "In Progress" | "Assigned" | "Pending";
  amount: string;
}

export const mockRecentBookings: RecentBooking[] = [
  {
    id: "ZB-12568",
    customer: "Rahul Menon",
    service: "Sweep & Mop",
    time: "10:00 AM",
    status: "Completed",
    amount: "₹249",
  },
  {
    id: "ZB-12567",
    customer: "Sneha Nair",
    service: "Dish Washing",
    time: "11:30 AM",
    status: "In Progress",
    amount: "₹199",
  },
  {
    id: "ZB-12566",
    customer: "Arjun Krishnan",
    service: "Deep Cleaning",
    time: "01:00 PM",
    status: "Assigned",
    amount: "₹799",
  },
  {
    id: "ZB-12565",
    customer: "Meera Iyer",
    service: "Laundry",
    time: "02:00 PM",
    status: "Pending",
    amount: "₹149",
  },
];

// 6. Earnings Overview Weekly Data
export interface EarningsWeeklyBar {
  day: string;
  earnings: number;
}

export const mockEarningsWeekly: EarningsWeeklyBar[] = [
  { day: "Mon", earnings: 250000 },
  { day: "Tue", earnings: 420000 },
  { day: "Wed", earnings: 600000 },
  { day: "Thu", earnings: 850000 },
  { day: "Fri", earnings: 700000 },
  { day: "Sat", earnings: 980000 },
  { day: "Sun", earnings: 380000 },
];

// 7. Top Performing Maids Data
export interface MaidPerformance {
  name: string;
  rating: string;
  jobs: string;
  earnings: string;
  avatarColor: string;
  initial: string;
}

export const mockTopMaids: MaidPerformance[] = [
  {
    name: "Reshma K.",
    rating: "5.0",
    jobs: "128 Jobs",
    earnings: "₹24,680",
    avatarColor: "bg-red-100 text-red-600",
    initial: "R",
  },
  {
    name: "Jancy P.",
    rating: "4.9",
    jobs: "112 Jobs",
    earnings: "₹21,430",
    avatarColor: "bg-emerald-100 text-emerald-600",
    initial: "J",
  },
  {
    name: "Asha B.",
    rating: "4.8",
    jobs: "98 Jobs",
    earnings: "₹18,760",
    avatarColor: "bg-violet-100 text-violet-600",
    initial: "A",
  },
];

// 8. Service Pricing Data
export interface ServicePrice {
  name: string;
  basePrice: string;
  peakPrice: string;
}

export const mockServicePrices: ServicePrice[] = [
  { name: "Sweep & Mop (Per Visit)", basePrice: "₹249", peakPrice: "₹299" },
  { name: "Dish Washing (Per Visit)", basePrice: "₹199", peakPrice: "₹249" },
  { name: "Deep Cleaning (Per Visit)", basePrice: "₹799", peakPrice: "₹999" },
  { name: "Laundry (Per Kg)", basePrice: "₹49", peakPrice: "₹69" },
];

// 9. AI Insights Data
export interface AiInsight {
  id: number;
  text: string;
  time: string;
  type: "success" | "info" | "warning";
}

export const mockAiInsights: AiInsight[] = [
  {
    id: 1,
    text: "Demand for Deep Cleaning increased by 28% in Kakkanad area today.",
    time: "2 min ago",
    type: "success",
  },
  {
    id: 2,
    text: "12 more maids needed in Vyttila between 10 AM - 2 PM.",
    time: "5 min ago",
    type: "info",
  },
  {
    id: 3,
    text: "Laundry service is trending up by 18% this week.",
    time: "15 min ago",
    type: "warning",
  },
];

// 10. Quick Actions Data
export interface QuickActionItem {
  label: string;
  icon: any;
  bgColor: string;
  iconColor: string;
}

export const mockQuickActions: QuickActionItem[] = [
  {
    label: "Add New Maid",
    icon: UserCheck,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    label: "Create Offer",
    icon: Sparkles,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Add New Admin",
    icon: ShieldCheck,
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    label: "Send Notification",
    icon: Send,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    label: "View reports",
    icon: BarChart3,
    bgColor: "bg-[#6c5ce7]/5",
    iconColor: "text-[#6c5ce7]",
  },
  {
    label: "Settings",
    icon: Settings,
    bgColor: "bg-slate-50",
    iconColor: "text-slate-600",
  },
];
