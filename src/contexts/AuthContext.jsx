import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  // Função de Login (mockada)
  const login = async (email, password, isAdmin = false) => {
    // Simulação de chamada de API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!isAdmin) { // Lógica para usuário normal
          if (email === "user@test.com" && password === "password") {
            const userData = { email, name: "Usuária STEMINE", role: "user" };
            setUser(userData);
            resolve({ success: true, user: userData });
          } else {
            reject({ success: false, message: "E-mail ou senha inválidos para usuário." });
          }
        } else { // Lógica para administrador
          if (email === "admin@test.com" && password === "adminpass") {
            const adminData = { email, name: "Admin STEMINE", role: "admin" };
            setUser(adminData);
            resolve({ success: true, user: adminData });
          } else {
            reject({ success: false, message: "E-mail ou senha inválidos para administrador." });
          }
        }
      }, 1500); // Simula atraso da rede
    });
  };

  const logout = () => {
    setUser(null);
    navigate('/'); 
  };

  const isAuthenticated = !!user;

  const contextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};