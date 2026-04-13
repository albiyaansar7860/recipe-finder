import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, ArrowLeft, Bisect } from 'lucide-react';
import { authService } from '../services/api';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const { success, message } = authService.login(email, password);
    if (success) {
      toast.success('Welcome back!');
      navigate('/');
      window.location.reload(); 
    } else {
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-[480px] animate-fade">
        <div className="bg-white border border-slate-100 rounded-[48px] p-10 md:p-12 shadow-premium space-y-10">
          <div className="space-y-4 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all mb-4">
              <ArrowLeft size={18} /> Back to discover
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sign In</h1>
            <p className="text-slate-500 font-medium text-lg">Enter your details to access your kitchen.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="bg-red-50 text-red-600 px-5 py-4 rounded-2xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-fade">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <a href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 underline decoration-2 underline-offset-4">Forgot?</a>
              </div>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-14 pl-14 pr-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary h-14 text-lg shadow-emerald-200">
              <LogIn size={22} className="mr-2" /> Continue to Recipes
            </button>
          </form>

          <div className="text-center pt-8 border-t border-slate-50">
            <p className="text-slate-500 font-medium">
              New here?{' '}
              <Link to="/register" className="text-emerald-600 font-black hover:text-emerald-700 underline decoration-2 underline-offset-4">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


