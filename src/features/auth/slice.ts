// src/features/auth/slice.ts
// Auth state management (simple state, not Redux)

import { useState, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuthState() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading, error: null }));
  }, []);

  const setUser = useCallback((user: User | null) => {
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    });
  }, []);

  const setError = useCallback((error: string) => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  }, []);

  const logout = useCallback(() => {
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    setLoading,
    setUser,
    setError,
    logout,
  };
}

export type { User, AuthState };
