import React from "react";
import type { LucideIcon } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

export interface KpiCardProps {
  title: string;
  timeframeLabel?: string;
  value: string | number;
  changeText: string;
  changeType: "positive" | "negative" | "neutral";
  vsLabel?: string;
  icon: LucideIcon;
  themeColor: "purple" | "blue" | "orange" | "red" | "indigo";
  chartData: { value: number }[];
}

const colorMap = {
  purple: {
    iconBg: "bg-[#7c6fea]/10",
    iconText: "text-[#7c6fea]",
    strokeColor: "#7c6fea",
    gradientStart: "rgba(124, 111, 234, 0.15)",
    gradientEnd: "rgba(124, 111, 234, 0)",
    borderHover: "hover:border-purple-200",
  },
  blue: {
    iconBg: "bg-[#0984e3]/10",
    iconText: "text-[#0984e3]",
    strokeColor: "#0984e3",
    gradientStart: "rgba(9, 132, 227, 0.15)",
    gradientEnd: "rgba(9, 132, 227, 0)",
    borderHover: "hover:border-blue-200",
  },
  orange: {
    iconBg: "bg-[#fdcb6e]/10",
    iconText: "text-[#fdcb6e]",
    strokeColor: "#fdcb6e",
    gradientStart: "rgba(253, 203, 110, 0.15)",
    gradientEnd: "rgba(253, 203, 110, 0)",
    borderHover: "hover:border-amber-200",
  },
  red: {
    iconBg: "bg-[#ff7675]/10",
    iconText: "text-[#ff7675]",
    strokeColor: "#ff7675",
    gradientStart: "rgba(255, 118, 117, 0.15)",
    gradientEnd: "rgba(255, 118, 117, 0)",
    borderHover: "hover:border-rose-200",
  },
  indigo: {
    iconBg: "bg-indigo-50",
    iconText: "text-[#6c5ce7]",
    strokeColor: "#6c5ce7",
    gradientStart: "rgba(108, 92, 231, 0.15)",
    gradientEnd: "rgba(108, 92, 231, 0)",
    borderHover: "hover:border-indigo-200",
  },
};

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  timeframeLabel = "Today",
  value,
  changeText,
  changeType,
  vsLabel = "vs yesterday",
  icon: Icon,
  themeColor,
  chartData,
}) => {
  const colors = colorMap[themeColor] || colorMap.purple;

  const changeColorClass =
    changeType === "positive"
      ? "text-emerald-500 font-medium"
      : changeType === "negative"
      ? "text-rose-500 font-medium"
      : "text-slate-400";

  const gradientId = `gradient-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden bg-white border border-slate-100 rounded-2xl pt-5 pb-0 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] ${colors.borderHover}`}
    >
      {/* Top Section: Icon and Metric Label */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center justify-center p-2.5 rounded-full ${colors.iconBg} ${colors.iconText}`}>
          <Icon className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800 text-sm tracking-tight leading-tight">
            {title}
          </span>
          <span className="text-[11px] text-slate-400">
            {timeframeLabel}
          </span>
        </div>
      </div>

      {/* Middle Section: Big Value and Trend Badge */}
      <div className="flex items-baseline gap-2.5 mt-4 mb-3">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
          {value}
        </h3>
        <div className="flex flex-col justify-center leading-none">
          <span className={`text-[10px] font-semibold ${changeColorClass}`}>
            {changeText}
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5">
            {vsLabel}
          </span>
        </div>
      </div>

      {/* Bottom Section: Trendline Line Chart */}
      <div className="w-full h-11 -mx-4 self-center mt-auto overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.strokeColor} stopOpacity={0.15} />
                <stop offset="100%" stopColor={colors.strokeColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.strokeColor}
              strokeWidth={1.8}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
