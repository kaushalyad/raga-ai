import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../services/firebase';

export type AuthStatus = 'idle' | 'loading';

export type AuthState = {
  user: User | null;
  status: AuthStatus;
  error: string | null;
  initialized: boolean;
};

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  initialized: false,
};

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async (payload: { email: string; password: string }) => {
    const cred = await signInWithEmailAndPassword(auth, payload.email, payload.password);
    return cred.user;
  }
);

export const signUpWithEmail = createAsyncThunk(
  'auth/signUpWithEmail',
  async (payload: { email: string; password: string }) => {
    const cred = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
    return cred.user;
  }
);

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async () => {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setInitialized(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginWithEmail.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message ?? 'Login failed';
      })
      .addCase(loginWithGoogle.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message ?? 'Google sign-in failed';
      })
      .addCase(signUpWithEmail.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message ?? 'Sign up failed';
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      });
  },
});

export const { setUser, setInitialized, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
