import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, userData, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Verifying Access...</p>
      </div>
    );
  }

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin required but user is not admin
  if (adminOnly && (!userData || !isAdmin)) {
    // If logged in but not admin, redirect to home instead of login to avoid loop
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
