import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, initialized } = useAppSelector(s => s.auth);
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="page">
        <div className="card loading-card" role="status" aria-live="polite">
          <span className="spinner" aria-hidden="true" />
          <div className="loading-text">
            <div className="loading-title">Loading your workspace</div>
            <div className="loading-subtitle">Checking your session…</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
