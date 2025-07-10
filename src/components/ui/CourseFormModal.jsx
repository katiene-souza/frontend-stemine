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
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import BusinessIcon from "@mui/icons-material/Business";
import LinkIcon from "@mui/icons-material/Link";

import { COLORS_APP } from "../../constants/Colors";
import { OPTIONS_INFORMATION_JSON } from "../../utils/OptionsInformationJson";
import { COURSE_PAGE_CONTENT, FORMS_PLACEHOLDERS } from "../../constants/Messages";
import { validate_course_form } from "../../utils/CourseValidation";

const CourseFormModal = ({ open, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    durationValue: initialData?.durationValue ?? "",
    durationUnit: initialData?.durationUnit ?? "",
    level: initialData?.level ?? "",
    category: initialData?.category ?? [],
    imageUrl: initialData?.imageUrl ?? "",
    company_logo_url: initialData?.company_logo_url ?? "",
    course_url: initialData?.course_url ?? "",
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
        setFormData((prevData) => ({
          ...prevData,
          [name]: value.substring(0, 97),
        }));
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
    const { errors: newErrors, isValid } = validate_course_form(formData);
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
          sx={{ fontWeight: "bold", color: COLORS_APP.text.primary }}
        >
          {COURSE_PAGE_CONTENT.admin_add_course_button}
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
          {/* Título do curso */}
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {COURSE_PAGE_CONTENT.admin_course_form.title}
          </Typography>
          <TextField
            name="title"
            placeholder={FORMS_PLACEHOLDERS.course_form.title}
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
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {COURSE_PAGE_CONTENT.admin_course_form.description}
          </Typography>
          <TextField
            name="description"
            placeholder={FORMS_PLACEHOLDERS.course_form.description}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            InputProps={{
              inputProps: {
                maxLength: 97,
              },
            }}
            error={!!errors.description}
            helperText={
              (errors.description ? errors.description : "") +
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
                label={COURSE_PAGE_CONTENT.admin_course_form.duration}
                placeholder={FORMS_PLACEHOLDERS.course_form.duration}
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
                label={COURSE_PAGE_CONTENT.admin_course_form.unit}
                placeholder={FORMS_PLACEHOLDERS.course_form.duration}
                variant="outlined"
                value={formData.durationUnit}
                onChange={handleChange}
                error={!!errors.durationUnit}
                helperText={errors.durationUnit}
                sx={{ flex: 1 }}
              >
                {OPTIONS_INFORMATION_JSON.courseTime
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
              label={COURSE_PAGE_CONTENT.admin_course_form.level}
              variant="outlined"
              value={formData.level}
              onChange={handleChange}
              error={!!errors.level}
              helperText={errors.level}
              sx={{ flex: 1 }}
            >
              {OPTIONS_INFORMATION_JSON.level
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
              label={COURSE_PAGE_CONTENT.admin_course_form.category}
              placeholder={FORMS_PLACEHOLDERS.course_form.Category}
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
                            COLORS_APP.brand_colors.stemine_purple_light,
                          color: COLORS_APP.brand_colors.stemine_purple,
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
              {OPTIONS_INFORMATION_JSON.category
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
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {COURSE_PAGE_CONTENT.admin_course_form.image}
          </Typography>
          <TextField
            name="imageUrl"
            placeholder={FORMS_PLACEHOLDERS.course_form.image}
            variant="outlined"
            fullWidth
            value={formData.imageUrl}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <ImageIcon
                  sx={{ color: COLORS_APP.text.secondary, marginRight: "8px" }}
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
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
           {COURSE_PAGE_CONTENT.admin_course_form.partner_logo_url}
          </Typography>
          <TextField
            name="company_logo_url"
            placeholder={FORMS_PLACEHOLDERS.course_form.company_logo_url}
            variant="outlined"
            fullWidth
            value={formData.company_logo_url}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <BusinessIcon
                  sx={{ color: COLORS_APP.text.secondary, marginRight: "8px" }}
                />
              ),
            }}
            error={!!errors.company_logo_url}
            helperText={errors.company_logo_url}
            sx={{ mb: 3 }}
          />

          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {COURSE_PAGE_CONTENT.admin_course_form.course_url}
          </Typography>
          <TextField
            name="course_url"
            placeholder={
              FORMS_PLACEHOLDERS.course_form.course_url ||
              "URL para a página de inscrição do curso"
            }
            variant="outlined"
            fullWidth
            value={formData.course_url}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <LinkIcon
                  sx={{ color: COLORS_APP.text.secondary, marginRight: "8px" }}
                />
              ),
            }}
            error={!!errors.course_url}
            helperText={errors.course_url}
            sx={{ mb: 3 }}
          />
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
          {COURSE_PAGE_CONTENT.admin_add_course_button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseFormModal;
