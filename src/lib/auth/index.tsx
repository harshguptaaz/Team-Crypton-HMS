'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { mockDemoUsers } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (arg1: string | UserRole, arg2?: string, arg3?: string | UserRole) => Promise<boolean>;
  signup: (userData: { name: string; email: string; role: UserRole | string; phone?: string; password?: string; department?: string; [key: string]: any }) => Promise<boolean>;
  register: (userData: { name: string; email: string; role: UserRole | string; phone?: string; password?: string; department?: string; [key: string]: any }) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'medicare_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(mockDemoUsers.patient);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockDemoUsers.patient));
      }
    } catch (err) {
      console.error('Failed to load user session', err);
      setUser(mockDemoUsers.patient);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (arg1: string | UserRole, arg2?: string, arg3?: string | UserRole): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const validRoles = ['patient', 'doctor', 'nurse', 'staff', 'admin', 'superadmin', 'PATIENT', 'DOCTOR', 'NURSE', 'STAFF', 'ADMIN', 'SUPER_ADMIN'];
    let role: UserRole = 'PATIENT';
    let email: string | undefined = undefined;

    if (arg3 && typeof arg3 === 'string' && validRoles.includes(arg3)) {
      role = arg3 as UserRole;
      email = typeof arg1 === 'string' ? arg1 : undefined;
    } else if (typeof arg1 === 'string' && validRoles.includes(arg1)) {
      role = arg1 as UserRole;
      email = arg2;
    } else {
      email = typeof arg1 === 'string' ? arg1 : undefined;
    }

    let targetUser = mockDemoUsers[role.toLowerCase() as keyof typeof mockDemoUsers];
    if (!targetUser) {
      targetUser = {
        id: `usr-${Date.now()}`,
        name: email ? email.split('@')[0] : 'Demo User',
        email: email || `${role.toLowerCase()}@medicare.hospital`,
        role: role,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        createdAt: new Date().toISOString(),
      };
    }
    setUser(targetUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
    setIsLoading(false);
    return true;
  };

  const signup = async (userData: { name: string; email: string; role: UserRole | string; phone?: string; password?: string; department?: string; [key: string]: any }): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role as UserRole,
      phone: userData.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const register = signup;

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const switchRole = (role: UserRole) => {
    const key = role.toLowerCase();
    if (mockDemoUsers[key as keyof typeof mockDemoUsers]) {
      const targetUser = mockDemoUsers[key as keyof typeof mockDemoUsers];
      setUser(targetUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
    } else {
      login(role);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        register,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
