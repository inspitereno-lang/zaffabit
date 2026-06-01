import React, { useState } from "react";
import { useStore } from "../store/useStore";
import {
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  SlidersHorizontal,
  UserCheck,
  UserPlus,
  UserX,
  Users,
} from "lucide-react";

export const UserManagementView: React.FC = () => {
  const users = useStore((state) => state.users);
  const updateUser = useStore((state) => state.updateUser);
  const deleteUser = useStore((state) => state.deleteUser);

  const userSearch = useStore((state) => state.userSearch);
  const setUserSearch = useStore((state) => state.setUserSearch);
  const statusFilter = useStore((state) => state.statusFilter);

  // Local editing fields
  const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userStatus, setUserStatus] = useState<"ACTIVE" | "INACTIVE" | "PENDING">("ACTIVE");
  const [userJoinDate, setUserJoinDate] = useState("");

  const handleEditUserClick = (index: number) => {
    setEditingUserIndex(index);
    setUserEmail(users[index].email);
    setUserPhone(users[index].phone);
    setUserLocation(users[index].location);
    setUserStatus(users[index].status);
    setUserJoinDate(users[index].joinDate);
  };

  const handleSaveUserClick = (index: number) => {
    if (!userEmail.trim()) return;
    updateUser(index, {
      email: userEmail,
      phone: userPhone || "(000) 000-0000",
      location: userLocation || "Unknown",
      status: userStatus,
      joinDate: userJoinDate || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    });
    setEditingUserIndex(null);
  };



  return (
    <div className="p-8 space-y-6 flex-1 max-w-[1400px] mx-auto w-full">
      
      {/* Headline Greeting */}
      <div className="flex flex-col text-left gap-0.5">
        <h1 className="text-lg font-bold text-slate-900 font-display">User Management</h1>
        <p className="text-xs text-slate-400 font-light">
          Manage and audit your organization's user base and permissions.
        </p>
      </div>

      {/* ==================== 4 KPI CARDS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: TOTAL USERS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-indigo-50 text-[#6c5ce7]">
              <Users className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 12%
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">12,482</h3>
          </div>
        </div>

        {/* Card 2: ACTIVE USERS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
              <UserCheck className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 flex items-center gap-0.5">
              <span>↗</span> 8.4%
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active Users</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">8,912</h3>
          </div>
        </div>

        {/* Card 3: NEW SIGNUPS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-amber-50 text-amber-500">
              <UserPlus className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 flex items-center gap-0.5">
              <span>↗</span> 18%
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">New Signups</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">342</h3>
          </div>
        </div>

        {/* Card 4: BLOCKED USERS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center p-2.5 rounded-xl bg-rose-50 text-rose-500">
              <UserX className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 flex items-center gap-0.5">
              <span>↘</span> -2.4%
            </span>
          </div>
          <div className="mt-4 text-left">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Blocked Users</span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-display mt-0.5">14</h3>
          </div>
        </div>
      </div>

      {/* ==================== USER DIRECTORY TABLE WIDGET ==================== */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.005)] overflow-hidden">
        
        {/* Header with Search and Filter */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-slate-800 font-display">User Directory</h3>
            <p className="text-[11px] text-slate-400 font-light">Monitor logins, locations, contact info, and registration logs.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search box */}
            <div className="relative min-w-[200px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search by email, region..."
                className="pl-9 pr-4 py-1.5 w-full text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6c5ce7] focus:border-[#6c5ce7] placeholder:text-slate-400 text-slate-800 transition-colors"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>



            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter & Export</span>
            </button>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30">
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">EMAIL ADDRESS</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">CONTACT NUMBER</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">LOCATION</th>

                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider">JOIN DATE</th>
                <th className="py-3 px-6 text-[9px] font-bold text-slate-400 tracking-wider text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((u) => {
                  const matchesSearch =
                    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                    u.location.toLowerCase().includes(userSearch.toLowerCase()) ||
                    u.phone.includes(userSearch);
                  const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;
                  return matchesSearch && matchesStatus;
                })
                .map((user, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/10">
                    {editingUserIndex === idx ? (
                      <>
                        <td className="py-3 px-6">
                          <input
                            className="w-full text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={userLocation}
                            onChange={(e) => setUserLocation(e.target.value)}
                          />
                        </td>

                        <td className="py-3 px-6">
                          <input
                            className="w-full text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-[#6c5ce7]"
                            value={userJoinDate}
                            onChange={(e) => setUserJoinDate(e.target.value)}
                          />
                        </td>
                        <td className="py-3 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleSaveUserClick(idx)}
                              className="p-1.5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100/60 cursor-pointer"
                              title="Save Changes"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingUserIndex(null)}
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
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] font-bold text-slate-700">{user.email}</span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] text-slate-500 font-semibold">{user.phone}</span>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className="text-[11px] text-slate-400 font-light">{user.location}</span>
                        </td>

                        <td className="py-3.5 px-6">
                          <span className="text-[11px] text-slate-400 font-light">{user.joinDate}</span>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEditUserClick(idx)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-[#6c5ce7] hover:bg-indigo-50/50 cursor-pointer"
                              title="Edit User"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteUser(idx)}
                              className="p-1.5 rounded bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 cursor-pointer"
                              title="Delete User"
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

        {/* Directory Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 bg-slate-50/10">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Showing 1-{users.length} of 1,248 Users
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
              1,248
            </button>
            <button className="px-2.5 py-1 text-[10px] rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 cursor-pointer font-bold">
              &gt;
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
