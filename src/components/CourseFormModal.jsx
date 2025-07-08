// src/components/CourseFormModal.jsx

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image"; 
import BusinessIcon from '@mui/icons-material/Business';


import { colors } from "../constants/Colors";
import { options } from "../utils/OptionsInformationJson";
import { register_course, placeorder_form } from "../constants/Messages";
import { validateCourseForm } from "../utils/CourseValidation";

const CourseFormModal = ({ open, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    durationValue: initialData?.durationValue ?? "",
    durationUnit: initialData?.durationUnit ?? "",
    level: initialData?.level ?? "",
    category: initialData?.category ?? [],
    imageUrl: initialData?.imageUrl ?? "",
    companyLogoUrl: initialData?.companyLogoUrl ?? "", 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: typeof value === "string" ? value.split(",") : value,
      }));
    } else {
      if (name === "description" && value.length > 97) {
        setFormData((prevData) => ({ ...prevData, [name]: value.substring(0, 97) }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    }

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: newErrors, isValid } = validateCourseForm(formData);
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
      <DialogTitle
        sx={{ m: 0, p: 2, textAlign: "center", position: "relative", pb: 0 }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", color: colors.text.primary }}
        >
          {register_course.is_adm_text_button}
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
          {/* Título do curso */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}
          >
            {register_course.is_adm_course_registration.title}
          </Typography>
          <TextField
            name="title"
            placeholder={placeorder_form.course.title}
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 3 }}
          />

          {/* Descrição */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}
          >
            {register_course.is_adm_course_registration.description}
          </Typography>
          <TextField
            name="description"
            placeholder={placeorder_form.course.description}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                maxLength: 97
              }
            }}
            error={!!errors.description}
            helperText={
              (errors.description ? errors.description : '') +
              ` (${formData.description.length}/${97} caracteres)`
            }
            sx={{ mb: 3 }}
          />

          {/* Duração e nível */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
              mb: 3,
            }}
          >
            <Box sx={{ flex: 1, display: "flex", gap: { xs: 2, sm: 3 } }}>
              <TextField
                name="durationValue"
                label={register_course.is_adm_course_registration.duration}
                placeholder={placeorder_form.course.duration}
                variant="outlined"
                type="number"
                value={formData.durationValue}
                onChange={handleChange}
                error={!!errors.durationValue}
                helperText={errors.durationValue}
                sx={{ flex: 1 }}
              />
              <TextField
                select
                name="durationUnit"
                label={register_course.is_adm_course_registration.unity} 
                placeholder={placeorder_form.course.duration}
                variant="outlined"
                value={formData.durationUnit}
                onChange={handleChange}
                error={!!errors.durationUnit}
                helperText={errors.durationUnit}
                sx={{ flex: 1 }}
              >
                {options.courseTime
                  .filter((option) => option.id !== "all_units")
                  .map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>

            <TextField
              select
              name="level"
              label={register_course.is_adm_course_registration.level}
              variant="outlined"
              value={formData.level}
              onChange={handleChange}
              error={!!errors.level}
              helperText={errors.level}
              sx={{ flex: 1 }}
            >
              {options.level
                .filter((option) => option.id !== "all_levels")
                .map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </Box>

          {/* Categoria */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
              mb: 3,
            }}
          >
            <TextField
              select
              name="category"
              label={register_course.is_adm_course_registration.category}
              placeholder={placeorder_form.course.Category}
              variant="outlined"
              value={formData.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
              fullWidth
              SelectProps={{
                multiple: true,
                renderValue: (selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Typography
                        key={value}
                        variant="body2"
                        sx={{
                          backgroundColor:
                            colors.brand_colors.stemine_purple_light,
                          color: colors.brand_colors.stemine_purple,
                          borderRadius: "4px",
                          padding: "2px 8px",
                        }}
                      >
                        {value}
                      </Typography>
                    ))}
                  </Box>
                ),
              }}
              sx={{ flex: 1 }}
            >
              {options.category
                .filter((option) => option.id !== "all_categories")
                .map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </Box>

          {/* Imagem do curso */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}
          >
            {register_course.is_adm_course_registration.image}
          </Typography>
          <TextField
            name="imageUrl"
            placeholder={placeorder_form.course.image}
            variant="outlined"
            fullWidth
            value={formData.imageUrl}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <ImageIcon
                  sx={{ color: colors.text.secondary, marginRight: "8px" }}
                />
              ),
            }}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
            sx={{ mb: 3 }}
          />

          {/* Logo da empresa */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: colors.text.primary }}
          >
            URL do Logo da Empresa
          </Typography>
          <TextField
            name="companyLogoUrl"
            placeholder={placeorder_form.course.company_logo_url}
            variant="outlined"
            fullWidth
            value={formData.companyLogoUrl}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <BusinessIcon
                  sx={{ color: colors.text.secondary, marginRight: "8px" }}
                />
              ),
            }}
            error={!!errors.companyLogoUrl}
            helperText={errors.companyLogoUrl}
            sx={{ mb: 3 }}
          />

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
          {register_course.is_adm_text_button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseFormModal;