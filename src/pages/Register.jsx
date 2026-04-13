import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, AlertCircle, ArrowLeft } from 'lucide-react';
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
      toast.success('Registration successful! Welcome!');
      navigate('/');
      window.location.reload(); 
    } else {
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-var(--navbar-height))] flex items-center justify-center bg-bg-main px-6 py-12">
      <div className="w-full max-w-[480px] animate-fade">
        <div className="bg-white border border-border rounded-[32px] p-10 md:p-12 shadow-premium space-y-10">
          <div className="space-y-4 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mb-4">
              <ArrowLeft size={18} /> Back to home
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight">Create Account</h1>
            <p className="text-text-muted text-lg">Join our community of food lovers today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            {error && (
              <div className="bg-red-500/5 border border-red-500/10 text-red-600 px-5 py-4 rounded-2xl flex items-center gap-3 text-sm font-medium animate-fade">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-bold text-text-main ml-1 uppercase tracking-wider text-left block">Full Name</label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-14 pl-14 pr-6 bg-bg-main border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={22} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-text-main ml-1 uppercase tracking-wider text-left block">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-14 pl-14 pr-6 bg-bg-main border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={22} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-text-main ml-1 uppercase tracking-wider text-left block">Password</label>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  className="w-full h-14 pl-14 pr-6 bg-bg-main border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={22} />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-text-main ml-1 uppercase tracking-wider text-left block">Confirm Password</label>
              <div className="relative group">
                <input
                  type="password"
                  placeholder="Re-type your password"
                  className="w-full h-14 pl-14 pr-6 bg-bg-main border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={22} />
              </div>
            </div>

            <button type="submit" className="w-full btn btn-primary btn-pill h-16 text-lg shadow-lg">
              <UserPlus size={22} /> Create Account
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-text-muted font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-extrabold hover:underline">Sign in instead</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

