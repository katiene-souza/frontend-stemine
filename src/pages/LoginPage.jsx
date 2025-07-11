import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { Box, Snackbar, Alert } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { COLORS_APP } from "../constants/Colors";
import { VALIDATION_ERROR_MESSAGES } from "../constants/Messages";

import LoginForm from "../components/ui/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleLoginSubmit = async (loginData, isAdmin = false) => {
    try {
      const result = await login(loginData.email, loginData.password, isAdmin);
      if (result.success) {
        showSnackbar(`Bem-vinda(o), ${result.user.name}!`, "success");
        if (result.user.role === "admin") {
          navigate("/cursos");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.error_login,
        "error"
      );
      throw error;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        backgroundColor: COLORS_APP.background.light,
        padding: { xs: 2, md: 4 },
      }}
    >
      <LoginForm
        onLoginSubmit={(data) => handleLoginSubmit(data, false)}
        onAdminLoginSubmit={(data) => handleLoginSubmit(data, true)}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
