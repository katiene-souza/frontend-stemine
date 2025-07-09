import React, { useState } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/ui/LoginForm';
import { colors } from '../constants/Colors';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); // Use o hook useAuth para acessar o login
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // --- Lógica de Submissão para Login (agora usa o contexto) ---
  const handleLoginSubmit = async (loginData, isAdmin = false) => {
    try {
      const result = await login(loginData.email, loginData.password, isAdmin);
      if (result.success) {
        showSnackbar(`Bem-vinda(o), ${result.user.name}!`, 'success');
        if (result.user.role === 'admin') {
          navigate('/cursos'); // Exemplo de redirecionamento para admin
        } else {
          navigate('/'); // Redireciona para a home para usuário normal
        }
      }
    } catch (error) {
      showSnackbar(error.message || 'Erro ao fazer login.', 'error');
      throw error; // Re-lança para que o `LoginForm` possa pegar e exibir a mensagem genérica
    }
  };

  // Se já estiver autenticado, redirecionar
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Ou para a página de perfil, se preferir
    }
  }, [isAuthenticated, navigate]);


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: colors.background.light,
        padding: { xs: 2, md: 4 }
      }}
    >
      <LoginForm
        onLoginSubmit={(data) => handleLoginSubmit(data, false)} // Passa a função para login normal
        onAdminLoginSubmit={(data) => handleLoginSubmit(data, true)} // Passa a função para login admin
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;