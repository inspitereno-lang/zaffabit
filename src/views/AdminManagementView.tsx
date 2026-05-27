import React, { useState } from "react";
import { Plus, LayoutDashboard, Users, CreditCard, Settings } from "lucide-react";

export const AdminManagementView: React.FC = () => {
  const [permissions, setPermissions] = useState({
    dashboard: true,
    users: true,
    billing: false,
    settings: false
  });

  const admins = [
    {
      initials: "AR",
      name: "Alex Rivera",
      email: "alex.r@userflow.io",
      role: "Super Admin",
      status: "Active",
      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      dotColor: "bg-emerald-500",
      login: "2 mins ago",
      avatarBg: "bg-indigo-100 text-indigo-600"
    },
    {
      initials: "SJ",
      name: "Sarah Jenkins",
      email: "s.jenkins@userflow.io",
      role: "Editor",
      status: "Pending",
      statusColor: "bg-amber-50 text-amber-600 border-amber-100",
      dotColor: "bg-amber-500",
      login: "Invited 4h ago",
      avatarBg: "bg-rose-100 text-rose-600"
    },
    {
      initials: "MK",
      name: "Marcus Knight",
      email: "knight.m@userflow.io",
      role: "Viewer",
      status: "Inactive",
      statusColor: "bg-slate-50 text-slate-500 border-slate-200",
      dotColor: "bg-slate-400",
      login: "3 days ago",
      avatarBg: "bg-slate-100 text-slate-600"
    }
  ];

  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex flex-col text-left gap-1">
          <h1 className="text-[22px] font-bold text-slate-900 font-display">Admin Management</h1>
          <p className="text-[13px] text-slate-500 font-medium">Manage global access control and administrator identities.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white text-[13px] font-bold transition-all cursor-pointer shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add New Admin</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Hand: Administrator Table (2/3) */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col flex-1">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-bold text-slate-900 font-display">Administrators</h3>
                <span className="w-5 h-5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-600 flex items-center justify-center">4</span>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="py-3.5 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">ADMIN NAME</th>
                    <th className="py-3.5 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">ROLE</th>
                    <th className="py-3.5 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">STATUS</th>
                    <th className="py-3.5 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">LAST LOGIN</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, idx) => (
                    <tr key={idx} className="border-t border-slate-100/60 hover:bg-slate-50/30 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${admin.avatarBg}`}>
                            {admin.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-bold text-slate-800">{admin.name}</span>
                            <span className="text-[12px] font-medium text-slate-500">{admin.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-[13px] font-semibold text-slate-700">{admin.role}</span>
                      </td>
                      <td className="py-4 px-5">
                        <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1.5 w-max tracking-wide ${admin.statusColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${admin.dotColor}`}></span>
                          {admin.status}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-[13px] font-medium text-slate-500">{admin.login}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[12px] text-slate-500 font-medium">Showing 3 of 12 administrators</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-[12px] font-semibold text-slate-400 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors">Previous</button>
                <button className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold bg-[#6c5ce7] text-white">1</button>
                <button className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold text-slate-600 hover:bg-slate-50">2</button>
                <button className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold text-slate-600 hover:bg-slate-50">3</button>
                <button className="px-3 py-1.5 text-[12px] font-semibold text-slate-600 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors">Next</button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Hand: Quick Permissions (1/3) */}
        <div className="lg:col-span-1 flex flex-col">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 flex flex-col h-full">
            <h3 className="text-[15px] font-bold text-slate-900 font-display">Quick Permissions</h3>
            <p className="text-[12px] text-slate-500 font-medium mt-1 mb-6 leading-relaxed">Modify default module access for the 'Editor' role.</p>

            <div className="flex flex-col gap-6 flex-1">
              
              {/* Dashboard Access */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#6c5ce7] shrink-0">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-800">Dashboard Access</span>
                    <span className="text-[11px] font-medium text-slate-500">View all analytics</span>
                  </div>
                </div>
                <button 
                  onClick={() => setPermissions({...permissions, dashboard: !permissions.dashboard})}
                  className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${permissions.dashboard ? 'bg-[#6c5ce7]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${permissions.dashboard ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </button>
              </div>

              {/* User Management */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-800">User Management</span>
                    <span className="text-[11px] font-medium text-slate-500">Create and edit users</span>
                  </div>
                </div>
                <button 
                  onClick={() => setPermissions({...permissions, users: !permissions.users})}
                  className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${permissions.users ? 'bg-[#6c5ce7]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${permissions.users ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </button>
              </div>

              {/* Billing & Invoices */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-800">Billing & Invoices</span>
                    <span className="text-[11px] font-medium text-slate-500">Manage subscriptions</span>
                  </div>
                </div>
                <button 
                  onClick={() => setPermissions({...permissions, billing: !permissions.billing})}
                  className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${permissions.billing ? 'bg-[#6c5ce7]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${permissions.billing ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </button>
              </div>

              {/* System Settings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-800">System Settings</span>
                    <span className="text-[11px] font-medium text-slate-500">Advanced configurations</span>
                  </div>
                </div>
                <button 
                  onClick={() => setPermissions({...permissions, settings: !permissions.settings})}
                  className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${permissions.settings ? 'bg-[#6c5ce7]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${permissions.settings ? 'translate-x-4' : 'translate-x-0'}`}></span>
                </button>
              </div>

            </div>

            <button className="w-full py-2.5 mt-6 bg-[#6c5ce7] hover:bg-[#5b4cd8] text-white rounded-lg text-[13px] font-bold transition-colors cursor-pointer shadow-sm">
              Save Global Permissions
            </button>
            
          </div>
        </div>

      </div>

    </div>
  );
};
