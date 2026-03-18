import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { setInitialized, setUser } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      dispatch(setUser(user));
      dispatch(setInitialized(true));
    });

    return () => unsub();
  }, [dispatch]);

  return <>{children}</>;
}
