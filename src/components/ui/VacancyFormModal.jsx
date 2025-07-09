// src/components/VacancyFormModal.jsx

import React, { useState } from "react";
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

import { colors } from "../../constants/Colors";
import { options } from "../../utils/OptionsInformationJson";
import { vacancy as VacancyMessages, placeorder_form as PlaceorderFormMessages } from "../../constants/Messages";
import { validateVacancyForm } from "../../utils/vacancyValidation";

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
    const { errors: newErrors, isValid } = validateVacancyForm(formData);
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
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold", color: colors.text.primary }}>
          {VacancyMessages.is_adm_text_button}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: colors.text.secondary,
            "&:hover": {
              backgroundColor: colors.background.light,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 4, pt: 2 }}>
        <form onSubmit={handleSubmit}>
          {/* Título da Vaga */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}>{VacancyMessages.is_adm_vacancy_registration.title}</Typography>
          <TextField
            name="title"
            placeholder={PlaceorderFormMessages.placeorder_form_vacancy.title}
            variant="outlined" fullWidth value={formData.title} onChange={handleChange}
            error={!!errors.title} helperText={errors.title} sx={{ mb: 3 }}
          />

          {/* Empresa */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}>{VacancyMessages.is_adm_vacancy_registration.company}</Typography>
          <TextField
            name="company"
            placeholder={PlaceorderFormMessages.placeorder_form_vacancy.company}
            variant="outlined" fullWidth value={formData.company} onChange={handleChange}
            InputProps={{ startAdornment: (<BusinessIcon sx={{ color: colors.text.secondary, mr: "8px" }} />) }}
            error={!!errors.company} helperText={errors.company} sx={{ mb: 3 }}
          />

          {/* Descrição da Vaga */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}>{VacancyMessages.is_adm_vacancy_registration.description}</Typography>
          <TextField
            name="description"
            placeholder={PlaceorderFormMessages.placeorder_form_vacancy.description}
            variant="outlined" fullWidth multiline rows={4} value={formData.description} onChange={handleChange}
            error={!!errors.description} helperText={errors.description} sx={{ mb: 3 }}
          />

          {/* Requisitos */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}>{VacancyMessages.is_adm_vacancy_registration.requirements}</Typography>
          <TextField
            name="requirements"
            placeholder={PlaceorderFormMessages.placeorder_form_vacancy.requirements}
            variant="outlined" fullWidth multiline rows={3} value={formData.requirements} onChange={handleChange}
            error={!!errors.requirements} helperText={errors.requirements} sx={{ mb: 3 }}
          />

          {/* Benefícios */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}>{VacancyMessages.is_adm_vacancy_registration.benefits}</Typography>
          <TextField
            name="benefits"
            placeholder={PlaceorderFormMessages.placeorder_form_vacancy.benefits}
            variant="outlined" fullWidth multiline rows={3} value={formData.benefits} onChange={handleChange}
            error={!!errors.benefits} helperText={errors.benefits} sx={{ mb: 3 }}
          />

          {/* Localização, Tipo, Nível (em linha) */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, mb: 3 }}>
            {/* Localização */}
            <TextField
              select name="location" label={VacancyMessages.is_adm_vacancy_registration.location} variant="outlined" fullWidth
              value={formData.location} onChange={handleChange}
              InputProps={{ startAdornment: (<LocationOnIcon sx={{ color: colors.text.secondary, mr: "8px" }} />) }}
              error={!!errors.location} helperText={errors.location} sx={{ flex: 1 }}
            >
              {options.vacancyLocation.map((option) => (
                <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>

            {/* Tipo de Contrato */}
            <TextField
              select name="type" label={VacancyMessages.is_adm_vacancy_registration.type} variant="outlined" fullWidth
              value={formData.type} onChange={handleChange}
              InputProps={{ startAdornment: (<WorkOutlineIcon sx={{ color: colors.text.secondary, mr: "8px" }} />) }}
              error={!!errors.type} helperText={errors.type} sx={{ flex: 1 }}
            >
              {options.vacancyType.map((option) => (
                <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, mb: 3 }}>
            {/* Nível */}
            <TextField
              select name="level" label={VacancyMessages.is_adm_vacancy_registration.level} variant="outlined" fullWidth
              value={formData.level} onChange={handleChange}
              InputProps={{ startAdornment: (<BarChartIcon sx={{ color: colors.text.secondary, mr: "8px" }} />) }}
              error={!!errors.level} helperText={errors.level} sx={{ flex: 1 }}
            >
              {options.vacancyLevel.map((option) => (
                <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
              ))}
            </TextField>

            {/* Link para Candidatura */}
            <TextField
              name="applicationLink" label={VacancyMessages.is_adm_vacancy_registration.application_link} variant="outlined" fullWidth
              placeholder={PlaceorderFormMessages.placeorder_form_vacancy.application_link}
              value={formData.applicationLink} onChange={handleChange}
              InputProps={{ startAdornment: (<LinkIcon sx={{ color: colors.text.secondary, mr: "8px" }} />) }}
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
            backgroundColor: colors.brand_colors.stemine_purple,
            color: colors.white,
            textTransform: "none",
            padding: "12px 30px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "50px",
            "&:hover": {
              backgroundColor: colors.brand_colors.stemine_purple_dark,
            },
          }}
        >
          {VacancyMessages.is_adm_text_button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VacancyFormModal;