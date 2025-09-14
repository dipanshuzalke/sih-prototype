import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'admin';

interface User {
  id: string;
  name: string;
  role: UserRole;
  phone?: string;
  email?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, otp: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  currentRole: UserRole | null;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for different roles
const mockUsers = {
  patient: {
    id: 'P001',
    name: 'Rajesh Kumar',
    role: 'patient' as UserRole,
    phone: '+91 9876543210',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  doctor: {
    id: 'D001',
    name: 'Dr. Amrit Kaur',
    role: 'doctor' as UserRole,
    email: 'dr.amrit@telemedicine.com',
    avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  pharmacy: {
    id: 'PH001',
    name: 'Khanna Medical Store',
    role: 'pharmacy' as UserRole,
    email: 'khanna.medical@gmail.com',
    avatar: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  admin: {
    id: 'ADM001',
    name: 'System Administrator',
    role: 'admin' as UserRole,
    email: 'admin@telemedicine.com',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('telemedicine-user');
    const savedRole = localStorage.getItem('telemedicine-role');
    
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser));
      setCurrentRole(savedRole as UserRole);
    }
  }, []);

  const login = async (_phone: string, otp: string, role: UserRole): Promise<boolean> => {
    // Simulate OTP verification (accept any 4-digit OTP)
    if (otp.length === 4) {
      const userData = mockUsers[role];
      setUser(userData);
      setCurrentRole(role);
      
      localStorage.setItem('telemedicine-user', JSON.stringify(userData));
      localStorage.setItem('telemedicine-role', role);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentRole(null);
    localStorage.removeItem('telemedicine-user');
    localStorage.removeItem('telemedicine-role');
  };

  const switchRole = (role: UserRole) => {
    const userData = mockUsers[role];
    setUser(userData);
    setCurrentRole(role);
    
    localStorage.setItem('telemedicine-user', JSON.stringify(userData));
    localStorage.setItem('telemedicine-role', role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      currentRole,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};