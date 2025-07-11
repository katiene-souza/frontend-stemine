import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import LinkIcon from "@mui/icons-material/Link";
import BusinessIcon from "@mui/icons-material/Business";

import { COLORS_APP } from "../../constants/Colors";
import { OPTIONS_INFORMATION_JSON } from "../../utils/OptionsInformationJson";
import {
  VACANCY_PAGE_CONTENT,
  FORMS_PLACEHOLDERS,
} from "../../constants/Messages";

import { validate_vacancy_form } from "../../utils/vacancyValidation";

const VacancyFormModal = ({ open, onClose, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    company: "",
    description: "",
    requirements: "",
    benefits: "",
    location: "",
    type: "",
    level: "",
    applicationLink: "",
    postedDate: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (initialData && Object.keys(initialData).length > 0) {
        // Mapeia initialData (camelCase do backend) para formData (camelCase)
        setFormData({
          id: initialData.id ?? null,
          title: initialData.title ?? "",
          company: initialData.company ?? "",
          description: initialData.description ?? "",
          requirements: initialData.requirements ?? "",
          benefits: initialData.benefits ?? "",
          location: initialData.location ?? "",
          type: initialData.type ?? "",
          level: initialData.level ?? "",
          applicationLink: initialData.applicationLink ?? "",
          postedDate: initialData.postedDate
            ? initialData.postedDate.split("T")[0]
            : "",
        });
      } else {
        setFormData({
          id: null,
          title: "",
          company: "",
          description: "",
          requirements: "",
          benefits: "",
          location: "",
          type: "",
          level: "",
          applicationLink: "",
          postedDate: "",
        });
      }
      setErrors({});
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "--- VacancyFormModal: handleSubmit acionado (botão Salvar) ---"
    );
    const { errors: newErrors, isValid } = validate_vacancy_form(formData);
    setErrors(newErrors);
    console.log("VacancyFormModal: Erros de validação:", newErrors);
    console.log("VacancyFormModal: Formulário é válido (isValid):", isValid);

    if (isValid) {
      console.log(
        "VacancyFormModal: Validação OK. Chamando onSave com:",
        formData
      );
      onSave(formData);
    } else {
      console.log("VacancyFormModal: Validação FALHOU. Não chamando onSave.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: "12px",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, textAlign: "center", position: "relative", pb: 0 }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", color: COLORS_APP.text.primary }}
        >
          {initialData
            ? "Editar Vaga"
            : VACANCY_PAGE_CONTENT.admin_add_vacancy_button}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: COLORS_APP.text.secondary,
            "&:hover": {
              backgroundColor: COLORS_APP.background.light,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 4, pt: 2 }}>
        <form onSubmit={handleSubmit}>
          {/* Título da Vaga */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {VACANCY_PAGE_CONTENT.admin_vacancy_form.title}
          </Typography>
          <TextField
            name="title"
            label="Título"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.title}
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 3 }}
          />

          {/* Empresa */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {VACANCY_PAGE_CONTENT.admin_vacancy_form.company}
          </Typography>
          <TextField
            name="company"
            label="Empresa"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.company}
            variant="outlined"
            fullWidth
            value={formData.company}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon
                    sx={{ color: COLORS_APP.text.secondary, mr: "8px" }}
                  />
                </InputAdornment>
              ),
            }}
            error={!!errors.company}
            helperText={errors.company}
            sx={{ mb: 3 }}
          />

          {/* Descrição da Vaga */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {VACANCY_PAGE_CONTENT.admin_vacancy_form.description}
          </Typography>
          <TextField
            name="description"
            label="Descrição"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.description}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            sx={{ mb: 3 }}
          />

          {/* Requisitos */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {VACANCY_PAGE_CONTENT.admin_vacancy_form.requirements}
          </Typography>
          <TextField
            name="requirements"
            label="Requisitos"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.requirements}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={formData.requirements}
            onChange={handleChange}
            error={!!errors.requirements}
            helperText={errors.requirements}
            sx={{ mb: 3 }}
          />

          {/* Benefícios */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {VACANCY_PAGE_CONTENT.admin_vacancy_form.benefits}
          </Typography>
          <TextField
            name="benefits"
            label="Benefícios"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.benefits}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={formData.benefits}
            onChange={handleChange}
            error={!!errors.benefits}
            helperText={errors.benefits}
            sx={{ mb: 3 }}
          />

          {/* Localização, Tipo, Nível (em linha) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
              mb: 3,
            }}
          >
            {/* Localização */}
            <FormControl fullWidth sx={{ flex: 1 }} error={!!errors.location}>
              <InputLabel id="location-label">
                {VACANCY_PAGE_CONTENT.admin_vacancy_form.location}
              </InputLabel>
              <Select
                labelId="location-label"
                name="location"
                value={formData.location}
                onChange={handleChange}
                label={VACANCY_PAGE_CONTENT.admin_vacancy_form.location}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon
                        sx={{ color: COLORS_APP.text.secondary, mr: "8px" }}
                      />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Todas as Localizações</MenuItem>{" "}
                {/* Opção padrão */}
                {OPTIONS_INFORMATION_JSON.vacancyLocation.map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.location && (
                <Typography variant="caption" color="error">
                  {errors.location}
                </Typography>
              )}
            </FormControl>

            {/* Tipo de Contrato */}
            <FormControl fullWidth sx={{ flex: 1 }} error={!!errors.type}>
              <InputLabel id="type-label">
                {VACANCY_PAGE_CONTENT.admin_vacancy_form.type}
              </InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={formData.type}
                onChange={handleChange}
                label={VACANCY_PAGE_CONTENT.admin_vacancy_form.type}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkOutlineIcon
                        sx={{ color: COLORS_APP.text.secondary, mr: "8px" }}
                      />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Todos os Tipos</MenuItem>{" "}
                {/* Opção padrão */}
                {OPTIONS_INFORMATION_JSON.vacancyType.map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.type && (
                <Typography variant="caption" color="error">
                  {errors.type}
                </Typography>
              )}
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
              mb: 3,
            }}
          >
            {/* Nível */}
            <FormControl fullWidth sx={{ flex: 1 }} error={!!errors.level}>
              <InputLabel id="level-label">
                {VACANCY_PAGE_CONTENT.admin_vacancy_form.level}
              </InputLabel>
              <Select
                labelId="level-label"
                name="level"
                value={formData.level}
                onChange={handleChange}
                label={VACANCY_PAGE_CONTENT.admin_vacancy_form.level}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BarChartIcon
                        sx={{ color: COLORS_APP.text.secondary, mr: "8px" }}
                      />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">Todos os Níveis</MenuItem>{" "}
                {/* Opção padrão */}
                {OPTIONS_INFORMATION_JSON.vacancyLevel.map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.level && (
                <Typography variant="caption" color="error">
                  {errors.level}
                </Typography>
              )}
            </FormControl>

            {/* Link para Candidatura */}
            <TextField
              name="applicationLink"
              label="Link para Candidatura"
              placeholder={FORMS_PLACEHOLDERS.vacancy_form.application_link}
              variant="outlined"
              fullWidth
              value={formData.applicationLink}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon
                      sx={{ color: COLORS_APP.text.secondary, mr: "8px" }}
                    />
                  </InputAdornment>
                ),
              }}
              error={!!errors.applicationLink}
              helperText={errors.applicationLink}
              sx={{ flex: 1 }}
            />
          </Box>

          {/* Posted Date */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            Data de Publicação
          </Typography>
          <TextField
            name="postedDate"
            type="date"
            fullWidth
            value={formData.postedDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.postedDate}
            helperText={errors.postedDate}
            sx={{ mb: 3 }}
          />

          {/* Botões de Ação */}
          <DialogActions sx={{ p: 3, justifyContent: "center" }}>
            <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              sx={{
                backgroundColor: COLORS_APP.brand_colors.stemine_purple,
                color: COLORS_APP.white,
                textTransform: "none",
                padding: "12px 30px",
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: COLORS_APP.brand_colors.stemine_purple_dark,
                },
              }}
            >
              {initialData
                ? "Salvar Alterações"
                : VACANCY_PAGE_CONTENT.admin_add_vacancy_button}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VacancyFormModal;
