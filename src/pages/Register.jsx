import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, AlertCircle, ArrowLeft, Sparkles, Wrench, ShieldCheck } from 'lucide-react';
import { authService } from '../services/api';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { success, message } = authService.register(
      formData.name, 
      formData.email, 
      formData.password,
      formData.role
    );
    if (success) {
      toast.success('Registration successful! Welcome!');
      navigate('/');
      window.location.reload(); 
    } else {
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-[500px] animate-fade">
        <div className="bg-white border border-slate-100 rounded-[48px] p-10 md:p-12 shadow-premium space-y-10">
          <div className="space-y-4 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all mb-4">
              <ArrowLeft size={18} /> Back to discover
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2 mx-auto">
              <Sparkles size={14} /> Join the Community
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-slate-500 font-medium text-lg">Join thousands of food lovers today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-5 py-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-fade">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider block text-left">Full Name</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider block text-left">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-slate-700 ml-1 uppercase tracking-[0.2em] block text-left">Account Type</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User Role Card */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'user' })}
                  className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 group ${
                    formData.role === 'user'
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100 scale-[1.02]'
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    formData.role === 'user' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 group-hover:text-slate-600'
                  }`}>
                    <User size={24} />
                  </div>
                  <h3 className={`font-black uppercase tracking-widest text-sm mb-1 ${
                    formData.role === 'user' ? 'text-emerald-900' : 'text-slate-900'
                  }`}>User</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Browse and save <br/>recipes</p>
                </button>

                {/* Admin Role Card */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 group ${
                    formData.role === 'admin'
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100 scale-[1.02]'
                      : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    formData.role === 'admin' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 group-hover:text-slate-600'
                  }`}>
                    <Wrench size={24} />
                  </div>
                  <h3 className={`font-black uppercase tracking-widest text-sm mb-1 ${
                    formData.role === 'admin' ? 'text-emerald-900' : 'text-slate-900'
                  }`}>Admin</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Manage and create <br/>recipes</p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider block text-left">Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider block text-left">Confirm</label>
                <div className="relative group">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary h-14 text-lg shadow-emerald-200 mt-4">
              <UserPlus size={22} className="mr-2" /> Create Account
            </button>
          </form>

          <div className="text-center pt-8 border-t border-slate-50">
            <p className="text-slate-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 font-black hover:text-emerald-700 underline decoration-2 underline-offset-4">Sign in instead</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


