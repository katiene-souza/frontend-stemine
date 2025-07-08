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
import { colors } from "../../constants/Colors";
import { registration_forms, error_messages } from "../../constants/Messages";

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
      newErrors.email = error_messages.auth.email_required;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = error_messages.auth.email_invalid;
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = error_messages.auth.password_required;
      isValid = false;
    } else if (formData.password.trim().length < 6) {
      newErrors.password = error_messages.auth.password_min_length;
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
          api: error_messages.auth.invalid_credentials,
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
        backgroundColor: colors.white,
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
        sx={{ fontWeight: "bold", color: colors.text.primary }}
      >
        {registration_forms.login.sing_in}
      </Typography>

      <TextField
        name="email"
        label={registration_forms.login.email}
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
        label={registration_forms.login.password}
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
          backgroundColor: colors.brand_colors.stemine_purple,
          color: colors.white,
          textTransform: "none",
          padding: "10px 20px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: colors.brand_colors.stemine_purple_dark,
          },
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          registration_forms.login.to_enter
        )}
      </Button>

      {/* Opção de Logar como Administrador */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ color: colors.text.secondary }}>
          {registration_forms.login.is_adm.title}
        </Typography>
        <Button
          variant="outlined"
          onClick={(e) => handleLogin(e, true)}
          disabled={loading}
          sx={{
            borderColor: colors.brand_colors.stemine_purple,
            color: colors.brand_colors.stemine_purple,
            textTransform: "none",
            padding: "8px 16px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: colors.brand_colors.stemine_purple_light,
            },
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            registration_forms.login.is_adm.acess_adm
          )}
        </Button>
      </Box>

      {/* Opção de Cadastrar-se */}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {registration_forms.login.call_to_action}{" "}
        <MuiLink
          component={RouterLink}
          to="/register"
          sx={{
            color: colors.brand_colors.stemine_pink,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {registration_forms.login.link_call_to_action}
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default LoginForm;
