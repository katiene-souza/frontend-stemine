import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { COLORS_APP } from "../../constants/Colors";
import {
  REGISTRATION_FORMS_CONTENT,
  VALIDATION_ERROR_MESSAGES,
} from "../../constants/Messages";

const LoginForm = ({ onLoginSubmit, onAdminLoginSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_ERROR_MESSAGES.authentication.email_required;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = VALIDATION_ERROR_MESSAGES.authentication.email_invalid;
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password =
        VALIDATION_ERROR_MESSAGES.authentication.password_required;
      isValid = false;
    } else if (formData.password.trim().length < 6) {
      newErrors.password =
        VALIDATION_ERROR_MESSAGES.authentication.password_min_length;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e, isAdmin = false) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        if (isAdmin) {
          await onAdminLoginSubmit(formData);
        } else {
          await onLoginSubmit(formData);
        }
      } catch (err) {
        console.error("Erro de login:", err);
        setErrors((prev) => ({
          ...prev,
          api: VALIDATION_ERROR_MESSAGES.authentication.invalid_credentials,
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: "12px",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
        backgroundColor: COLORS_APP.white,
        maxWidth: "400px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 3 },
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        align="center"
        sx={{ fontWeight: "bold", color: COLORS_APP.text.primary }}
      >
        {REGISTRATION_FORMS_CONTENT.login.title}
      </Typography>

      <TextField
        name="email"
        label={REGISTRATION_FORMS_CONTENT.login.email_label}
        variant="outlined"
        fullWidth
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        type="email"
      />
      <TextField
        name="password"
        label={REGISTRATION_FORMS_CONTENT.login.password_label}
        variant="outlined"
        fullWidth
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        type="password"
      />

      {errors.api && (
        <Typography color="error" variant="body2" align="center">
          {errors.api}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={(e) => handleLogin(e, false)}
        disabled={loading}
        sx={{
          backgroundColor: COLORS_APP.brand_colors.stemine_purple,
          color: COLORS_APP.white,
          textTransform: "none",
          padding: "10px 20px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: COLORS_APP.brand_colors.stemine_purple_dark,
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          REGISTRATION_FORMS_CONTENT.login.submit_button
        )}
      </Button>

      {/* Opção de Logar como Administrador 
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: COLORS_APP.text.secondary }}>
          {REGISTRATION_FORMS_CONTENT.login.admin_login.title}
        </Typography>
        <Button
          variant="outlined"
          onClick={(e) => handleLogin(e, true)}
          disabled={loading}
          sx={{
            borderColor: COLORS_APP.brand_colors.stemine_purple,
            color: COLORS_APP.brand_colors.stemine_purple,
            textTransform: "none",
            padding: "8px 16px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: COLORS_APP.brand_colors.stemine_purple_light,
            },
          }}
        >
        
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            REGISTRATION_FORMS_CONTENT.login.admin_login.button
          )}
        </Button>
      </Box>´
      */}

      {/* Opção de Cadastrar-se */}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {REGISTRATION_FORMS_CONTENT.login.call_to_action_text}{" "}
        <MuiLink
          component={RouterLink}
          to="/register"
          sx={{
            color: COLORS_APP.brand_colors.stemine_pink,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {REGISTRATION_FORMS_CONTENT.login.call_to_action_link}
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default LoginForm;
