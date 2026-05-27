import React from "react";
import { 
  User, 
  Globe, 
  Clock, 
  Lock, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  CheckCircle2 
} from "lucide-react";

export const SettingsView: React.FC = () => {
  return (
    <div className="p-8 space-y-8 flex-1 max-w-[1200px] mx-auto w-full">

      {/* Header */}
      <div className="flex flex-col text-left gap-1 border-b border-slate-200 pb-6">
        <h1 className="text-[24px] font-bold text-slate-900 font-display">Settings</h1>
        <p className="text-[13px] text-slate-500 font-medium">Manage your account preferences and system configuration.</p>
      </div>

      {/* General Section */}
      <div className="space-y-4">
        <h2 className="text-[18px] font-bold text-slate-900 font-display">General</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Settings (Takes 2 columns) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] lg:col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-slate-400" />
              <h3 className="text-[14px] font-bold text-slate-800">Profile Settings</h3>
            </div>
            <p className="text-[12px] text-slate-500 font-medium mb-6">Update your personal information and public profile.</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#6c5ce7]/10 flex items-center justify-center text-[#6c5ce7] font-bold text-[20px] shadow-sm border border-[#6c5ce7]/20">
                AH
              </div>
              <div className="flex flex-col">
                <button className="text-[13px] font-bold text-[#6c5ce7] hover:underline text-left w-max">Change Avatar</button>
                <span className="text-[11px] text-slate-400 mt-0.5">JPG, GIF or PNG. Max size 2MB</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Alexander"
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Hamilton"
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="alexander@enterprise-saas.com"
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Workspace Name</label>
                <input 
                  type="text" 
                  defaultValue="Enterprise Admin Console"
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Localization (Takes 1 column) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] lg:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-slate-400" />
              <h3 className="text-[14px] font-bold text-slate-800">Localization</h3>
            </div>
            <p className="text-[12px] text-slate-500 font-medium mb-6">Set your regional preferences.</p>

            <div className="flex flex-col gap-5 mt-8">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Language</label>
                <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>French (FR)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Timezone</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors appearance-none w-full">
                    <option>(GMT-05:00) Eastern Time</option>
                    <option>(GMT-08:00) Pacific Time</option>
                    <option>(GMT+00:00) UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Security & Access Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-[18px] font-bold text-slate-900 font-display">Security & Access</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Password Update */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-4 h-4 text-slate-400" />
              <h3 className="text-[14px] font-bold text-slate-800">Password Update</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Current Password</label>
                <input 
                  type="password" 
                  defaultValue="••••••••••••"
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800 focus:outline-none focus:border-[#6c5ce7] transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[12px] font-semibold text-slate-600">Enhanced security active</span>
              </div>
              <button className="mt-2 w-full py-2 bg-white border border-slate-200 rounded-lg text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                Update Password
              </button>
            </div>
          </div>

          {/* Two-Factor Auth */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <h3 className="text-[14px] font-bold text-slate-800">Two-Factor Auth</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Status: Enabled
              </span>
            </div>
            
            <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-6">
              Recommended for all administrator accounts to prevent unauthorized access.
            </p>

            <button className="w-full py-2 bg-white border border-rose-200 rounded-lg text-[13px] font-bold text-rose-600 hover:bg-rose-50 transition-colors">
              Disable 2FA
            </button>
          </div>

          {/* Active Sessions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[14px] font-bold text-slate-800">Active Sessions</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  <Laptop className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex flex-col flex-1 gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-slate-800">MacBook Pro - London</span>
                    <span className="text-[10px] font-bold text-emerald-600">Active</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">Current session</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                  <Smartphone className="w-4 h-4 text-slate-600" />
                </div>
                <div className="flex flex-col flex-1 gap-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-slate-800">iPhone 14 - Paris</span>
                    <button className="text-[11px] font-bold text-rose-500 hover:underline">Revoke</button>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">2 hours ago</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
