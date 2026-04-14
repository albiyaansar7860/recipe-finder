import React, { useEffect, useState } from 'react';
import { Users, Mail, ShieldCheck, User as UserIcon } from 'lucide-react';
import { authService } from '../services/api';

const UserRoles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await authService.getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-5">
           <div className="p-4 bg-emerald-500 text-white rounded-[24px] shadow-lg shadow-emerald-200">
             <Users size={28} />
           </div>
           <div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Roles</h1>
             <p className="text-slate-500 font-medium">Manage and view system access levels.</p>
           </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-premium">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Member Profile</th>
                <th className="px-8 py-6">Email Address</th>
                <th className="px-8 py-6">Account Status</th>
                <th className="px-8 py-6 text-right">System Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="block font-black text-slate-900 tracking-tight leading-none mb-1">{user.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Member</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 font-bold text-slate-600">
                      <Mail size={16} className="text-slate-300" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <span className="text-sm font-bold text-slate-400">Active Session</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.role === 'admin' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {user.role === 'admin' ? <ShieldCheck size={12} /> : <UserIcon size={12} />}
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
