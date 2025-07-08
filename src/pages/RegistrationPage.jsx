// src/pages/RegistrationPage.jsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../constants/Colors';
import { registration_forms } from "../constants/Messages" // Seus textos de registr
import RegistrationForm from '../components/ui/RegistrationForm';

const RegistrationPage = () => {
  const navigate = useNavigate();
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

  const handleFormSubmit = (formData) => {
    console.log("Dados de cadastro da mentorada para envio:", formData);
    // Aqui você enviaria os dados para o backend
    // Simulação de API
    showSnackbar("Cadastro realizado com sucesso! Redirecionando...", "success");
    setTimeout(() => {
      navigate('/login'); // Redireciona para a página de login após o cadastro
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 4 }, my: 4 }}>
      <Box sx={{ p: { xs: 2, md: 4 }, borderRadius: '12px', boxShadow: '0px 4px 15px rgba(0,0,0,0.1)', backgroundColor: colors.white }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: colors.text.primary, mb: { xs: 3, md: 5 } }}>
          {registration_forms.register.title}
        </Typography>

        {/* Renderiza o RegistrationForm e passa a função de submit */}
        <RegistrationForm onSubmit={handleFormSubmit} />

      </Box>

      {/* Snackbar para feedback (gerenciado pela página) */}
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
    </Container>
  );
};

export default RegistrationPage;