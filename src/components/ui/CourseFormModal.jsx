import { useState, useEffect } from "react";
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
  Chip,
  FormControl, 
  InputLabel, 
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import BusinessIcon from "@mui/icons-material/Business";
import LinkIcon from "@mui/icons-material/Link";

import { COLORS_APP } from "../../constants/Colors";
import { OPTIONS_INFORMATION_JSON } from "../../utils/OptionsInformationJson";
import {
  COURSE_PAGE_CONTENT,
  FORMS_PLACEHOLDERS,
} from "../../constants/Messages";
import { validate_course_form } from "../../utils/CourseValidation";

const CourseFormModal = ({ open, onClose, onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    durationValue: "",
    durationUnit: "",
    level: "",
    categories: [],
    imageUrl: "",
    companyLogoUrl: "",
    courseUrl: "",
  });

  console.log(formData);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (initialData && Object.keys(initialData).length > 0) {
        setFormData({
          id: initialData.id ?? null,
          title: initialData.title ?? "",
          description: initialData.description ?? "",
          durationValue: initialData.durationValue ?? "",
          durationUnit: initialData.durationUnit
            ? initialData.durationUnit.charAt(0).toUpperCase() +
              initialData.durationUnit.slice(1).toLowerCase()
            : "",
          level: initialData.level ?? "",
          categories: initialData.categories ?? [],
          imageUrl: initialData.imageUrl ?? "",
          companyLogoUrl: initialData.companyLogoUrl ?? "",
          courseUrl: initialData.courseUrl ?? "",
        });
      } else {
        setFormData({
          id: null,
          title: "",
          description: "",
          durationValue: "",
          durationUnit: "",
          level: "",
          categories: [],
          imageUrl: "",
          companyLogoUrl: "",
          courseUrl: "",
        });
      }
      setErrors({});
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "description" &&
      typeof value === "string" &&
      value.length > 97
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.substring(0, 97),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleCategoriesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prevData) => ({
      ...prevData,
      categories: typeof value === "string" ? value.split(",") : value,
    }));
    if (errors.categories) {
      setErrors((prevErrors) => ({ ...prevErrors, categories: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "--- CourseFormModal: handleSubmit acionado (botão Salvar) ---"
    );
    const { errors: newErrors, isValid } = validate_course_form(formData);
    setErrors(newErrors);
    console.log("CourseFormModal: Erros de validação (newErrors):", newErrors);
    console.log("CourseFormModal: Formulário é válido (isValid):", isValid);

    if (isValid) {
      const dataToSend = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        durationValue: formData.durationValue,
        durationUnit: formData.durationUnit,
        level: formData.level,
        categories: formData.categories,
        imageUrl: formData.imageUrl,
        companyLogoUrl: formData.companyLogoUrl,
        courseUrl: formData.courseUrl,
      };

      console.log(
        "CourseFormModal: Validação SUCESSO. Chamando onSave com:",
        dataToSend
      );
      onSave(dataToSend);
    } else {
      console.log("CourseFormModal: Validação FALHOU. Não chamando onSave.");
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
            ? COURSE_PAGE_CONTENT.admin_edit_course_button
            : COURSE_PAGE_CONTENT.admin_add_course_button}{" "}
          {/* Título dinâmico */}
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
         
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
              mb: 3,
            }}
          >
            <FormControl fullWidth sx={{ flex: 1 }} error={!!errors.categories}>
              <InputLabel id="categories-label">
                {COURSE_PAGE_CONTENT.admin_course_form.categories}
              </InputLabel>
              <Select
                labelId="categories-label"
                name="categories"
                multiple
                value={formData.categories}
                onChange={handleCategoriesChange}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        sx={{
                          backgroundColor:
                            COLORS_APP.brand_colors.stemine_purple_light,
                          color: COLORS_APP.brand_colors.stemine_purple,
                        }}
                      />
                    ))}
                  </Box>
                )}
                label={COURSE_PAGE_CONTENT.admin_course_form.categories}
              >
                {OPTIONS_INFORMATION_JSON.categories
                  .filter((option) => option.id !== "all_categories")
                  .map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
              </Select>
              {errors.categories && (
                <Typography variant="caption" color="error">
                  {errors.categories}
                </Typography>
              )}
            </FormControl>
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
         
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {COURSE_PAGE_CONTENT.admin_course_form.partner_logo_url}
          </Typography>
          <TextField
            name="companyLogoUrl"
            label="URL Logo da Empresa"
            placeholder={FORMS_PLACEHOLDERS.course_form.company_logo_url}
            variant="outlined"
            fullWidth
            value={formData.companyLogoUrl}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <BusinessIcon
                  sx={{ color: COLORS_APP.text.secondary, marginRight: "8px" }}
                />
              ),
            }}
            error={!!errors.companyLogoUrl}
            helperText={errors.companyLogoUrl}
            sx={{ mb: 3 }}
          />
          
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            {COURSE_PAGE_CONTENT.admin_course_form.course_url}
          </Typography>
          <TextField
            name="courseUrl"
            label="URL do Curso"
            placeholder={
              FORMS_PLACEHOLDERS.course_form.course_url ||
              "URL para a página de inscrição do curso"
            }
            variant="outlined"
            fullWidth
            value={formData.courseUrl}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <LinkIcon
                  sx={{ color: COLORS_APP.text.secondary, marginRight: "8px" }}
                />
              ),
            }}
            error={!!errors.courseUrl}
            helperText={errors.courseUrl}
            sx={{ mb: 3 }}
          />
        </form>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: "center" }}>
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
            : COURSE_PAGE_CONTENT.admin_add_course_button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseFormModal;
