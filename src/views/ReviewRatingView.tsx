import React from "react";
import { Star, MessageSquare, TrendingUp, ThumbsUp, Filter, Download } from "lucide-react";

export const ReviewRatingView: React.FC = () => {
  const reviews = [
    {
      rating: 5,
      comment: "Absolutely loving the new dashboard layout. The real-time updates are exactly what we needed for our high-frequency transactions.",
      date: "Oct 24, 2023",
      status: "Published",
      statusColor: "bg-emerald-50 text-emerald-600"
    },
    {
      rating: 4,
      comment: "Great tool, but I'd like to see more integration options for Slack in the next release. Overall performance is snappy.",
      date: "Oct 23, 2023",
      status: "Pending",
      statusColor: "bg-amber-50 text-amber-600"
    },
    {
      rating: 3,
      comment: "The onboarding process was a bit confusing for our non-technical staff. Hoping the documentation gets updated soon.",
      date: "Oct 21, 2023",
      status: "Flagged",
      statusColor: "bg-rose-50 text-rose-600"
    }
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-bold text-slate-900 font-display">Reviews & Ratings</h1>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current opacity-50" />
            </div>
            <span>4.8/5.0 (12,482 Reviews)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-[13px] font-bold hover:bg-slate-50 transition-all cursor-pointer">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[13px] font-bold transition-all cursor-pointer shadow-sm">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Average Rating */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
              <Star className="w-4 h-4 fill-current" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 28%
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Rating</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">4.8</h3>
          </div>
        </div>

        {/* Total Reviews */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
              <MessageSquare className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 12%
            </span>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Reviews</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">12,482</h3>
          </div>
        </div>

        {/* Positive Sentiment */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
              <ThumbsUp className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Positive Sentiment</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">94.2%</h3>
          </div>
        </div>

        {/* Response Rate */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)] text-left min-h-[125px]">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
              <TrendingUp className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Response Rate</span>
            <h3 className="text-[26px] font-bold text-slate-900 tracking-tight font-display">88.5%</h3>
          </div>
        </div>

      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Hand: Customer Reviews (2/3) */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden flex flex-col flex-1">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-900 font-display">Customer Reviews</h3>
              <select className="text-[13px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-[#6c5ce7]">
                <option>Last 30 Days</option>
              </select>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="py-3.5 px-5 text-[11px] font-semibold text-slate-500 w-[120px]">RATING</th>
                    <th className="py-3.5 px-5 text-[11px] font-semibold text-slate-500">COMMENT</th>
                    <th className="py-3.5 px-5 text-[11px] font-semibold text-slate-500 w-[120px]">DATE</th>
                    <th className="py-3.5 px-5 text-[11px] font-semibold text-slate-500 w-[100px] text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((rev, idx) => (
                    <tr key={idx} className="border-t border-slate-100/60 hover:bg-slate-50/30">
                      <td className="py-4 px-5 align-top pt-5">
                        <div className="flex text-amber-400 gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-current' : 'fill-slate-100 text-slate-200'}`} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <p className="text-[13px] font-medium text-slate-700 leading-relaxed italic">
                          "{rev.comment}"
                        </p>
                      </td>
                      <td className="py-4 px-5 align-top pt-5">
                        <span className="text-[12px] font-medium text-slate-500 whitespace-nowrap">
                          {rev.date}
                        </span>
                      </td>
                      <td className="py-4 px-5 align-top pt-4 text-right">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide inline-block ${rev.statusColor}`}>
                          {rev.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Showing 1 to 10 of 12,482 reviews</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-xs font-semibold text-slate-400 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer transition-colors">Previous</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold bg-[#6c5ce7] text-white">1</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50">2</button>
                <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-slate-50">3</button>
                <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded hover:bg-slate-50 cursor-pointer transition-colors">Next</button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Hand: Ratings Distribution & Highlights (1/3) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Ratings Distribution Card */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] p-5">
            <h3 className="text-[15px] font-bold text-slate-900 font-display mb-1">Ratings Distribution</h3>
            <p className="text-[11px] text-slate-500 font-medium mb-6">Review breakdown across all platforms</p>

            <div className="space-y-3">
              {[
                { stars: 5, pct: 75, color: "bg-emerald-500" },
                { stars: 4, pct: 15, color: "bg-[#6c5ce7]" },
                { stars: 3, pct: 6, color: "bg-amber-400" },
                { stars: 2, pct: 3, color: "bg-orange-400" },
                { stars: 1, pct: 1, color: "bg-rose-500" }
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-14 shrink-0">
                    <span className="text-[12px] font-bold text-slate-600">{row.stars} Star</span>
                  </div>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.pct}%` }}></div>
                  </div>
                  <span className="text-[12px] font-bold text-slate-700 w-8 text-right">{row.pct}%</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[13px] font-bold text-slate-800">Sentiment Analysis</h4>
              </div>
              <div className="flex gap-1 h-2.5 rounded-full overflow-hidden mb-3">
                <div className="bg-emerald-500 h-full w-[94.2%]"></div>
                <div className="bg-rose-500 h-full w-[5.8%]"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Positive (94.2%)
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  Negative (5.8%)
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[13px] font-bold text-slate-800">Top Positive Keywords</h4>
                <button className="text-[11px] font-bold text-[#6c5ce7] hover:underline cursor-pointer">
                  View All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Dashboard", "Real-time updates", "Fast", "Easy to use", "Productivity"].map((keyword, i) => (
                  <span key={i} className="px-2.5 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-semibold text-slate-600">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Highlight Card */}
          <div className="bg-gradient-to-br from-[#6c5ce7] to-[#5b4cd8] rounded-2xl p-6 text-white shadow-lg shadow-[#6c5ce7]/20 relative overflow-hidden">
            
            {/* Background design elements */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <MessageSquare className="w-24 h-24" />
            </div>

            <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm inline-block mb-4">
              Review Highlight
            </span>
            
            <p className="text-[15px] font-medium leading-relaxed italic mb-6 relative z-10">
              "The administrative tools are incredibly powerful yet easy to navigate. Our team's productivity increased by 40% since the migration."
            </p>

            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold border border-white/30 backdrop-blur-sm">
                AR
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold">Alex Rivera</span>
                <span className="text-[11px] text-white/70 font-medium">Operations Director</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
