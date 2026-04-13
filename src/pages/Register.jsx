import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react';
import { authService } from '../services/api';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    const { success, message } = authService.register(formData.name, formData.email, formData.password);
    if (success) {
      toast.success('Registration Successful! Please login.');
      navigate('/login');
    } else {
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-bg-main px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-bg-card border border-border rounded-3xl p-8 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
            <p className="text-text-muted">Join our community of food lovers</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-12 pl-12 pr-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-12 pl-12 pr-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-4 bg-bg-main border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary h-14 flex items-center justify-center gap-2 text-lg mt-4">
              <UserPlus size={20} /> Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
