import React from "react";
import { useStore, type ActiveJob } from "../store/useStore";
import {
  Briefcase,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  Search,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle,
} from "lucide-react";

export const OperationsCenterView: React.FC = () => {
  const operationsSearch = useStore((state) => state.operationsSearch);
  const setOperationsSearch = useStore((state) => state.setOperationsSearch);
  
  const activeJobTab = useStore((state) => state.activeJobTab);
  const setActiveJobTab = useStore((state) => state.setActiveJobTab);
  
  const selectedJobId = useStore((state) => state.selectedJobId);
  const setSelectedJobId = useStore((state) => state.setSelectedJobId);
  
  const opsLiveRequests = useStore((state) => state.opsLiveRequests);
  const removeLiveRequest = useStore((state) => state.removeLiveRequest);
  
  const activeJobs = useStore((state) => state.activeJobs);
  const addActiveJob = useStore((state) => state.addActiveJob);
  const updateJobStatus = useStore((state) => state.updateJobStatus);
  const assignMaidToJob = useStore((state) => state.assignMaidToJob);

  // Sparkline renderer for operations cards
  const renderSparkline = (color: string, points: string) => (
    <div className="h-6 w-full mt-3">
      <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path
          d={points}
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  // Dispatch/Assign Helpers
  const handleAssignOpsLiveRequest = (reqId: string, maidName: string = "Reshma K.") => {
    const request = opsLiveRequests.find(r => r.id === reqId);
    if (!request) return;

    // Create a new active job
    const newJobId = `ZB-${Math.floor(10000 + Math.random() * 90000)}`;
    const newJob: ActiveJob = {
      id: newJobId,
      service: request.service,
      customer: request.customer,
      phone: "+91 98765 " + Math.floor(10000 + Math.random() * 90000),
      location: `${request.location}, Kerala 682001`,
      timeRange: "12:00 PM - 01:00 PM",
      timeDetail: "Starts in 30 min",
      timeDetailColor: "text-amber-500 bg-amber-50/50",
      maid: maidName,
      rating: "5.0",
      status: "Assigned",
      tab: "assigned"
    };

    removeLiveRequest(reqId);
    addActiveJob(newJob);
    setSelectedJobId(newJobId);
    setActiveJobTab("assigned");
  };

  const handleAutoAssignOpsLiveRequest = (reqId: string) => {
    const maids = ["Reshma K.", "Jancy P.", "Asha B.", "Sunra R.", "Kavya S."];
    const randomMaid = maids[Math.floor(Math.random() * maids.length)];
    handleAssignOpsLiveRequest(reqId, randomMaid);
  };

  // KPI filtering for columns based on tab selection
  const filteredActiveJobs = activeJobs.filter((job) => {
    // Search text match
    const matchesSearch =
      job.customer.toLowerCase().includes(operationsSearch.toLowerCase()) ||
      job.id.toLowerCase().includes(operationsSearch.toLowerCase()) ||
      job.service.toLowerCase().includes(operationsSearch.toLowerCase()) ||
      job.maid.toLowerCase().includes(operationsSearch.toLowerCase());
    
    // Tab match
    const matchesTab = job.tab === activeJobTab;
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
      
      {/* ==================== TOP ROW: 5 KPI CARDS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Active Jobs */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active jobs</span>
              <span className="text-[9px] text-slate-300">Today</span>
            </div>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-indigo-50 text-[#6c5ce7]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-display">
              {activeJobs.filter(j => j.status === "In Progress").length}
            </span>
            <span className="text-[9px] font-bold text-[#6c5ce7] flex items-center gap-0.5">
              <span>↗</span> 15.8% <span className="text-slate-400 font-light text-[8px] ml-0.5">vs yesterday</span>
            </span>
          </div>
          {renderSparkline("#6c5ce7", "M0 15 Q20 5 40 15 T80 10 T100 8")}
        </div>

        {/* Card 2: Pending Assignments */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Assign</span>
              <span className="text-[9px] text-slate-300">Instant Pool</span>
            </div>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-50 text-amber-500">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-display">
              {opsLiveRequests.length}
            </span>
            <span className="text-[9px] font-bold text-amber-500 flex items-center gap-0.5">
              <span>↗</span> 4.5% <span className="text-slate-400 font-light text-[8px] ml-0.5">vs yesterday</span>
            </span>
          </div>
          {renderSparkline("#f59e0b", "M0 8 Q25 18 50 10 T100 12")}
        </div>

        {/* Card 3: Dispatch Efficiency */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dispatch Efficiency</span>
              <span className="text-[9px] text-slate-300">Auto routing</span>
            </div>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-50 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-display">94.8%</span>
            <span className="text-[9px] font-bold text-emerald-500 flex items-center gap-0.5">
              <span>↗</span> 1.2% <span className="text-slate-400 font-light text-[8px] ml-0.5">vs yesterday</span>
            </span>
          </div>
          {renderSparkline("#10b981", "M0 12 Q30 5 60 15 T100 6")}
        </div>

        {/* Card 4: Delayed Alerts */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delayed Alerts</span>
              <span className="text-[9px] text-rose-400 font-semibold animate-pulse">Live</span>
            </div>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-rose-50 text-rose-500">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-display">
              {activeJobs.filter(j => j.tab === "delayed").length}
            </span>
            <span className="text-[9px] font-bold text-rose-500 flex items-center gap-0.5">
              <span>↘</span> -15% <span className="text-slate-400 font-light text-[8px] ml-0.5">vs yesterday</span>
            </span>
          </div>
          {renderSparkline("#ef4444", "M0 5 Q20 18 45 8 T90 12 T100 15")}
        </div>

        {/* Card 5: Maid Active roster */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4.5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.005)] text-left">
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Maid active roster</span>
              <span className="text-[9px] text-slate-300">Logged-in</span>
            </div>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-teal-50 text-teal-600">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end justify-between mt-3">
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-display">148/210</span>
            <span className="text-[9px] font-bold text-teal-600 flex items-center gap-0.5">
              <span>↗</span> 12.8% <span className="text-slate-400 font-light text-[8px] ml-0.5">vs yesterday</span>
            </span>
          </div>
          {renderSparkline("#0d9488", "M0 15 Q25 8 50 12 T100 5")}
        </div>

      </div>

      {/* ==================== MIDDLE ROW: DISPATCH QUEUE AND ROSTER ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live Requests Dispatcher */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[300px]">
          
          <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
            <div className="flex flex-col text-left">
              <h3 className="font-bold text-slate-800 text-sm">Live Dispatch Queue</h3>
              <p className="text-[11px] text-slate-400 font-light mt-0.5">Instant booking request alerts received in Kochi area.</p>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 shrink-0">
              {opsLiveRequests.length} Pending Actions
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[320px] custom-sidebar-scroll pr-1">
            {opsLiveRequests.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-10 font-semibold text-xs">
                All live requests are successfully dispatched!
              </div>
            ) : (
              opsLiveRequests.map((req) => (
                <div key={req.id} className="p-3.5 rounded-xl border border-slate-100 flex items-center justify-between flex-wrap gap-4 text-left hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col gap-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#6c5ce7]">{req.id}</span>
                      <span className="text-xs font-bold text-slate-800">• {req.service}</span>
                      <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-indigo-50 text-[#6c5ce7]">
                        {req.priority}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      <span className="text-[11px] font-semibold text-slate-500">{req.customer}</span>
                      <span className="text-[10px] text-slate-400 font-light">{req.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-400 mr-2">{req.time}</span>
                    
                    <button
                      onClick={() => handleAutoAssignOpsLiveRequest(req.id)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-[10px] font-bold transition-all cursor-pointer"
                    >
                      Auto Assign
                    </button>
                    
                    <button
                      onClick={() => handleAssignOpsLiveRequest(req.id, "Reshma K.")}
                      className="px-3 py-1.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[10px] font-bold shadow-sm shadow-[#6c5ce7]/10 transition-all cursor-pointer"
                    >
                      Assign Reshma
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Dispatcher Performance & Roster Map */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[300px]">
          
          <div className="flex items-center justify-between mb-4 border-b border-slate-50 pb-3">
            <h3 className="font-bold text-slate-800 text-sm">Dispatched Maid Roster</h3>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 shrink-0">
              Active Crew
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-3.5 overflow-y-auto max-h-[320px] custom-sidebar-scroll pr-1 text-left">
            {[
              { name: "Reshma K.", status: "In Job", jobs: "6 jobs today", rating: "4.8", progress: "w-2/3 bg-emerald-500" },
              { name: "Anjali M.", status: "Assigned", jobs: "4 jobs today", rating: "4.9", progress: "w-1/3 bg-blue-500" },
              { name: "Devi S.", status: "Completed", jobs: "8 jobs today", rating: "5.0", progress: "w-full bg-teal-500" },
              { name: "Lakshmi P.", status: "In Job", jobs: "5 jobs today", rating: "4.7", progress: "w-1/2 bg-amber-500" }
            ].map((crew, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
                      {crew.name.split(" ")[0][0]}{crew.name.split(" ")[1] ? crew.name.split(" ")[1][0] : ""}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{crew.name}</span>
                      <span className="text-[9px] text-slate-400 font-light">{crew.jobs}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-600">{crew.status}</span>
                    <span className="text-[9px] text-amber-500 font-bold">★ {crew.rating}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${crew.progress}`} />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ==================== LOWER MASTER-DETAIL JOBS TRACKER ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Active Jobs List under Status Tabs */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden flex flex-col">
          
          {/* Header & Tabs */}
          <div className="p-5 border-b border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex flex-col text-left">
                <h3 className="text-sm font-bold text-slate-800 font-display">Active Jobs Log</h3>
                <p className="text-[11px] text-slate-400 font-light">Monitor real-time progress details, maids and scheduling coordinates.</p>
              </div>
              
              {/* Search bar */}
              <div className="relative min-w-[200px]">
                <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search jobs, customers, maids..."
                  className="pl-9 pr-4 py-1.5 w-full text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#6c5ce7] placeholder:text-slate-400 text-slate-800 text-left"
                  value={operationsSearch}
                  onChange={(e) => setOperationsSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Tab Selectors */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-1">
              {(["assigned", "inProgress", "delayed"] as const).map((tab) => {
                const label = tab === "assigned" ? "Assigned" : tab === "inProgress" ? "In Progress" : "Delayed Alerts";
                const count = activeJobs.filter((j) => j.tab === tab).length;
                
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveJobTab(tab)}
                    className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer relative ${
                      activeJobTab === tab
                        ? "border-[#6c5ce7] text-[#6c5ce7]"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <span>{label}</span>
                    <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                      activeJobTab === tab ? "bg-indigo-50 text-[#6c5ce7]" : "bg-slate-50 text-slate-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Jobs List Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/20">
                  <th className="py-2.5 px-6 text-[9px] font-bold text-slate-400 tracking-wider">JOB ID</th>
                  <th className="py-2.5 px-6 text-[9px] font-bold text-slate-400 tracking-wider">CUSTOMER</th>
                  <th className="py-2.5 px-6 text-[9px] font-bold text-slate-400 tracking-wider">SERVICE OFFERED</th>
                  <th className="py-2.5 px-6 text-[9px] font-bold text-slate-400 tracking-wider">MAID ASSIGNED</th>
                  <th className="py-2.5 px-6 text-[9px] font-bold text-slate-400 tracking-wider">SCHEDULE</th>
                  <th className="py-2.5 px-6 text-[9px] font-bold text-slate-400 tracking-wider text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredActiveJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-xs font-semibold">
                      No active jobs matched the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredActiveJobs.map((job) => {
                    const isSelected = job.id === selectedJobId;
                    
                    return (
                      <tr
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/20 cursor-pointer transition-colors ${
                          isSelected ? "bg-indigo-50/30" : ""
                        }`}
                      >
                        <td className="py-3.5 px-6 text-[11px] font-bold text-slate-400">{job.id}</td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] font-bold text-slate-700">{job.customer}</span>
                        </td>
                        <td className="py-3.5 px-6 text-[11px] text-slate-500 font-semibold">{job.service}</td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] text-[#6c5ce7] font-semibold">{job.maid}</span>
                        </td>
                        <td className="py-3.5 px-6">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[11px] text-slate-600 font-semibold">{job.timeRange}</span>
                            <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded w-fit ${job.timeDetailColor}`}>
                              {job.timeDetail}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {job.status !== "Completed" && (
                              <button
                                onClick={() => updateJobStatus(job.id, "Completed", "assigned")}
                                className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100/60 cursor-pointer"
                                title="Complete Job"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => updateJobStatus(job.id, "Delayed", "delayed")}
                              className="p-1 rounded bg-rose-50 text-rose-500 hover:bg-rose-100/60 cursor-pointer"
                              title="Flag Delay"
                            >
                              <Clock className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Side: Selected Job Detail Panel */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col shadow-[0_2px_12px_rgba(0,0,0,0.005)] min-h-[360px] text-left">
          
          <div className="border-b border-slate-50 pb-3 mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Job Dispatch Details</h3>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase">
              Operational
            </span>
          </div>

          {(() => {
            const job = activeJobs.find((j) => j.id === selectedJobId) || activeJobs[0];
            if (!job) {
              return (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-xs font-semibold">
                  Select a job from the log to view details.
                </div>
              );
            }

            return (
              <div className="flex-1 flex flex-col justify-between">
                
                {/* Details list */}
                <div className="space-y-4">
                  
                  {/* Job ID & Status header */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Job ID</span>
                      <span className="text-sm font-bold text-slate-800 mt-0.5">{job.id}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      job.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : job.status === "In Progress"
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : job.status === "Assigned"
                        ? "bg-indigo-50 text-[#6c5ce7] border border-indigo-100"
                        : "bg-rose-50 text-rose-600 border border-rose-100"
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  {/* Customer Block */}
                  <div className="flex items-start gap-3 bg-slate-50/40 border border-slate-100 p-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#6c5ce7] shrink-0 font-bold text-xs uppercase">
                      {job.customer.split(" ")[0][0]}{job.customer.split(" ")[1] ? job.customer.split(" ")[1][0] : ""}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Customer & Phone</span>
                      <span className="text-xs font-bold text-slate-700 mt-0.5">{job.customer}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-2.5 h-2.5 text-slate-400" />
                        <span>{job.phone}</span>
                      </span>
                    </div>
                  </div>

                  {/* Location block */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Scheduled Address</span>
                    <span className="text-xs font-semibold text-slate-600 flex items-start gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{job.location}</span>
                    </span>
                  </div>

                  {/* Maid dispatch block */}
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Crew Dispatched</span>
                      <span className="text-xs font-bold text-slate-800 mt-0.5">{job.maid}</span>
                      <span className="text-[9px] text-amber-500 font-bold flex items-center gap-0.5 mt-0.5">
                        ★ {job.rating} Rating
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const newCrew = prompt("Assign new crew maid name:", job.maid);
                        if (newCrew) assignMaidToJob(job.id, newCrew);
                      }}
                      className="px-2.5 py-1 text-[9px] font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer"
                    >
                      Re-route Dispatch
                    </button>
                  </div>

                </div>

                {/* Operations Actions */}
                <div className="flex flex-col gap-2 border-t border-slate-50 pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateJobStatus(job.id, "In Progress", "inProgress")}
                      className="py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer text-center"
                    >
                      Set In Progress
                    </button>
                    <button
                      onClick={() => updateJobStatus(job.id, "Completed", "assigned")}
                      className="py-1.5 px-3 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[10px] font-bold shadow-sm shadow-[#6c5ce7]/10 transition-colors cursor-pointer text-center"
                    >
                      Complete Session
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => alert(`Refund initiated for job ${job.id}!`)}
                      className="py-1.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-[10px] font-bold transition-colors cursor-pointer text-center"
                    >
                      Issue Refund
                    </button>
                    <button
                      onClick={() => {
                        const note = prompt("Enter note content:");
                        if (note) alert(`Note added to ${job.id}: "${note}"`);
                      }}
                      className="py-1.5 px-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-[10px] font-bold transition-colors cursor-pointer text-center"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>

      </div>

    </div>
  );
};
