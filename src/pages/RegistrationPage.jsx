import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { COLORS_APP } from '../constants/Colors';
import { FEEDBACK_MESSAGES, REGISTRATION_FORMS_CONTENT } from "../constants/Messages";

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
    // Aqui você enviaria os dados para o backend
    // Simulação de API
    showSnackbar(FEEDBACK_MESSAGES.successful_user_registration, "success");
    setTimeout(() => {
      navigate('/login'); 
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 4 }, my: 4 }}>
      <Box sx={{ p: { xs: 2, md: 4 }, borderRadius: '12px', boxShadow: COLORS_APP.background.box_shadow, backgroundColor: COLORS_APP.white }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: COLORS_APP.text.primary, mb: { xs: 3, md: 5 } }}>
          {REGISTRATION_FORMS_CONTENT.register.title}
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