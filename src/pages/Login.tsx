import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { clearAuthError, loginWithEmail, loginWithGoogle, signUpWithEmail } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status, error } = useAppSelector(s => s.auth);

  const nextPath = useMemo(() => {
    const state = location.state as { from?: { pathname?: string } } | null;
    return state?.from?.pathname ?? '/';
  }, [location.state]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const friendlyAuthError = (raw: string | null) => {
    if (!raw) return null;
    const r = raw.toLowerCase();

    if (r.includes('auth/invalid-credential')) return 'Invalid email or password.';
    if (r.includes('auth/email-already-in-use')) return 'This email is already registered. Try logging in instead.';
    if (r.includes('auth/weak-password')) return 'Password is too weak. Use at least 6 characters.';
    if (r.includes('auth/popup-closed-by-user')) return 'Google sign-in was cancelled.';
    if (r.includes('auth/popup-blocked')) return 'Popup blocked. Allow popups and try again.';
    if (r.includes('auth/operation-not-allowed')) return 'Sign-in method is disabled in Firebase Console.';

    return raw;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    dispatch(clearAuthError());

    if (!email.trim() || !password) {
      setLocalError('Email and password are required');
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setLocalError('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setLocalError('Passwords do not match');
        return;
      }

      const resultAction = await dispatch(signUpWithEmail({ email, password }));
      if (signUpWithEmail.fulfilled.match(resultAction)) {
        navigate(nextPath, { replace: true });
      }
      return;
    }

    const resultAction = await dispatch(loginWithEmail({ email, password }));
    if (loginWithEmail.fulfilled.match(resultAction)) {
      navigate(nextPath, { replace: true });
    }
  };

  const handleGoogle = async () => {
    setLocalError(null);
    dispatch(clearAuthError());
    const resultAction = await dispatch(loginWithGoogle());
    if (loginWithGoogle.fulfilled.match(resultAction)) {
      navigate(nextPath, { replace: true });
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <form onSubmit={handleLogin}>
          <div>
            <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
            <p className="muted" style={{ marginTop: 6 }}>
              {mode === 'login'
                ? 'Sign in to access dashboards, analytics, and patient details.'
                : 'Register to access dashboards, analytics, and patient details.'}
            </p>
          </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <div className="field-row">
          <input
            style={{ flex: 1 }}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            className="button button-ghost"
            type="button"
            onClick={() => setShowPassword(v => !v)}
            disabled={status === 'loading'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {mode === 'signup' && (
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        )}

        <button className="button" type="submit" disabled={status === 'loading'}>
          {status === 'loading'
            ? mode === 'login'
              ? 'Signing in...'
              : 'Creating account...'
            : mode === 'login'
              ? 'Login'
              : 'Create account'}
        </button>

          <button
            type="button"
            className="link-button"
            onClick={() => {
              setMode(m => (m === 'login' ? 'signup' : 'login'));
              setLocalError(null);
              dispatch(clearAuthError());
            }}
            disabled={status === 'loading'}
          >
            {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Login'}
          </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ height: 1, background: 'var(--border)', flex: 1 }} />
          <span style={{ fontSize: 12, color: 'var(--text)' }}>OR</span>
          <div style={{ height: 1, background: 'var(--border)', flex: 1 }} />
        </div>

        <button className="button button-google" type="button" onClick={handleGoogle} disabled={status === 'loading'}>
          <span className="button-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.651 32.656 29.195 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"/>
              <path fill="#FF3D00" d="M6.306 14.691 12.87 19.51C14.644 15.108 18.953 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.344 4.326-17.694 10.691Z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.174 0-9.617-3.322-11.283-7.946l-6.506 5.012C9.53 39.556 16.227 44 24 44Z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.07 12.07 0 0 1-4.087 5.571h.003l6.19 5.238C36.971 40.205 44 35 44 24c0-1.341-.138-2.65-.389-3.917Z"/>
            </svg>
          </span>
          Continue with Google
        </button>
          {localError && <div className="error">{localError}</div>}
          {friendlyAuthError(error) && <div className="error">{friendlyAuthError(error)}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
