import React, { useEffect, useState } from 'react';
import { Settings as SettingsIcon, ShieldCheck, Mail, Calendar, User, Bell, Lock } from 'lucide-react';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { userData, loading } = useAuth();

  if (loading || !userData) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );
  
  const user = userData;

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-5">
           <div className="p-4 bg-emerald-500 text-white rounded-[24px] shadow-lg shadow-emerald-200">
             <SettingsIcon size={28} />
           </div>
           <div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h1>
             <p className="text-slate-500 font-medium">Manage your personal profile and system preferences.</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-100 rounded-[48px] p-10 md:p-12 shadow-premium relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-emerald-500 text-white flex items-center justify-center text-5xl font-black shadow-2xl shadow-emerald-200">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-3 bg-white border border-slate-100 rounded-2xl shadow-lg text-emerald-600">
                    <ShieldCheck size={20} />
                  </div>
                </div>

                <div className="space-y-6 text-center md:text-left flex-1">
                   <div className="space-y-1">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 font-black rounded-full text-[10px] uppercase tracking-widest leading-none mb-3">
                       System {user.role}
                     </div>
                     <h2 className="text-4xl font-black text-slate-900 tracking-tight">{user.name}</h2>
                     <p className="text-slate-500 font-medium text-lg flex items-center justify-center md:justify-start gap-2">
                       <Mail size={18} className="text-slate-300" /> {user.email}
                     </p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Account Access</p>
                        <p className="font-bold text-slate-900">Privileged</p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Member Since</p>
                        <p className="font-bold text-slate-900">April 2024</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* System Info Sidebar */}
        <div className="space-y-8">
           <div className="bg-slate-900 text-white rounded-[48px] p-10 shadow-premium space-y-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <h3 className="text-xl font-black relative z-10">System Status</h3>
             <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400 font-bold text-sm">Database</span>
                  <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Optimal</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400 font-bold text-sm">Security</span>
                  <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">Verified</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400 font-bold text-sm">Version</span>
                  <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest">v1.2.0</span>
                </div>
             </div>
             <button className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all">
               Check Updates
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
