import { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'; 
import BarChartIcon from '@mui/icons-material/BarChart';
import LinkIcon from '@mui/icons-material/Link'; 
import BusinessIcon from '@mui/icons-material/Business'; 

import { COLORS_APP } from "../../constants/Colors";
import { OPTIONS_INFORMATION_JSON } from "../../utils/OptionsInformationJson";
import { VACANCY_PAGE_CONTENT, FORMS_PLACEHOLDERS } from "../../constants/Messages";

import { validate_vacancy_form } from "../../utils/vacancyValidation";

const VacancyFormModal = ({ open, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    company: initialData?.company ?? "",
    description: initialData?.description ?? "",
    requirements: initialData?.requirements ?? "",
    benefits: initialData?.benefits ?? "",
    location: initialData?.location ?? "Todas as Localizações", 
    type: initialData?.type ?? "Todos os Tipos", 
    level: initialData?.level ?? "Todos os Níveis", 
    applicationLink: initialData?.applicationLink ?? "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: newErrors, isValid } = validate_vacancy_form(formData);
    setErrors(newErrors);
    if (isValid) {
      onSubmit(formData);
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
      <DialogTitle sx={{ m: 0, p: 2, textAlign: "center", position: "relative", pb: 0 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: COLORS_APP.text.primary }}>
          {VACANCY_PAGE_CONTENT.admin_add_vacancy_button}
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
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}>{VACANCY_PAGE_CONTENT.admin_vacancy_form.title}</Typography>
          <TextField
            name="title"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.title}
            variant="outlined" fullWidth value={formData.title} onChange={handleChange}
            error={!!errors.title} helperText={errors.title} sx={{ mb: 3 }}
          />

          {/* Empresa */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}>{VACANCY_PAGE_CONTENT.admin_vacancy_form.company}</Typography>
          <TextField
            name="company"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.company}
            variant="outlined" fullWidth value={formData.company} onChange={handleChange}
            InputProps={{ startAdornment: (<BusinessIcon sx={{ color: COLORS_APP.text.secondary, mr: "8px" }} />) }}
            error={!!errors.company} helperText={errors.company} sx={{ mb: 3 }}
          />

          {/* Descrição da Vaga */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}>{VACANCY_PAGE_CONTENT.admin_vacancy_form.description}</Typography>
          <TextField
            name="description"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.description}
            variant="outlined" fullWidth multiline rows={4} value={formData.description} onChange={handleChange}
            error={!!errors.description} helperText={errors.description} sx={{ mb: 3 }}
          />

          {/* Requisitos */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}>{VACANCY_PAGE_CONTENT.admin_vacancy_form.requirements}</Typography>
          <TextField
            name="requirements"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.requirements}
            variant="outlined" fullWidth multiline rows={3} value={formData.requirements} onChange={handleChange}
            error={!!errors.requirements} helperText={errors.requirements} sx={{ mb: 3 }}
          />

          {/* Benefícios */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}>{VACANCY_PAGE_CONTENT.admin_vacancy_form.benefits}</Typography>
          <TextField
            name="benefits"
            placeholder={FORMS_PLACEHOLDERS.vacancy_form.benefits}
            variant="outlined" fullWidth multiline rows={3} value={formData.benefits} onChange={handleChange}
            error={!!errors.benefits} helperText={errors.benefits} sx={{ mb: 3 }}
          />

          {/* Localização, Tipo, Nível (em linha) */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, mb: 3 }}>
            {/* Localização */}
            <TextField
              select name="location" label={VACANCY_PAGE_CONTENT.admin_vacancy_form.location} variant="outlined" fullWidth
              value={formData.location} onChange={handleChange}
              InputProps={{ startAdornment: (<LocationOnIcon sx={{ color: COLORS_APP.text.secondary, mr: "8px" }} />) }}
              error={!!errors.location} helperText={errors.location} sx={{ flex: 1 }}
            >
              {OPTIONS_INFORMATION_JSON.vacancyLocation.map((option) => (
                <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>

            {/* Tipo de Contrato */}
            <TextField
              select name="type" label={VACANCY_PAGE_CONTENT.admin_vacancy_form.type} variant="outlined" fullWidth
              value={formData.type} onChange={handleChange}
              InputProps={{ startAdornment: (<WorkOutlineIcon sx={{ color: COLORS_APP.text.secondary, mr: "8px" }} />) }}
              error={!!errors.type} helperText={errors.type} sx={{ flex: 1 }}
            >
              {OPTIONS_INFORMATION_JSON.vacancyType.map((option) => (
                <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, mb: 3 }}>
            {/* Nível */}
            <TextField
              select name="level" label={VACANCY_PAGE_CONTENT.admin_vacancy_form.level} variant="outlined" fullWidth
              value={formData.level} onChange={handleChange}
              InputProps={{ startAdornment: (<BarChartIcon sx={{ color: COLORS_APP.text.secondary, mr: "8px" }} />) }}
              error={!!errors.level} helperText={errors.level} sx={{ flex: 1 }}
            >
              {OPTIONS_INFORMATION_JSON.vacancyLevel.map((option) => (
                <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>

            {/* Link para Candidatura */}
            <TextField
              name="applicationLink" label={VACANCY_PAGE_CONTENT.admin_vacancy_form.application_link} variant="outlined" fullWidth
              placeholder={FORMS_PLACEHOLDERS.vacancy_form.application_link}
              value={formData.applicationLink} onChange={handleChange}
              InputProps={{ startAdornment: (<LinkIcon sx={{ color: COLORS_APP.text.secondary, mr: "8px" }} />) }}
              error={!!errors.applicationLink} helperText={errors.applicationLink} sx={{ flex: 1 }}
            />
          </Box>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: "center" }}>
        <Button
          variant="contained"
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
          {VACANCY_PAGE_CONTENT.admin_add_vacancy_button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VacancyFormModal;