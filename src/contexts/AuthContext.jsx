import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/auth.js'; // Este é o serviço que conecta ao backend
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user'); 
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); 
    } else {
      localStorage.removeItem('user'); 
    }
  }, [user]); 


  const isAuthenticated = !!user; 

  const login = async (email, password) => {
    try {
      // Chama o serviço AuthService que se comunica com o backend
      const response = await AuthService.login(email, password);
      console.log("Login bem-sucedido. Resposta do backend:", response);

      // ATENÇÃO: AuthService.login deve retornar o objeto do usuário com token e roles diretamente.
      // Se ele retorna { data: userObject }, então setUser(response.data)
      // Se ele retorna userObject direto, então setUser(response)
      // No nosso AuthService.js anterior, ele já retorna response.data diretamente do Axios.
      setUser(response); // Define o usuário no estado do contexto
      // localStorage.setItem('user', JSON.stringify(response)); // Este já é feito pelo AuthService

      console.log("Estado 'user' atualizado no AuthContext:", response);
      console.log("isAuthenticated após login:", !!response);

      // Redirecionamento baseado nas roles REAIS vindas do backend
      if (response && response.roles && response.roles.includes('ROLE_ADMIN')) {
        navigate('/admin-dashboard'); // Redireciona para o dashboard de admin
      } else {
        navigate('/'); // Redireciona para a home para usuários normais
      }
      return response; // Retorna o objeto do usuário
    } catch (error) {
      console.error("Erro no login:", error);
      setUser(null); // Limpa o estado em caso de erro
      localStorage.removeItem('user'); // Limpa o localStorage
      throw error; // Propaga o erro para o formulário de login
    }
  };

   const register = async (userData) => { 
    try {
      const response = await AuthService.register(userData);
      console.log("Cadastro bem-sucedido. Resposta do backend:", response);
      navigate('/login');
      return response;
    } catch (error) {
      console.error('Erro no cadastro:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  const logout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/');
  };

  const isAdmin = () => user && user.roles && user.roles.includes('ROLE_ADMIN');

  const contextValue = {
    user,
    isAuthenticated,
    login,
    logout,
    isAdmin,
    register,
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