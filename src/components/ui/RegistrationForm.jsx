// src/components/RegistrationForm.jsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from "../../constants/Colors";
import { registration_forms } from "../../constants/Messages";
import { options } from "../../utils/OptionsInformationJson";
import { validateRegistrationForm } from "../../utils/registrationValidation";

const RegistrationForm = ({ onSubmit, initialData = {} }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    password: initialData.password || "",
    confirm_password: initialData.confirm_password || "",
    date_of_birth: initialData.date_of_birth || "",
    profile_photo: initialData.profile_photo || null,

    area_of_interest: initialData.area_of_interest || "",
    experience_level: initialData.experience_level || "",
    purpose_of_mentoring: initialData.purpose_of_mentoring || "",
    time_availability:
      initialData.time_availability &&
      Array.isArray(initialData.time_availability)
        ? initialData.time_availability
        : [],
    biography: initialData.biography || "",

    has_disability:
      initialData.has_disability === true ||
      initialData.has_disability === false
        ? initialData.has_disability
        : null,
    disability_type: initialData.disability_type || "",
    adaptation_needed: initialData.adaptation_needed || "",

    linkedin: initialData.linkedin || "",
    portfolio: initialData.portfolio || "",
    github: initialData.github || "",
    lattes: initialData.lattes || "",
    curriculum_file: initialData.curriculum_file || null,

    current_challenges: initialData.current_challenges || [],
  });

  const [errors, setErrors] = useState({});

  const steps = [
    "Dados de Acesso",
    "Seu Perfil",
    "Desafios Atuais",
    "Links Opcionais",
    "Acessibilidade",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "current_challenges") {
      const updatedChallenges = checked
        ? [...formData.current_challenges, value]
        : formData.current_challenges.filter(
            (challenge) => challenge !== value
          );
      setFormData((prevData) => ({ ...prevData, [name]: updatedChallenges }));
    } else if (type === "radio") {
      setFormData((prevData) => ({ ...prevData, [name]: value === "true" }));
    } else if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const fullValidation = validateRegistrationForm(formData);
    setErrors(fullValidation.errors);

    let isValidStep = true;

    switch (step) {
      case 0: // Dados de Acesso
        if (
          fullValidation.errors.name ||
          fullValidation.errors.email ||
          fullValidation.errors.password ||
          fullValidation.errors.confirm_password ||
          fullValidation.errors.date_of_birth ||
          fullValidation.errors.profile_photo
        ) {
          isValidStep = false;
        }
        break;
      case 1: // Seu Perfil
        if (
          fullValidation.errors.area_of_interest ||
          fullValidation.errors.experience_level ||
          fullValidation.errors.purpose_of_mentoring ||
          fullValidation.errors.time_availability ||
          fullValidation.errors.biography
        ) {
          isValidStep = false;
        }
        break;
      case 2: // Desafios Atuais
        if (fullValidation.errors.current_challenges) {
          isValidStep = false;
        }
        break;
      case 3: // Links Opcionais
        isValidStep = true; 
        break;
      case 4: // Acessibilidade
        if (
          fullValidation.errors.has_disability ||
          (formData.has_disability &&
            (fullValidation.errors.disability_type ||
              fullValidation.errors.adaptation_needed))
        ) {
          isValidStep = false;
        }
        break;
      case 5: // Interesse em Cursos
        isValidStep = true;
        break;
      default:
        isValidStep = true;
    }
    return isValidStep;
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      if (validateStep(activeStep)) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      handleSubmit();
      console.log("formulario completo: ", formData);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const { errors: newErrors, isValid } = validateRegistrationForm(formData);
    setErrors(newErrors);

    if (isValid) {
      onSubmit(formData);
    } else {
      console.error("Erros de validação no envio final:", newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      if (firstErrorField) {
        if (
          [
            "name",
            "email",
            "password",
            "confirm_password",
            "date_of_birth",
            "profile_photo",
          ].includes(firstErrorField)
        )
          setActiveStep(0);
        else if (
          [
            "area_of_interest",
            "experience_level",
            "purpose_of_mentoring",
            "time_availability",
            "biography",
          ].includes(firstErrorField)
        )
          setActiveStep(1);
        else if (["current_challenges"].includes(firstErrorField))
          setActiveStep(2);
        else if (
          [
            "linkedin",
            "portfolio",
            "github",
            "lattes",
            "curriculum_file",
          ].includes(firstErrorField)
        )
          setActiveStep(3);
        else if (
          ["has_disability", "disability_type", "adaptation_needed"].includes(
            firstErrorField
          )
        )
          setActiveStep(4);
        // Não há validação para o último passo por padrão
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0: // Dados de acesso
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: colors.text.primary,
                borderBottom: `2px solid ${colors.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[0]}
            </Typography>
            <TextField
              name="name"
              label={registration_forms.register.name}
              placeholder={registration_forms.register.name_placeholder}
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 3 }}
            />
            <TextField
              name="email"
              label={registration_forms.register.email}
              placeholder={registration_forms.register.email_placeholder}
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
              type="email"
            />
            <TextField
              name="password"
              label={registration_forms.register.password}
              placeholder={registration_forms.register.password_placeholder}
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 3 }}
              type="password"
            />
            <TextField
              name="confirm_password"
              label={registration_forms.register.confirm_password}
              placeholder={
                registration_forms.register.confirm_password_placeholder
              }
              variant="outlined"
              fullWidth
              value={formData.confirm_password}
              onChange={handleChange}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password}
              sx={{ mb: 3 }}
              type="password"
            />
            <TextField
              name="date_of_birth"
              label={registration_forms.register.date_of_birth}
              variant="outlined"
              fullWidth
              value={formData.date_of_birth}
              onChange={handleChange}
              error={!!errors.date_of_birth}
              helperText={errors.date_of_birth}
              sx={{ mb: 3 }}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="profile_photo" // <-- ATUALIZADO: Nome da prop para o File Object
              label={registration_forms.register.profile_photo}
              type="file" // <-- ATUALIZADO: Tipo de input para arquivo
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={!!errors.profile_photo} // <-- ATUALIZADO: Erro para profile_photo
              helperText={errors.profile_photo}
              sx={{ mb: 3 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: colors.text.primary,
                borderBottom: `2px solid ${colors.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[1]}
            </Typography>

            {/* Campo Área de Interesse */}
            <TextField
              select
              name="area_of_interest"
              label={registration_forms.register.area_of_interest}
              variant="outlined"
              fullWidth
              value={formData.area_of_interest}
              onChange={handleChange}
              error={!!errors.area_of_interest}
              helperText={errors.area_of_interest}
              sx={{ mb: 3 }}
            >
              <MenuItem value="">Selecione sua Área de Interesse</MenuItem>{" "}
              {options.areaOfInterest.map((group) => [
                <MenuItem
                  key={group.group}
                  value=""
                  disabled
                  sx={{
                    fontWeight: "bold",
                    opacity: 1,
                    color: colors.text.primary,
                  }}
                >
                  {group.group}
                </MenuItem>,
                group.options.map((option) => (
                  <MenuItem key={option.id} value={option.label} sx={{ pl: 4 }}>
                    {option.label}
                  </MenuItem>
                )),
              ])}
            </TextField>

            {/* Campo Nível de Experiência na Área */}
            <TextField
              select
              name="experience_level"
              label={registration_forms.register.experience_level}
              variant="outlined"
              fullWidth
              value={formData.experience_level}
              onChange={handleChange}
              error={!!errors.experience_level}
              helperText={errors.experience_level}
              sx={{ mb: 3 }}
            >
              <MenuItem value="">Selecione o Nível de Experiência</MenuItem>
              {options.experienceLevel.map((option) => (
                <MenuItem key={option.id} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Ojbetivo com a mentoria */}
            <TextField
              name="purpose_of_mentoring"
              label={registration_forms.register.Purpose_of_mentoring}
              placeholder={
                registration_forms.register.Purpose_of_mentoring_placeholder
              }
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.purpose_of_mentoring}
              onChange={handleChange}
              error={!!errors.purpose_of_mentoring}
              helperText={errors.purpose_of_mentoring}
              sx={{ mb: 3 }}
            />

            {/* Campo Disponibilidade de Horário - AGORA É MULTI-SELECT */}
            <TextField
              select
              name="time_availability"
              label={registration_forms.register.time_availability}
              variant="outlined"
              fullWidth
              value={formData.time_availability}
              onChange={handleChange}
              error={!!errors.time_availability}
              helperText={errors.time_availability}
              sx={{ mb: 3 }}
              SelectProps={{
                multiple: true,
                renderValue: (
                  selected 
                ) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((valueId) => {
                      const day = options.timeAvailability.find((dg) =>
                        dg.periods.some((p) => p.id === valueId)
                      )?.day;
                      const periodLabel = options.timeAvailability
                        .flatMap((dg) => dg.periods)
                        .find((p) => p.id === valueId)?.label;
                      return (
                        <Typography
                          key={valueId}
                          variant="body2"
                          sx={{
                            backgroundColor:
                              colors.brand_colors.stemine_purple_light,
                            color: colors.brand_colors.stemine_purple,
                            borderRadius: "4px",
                            padding: "2px 8px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {day
                            ? `${day.substring(0, 3)}. ${periodLabel}`
                            : periodLabel}{" "}
                        </Typography>
                      );
                    })}
                  </Box>
                ),
              }}
            >
              {options.timeAvailability.map((dayGroup) => [
                <MenuItem
                  key={dayGroup.day}
                  value=""
                  disabled
                  sx={{
                    fontWeight: "bold",
                    opacity: 1,
                    color: colors.text.primary,
                  }}
                >
                  {dayGroup.day}
                </MenuItem>,
                dayGroup.periods.map((period) => (
                  <MenuItem
                    key={period.id}
                    value={period.id}
                    sx={{ pl: 4 }}
                  >
                    {period.label}
                  </MenuItem>
                )),
              ])}
            </TextField>

              {/* Biografia */}
            <TextField
              name="biography"
              label={registration_forms.register.biografy}
              placeholder={registration_forms.register.biography_placeholder}
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.biography}
              onChange={handleChange}
              error={!!errors.biography}
              helperText={errors.biography}
              sx={{ mb: 3 }}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: colors.text.primary,
                borderBottom: `2px solid ${colors.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[2]}
            </Typography>
            <FormControl
              component="fieldset"
              error={!!errors.current_challenges}
            >
              <FormLabel
                component="legend"
                sx={{ color: colors.text.primary, mb: 1 }}
              >
                {registration_forms.register.current_challenges}
              </FormLabel>
              <FormGroup>
                {options.challengeOptions.map((challenge) => (
                  <FormControlLabel
                    key={challenge.id}
                    control={
                      <Checkbox
                        name="current_challenges"
                        value={challenge.id}
                        checked={formData.current_challenges.includes(
                          challenge.id
                        )}
                        onChange={handleChange}
                      />
                    }
                    label={challenge.label}
                  />
                ))}
              </FormGroup>
              <Typography variant="caption" color="error">
                {errors.current_challenges}
              </Typography>
            </FormControl>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: colors.text.primary,
                borderBottom: `2px solid ${colors.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[3]}
            </Typography>
            <TextField
              name="linkedin"
              label={registration_forms.register.Links.linkedin}
              placeholder={
                registration_forms.register.Links.linkedin_placeholder
              }
              variant="outlined"
              fullWidth
              value={formData.linkedin}
              onChange={handleChange}
              error={!!errors.linkedin}
              helperText={errors.linkedin}
              sx={{ mb: 3 }}
            />
            <TextField
              name="portfolio"
              label={registration_forms.register.Links.portfolio}
              placeholder={
                registration_forms.register.Links.portfolio_placeholder
              }
              variant="outlined"
              fullWidth
              value={formData.portfolio}
              onChange={handleChange}
              error={!!errors.portfolio}
              helperText={errors.portfolio}
              sx={{ mb: 3 }}
            />
            <TextField
              name="github"
              label={registration_forms.register.Links.git_hub}
              placeholder={registration_forms.register.Links.github_placeholder}
              variant="outlined"
              fullWidth
              value={formData.github}
              onChange={handleChange}
              error={!!errors.github}
              helperText={errors.github}
              sx={{ mb: 3 }}
            />
            <TextField
              name="lattes"
              label={registration_forms.register.Links.lattes}
              placeholder={registration_forms.register.Links.lattes_placeholder}
              variant="outlined"
              fullWidth
              value={formData.lattes}
              onChange={handleChange}
              error={!!errors.lattes}
              helperText={errors.lattes}
              sx={{ mb: 3 }}
            />
            <TextField
              name="curriculum_file"
              label={registration_forms.register.curriculum}
              type="file"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={!!errors.curriculum_file}
              helperText={errors.curriculum_file}
              sx={{ mb: 3 }}
            />
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: colors.text.primary,
                borderBottom: `2px solid ${colors.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[4]}
            </Typography>
            <FormControl component="fieldset" error={!!errors.has_disability}>
              <FormLabel
                component="legend"
                sx={{ color: colors.text.primary, mb: 1 }}
              >
                {registration_forms.register.disability.title}
              </FormLabel>
              <RadioGroup
                row
                name="has_disability"
                value={String(formData.has_disability)}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label={registration_forms.register.disability.text_button_yes}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label={registration_forms.register.disability.text_button_no}
                />
              </RadioGroup>
              <Typography variant="caption" color="error">
                {errors.has_disability}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: colors.text.secondary, mt: 1, display: "block" }}
              >
                {registration_forms.register.disability.explanation}
              </Typography>
            </FormControl>

            {formData.has_disability === true && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  name="disability_type"
                  label={registration_forms.register.disability.what_disability}
                  placeholder={
                    registration_forms.register.disability
                      .what_disability_placeholder
                  }
                  variant="outlined"
                  fullWidth
                  value={formData.disability_type}
                  onChange={handleChange}
                  error={!!errors.disability_type}
                  helperText={errors.disability_type}
                  sx={{ mb: 3 }}
                />
                <TextField
                  name="adaptation_needed"
                  label={registration_forms.register.disability.adaptation}
                  placeholder={
                    registration_forms.register.disability
                      .adaptation_placeholder
                  }
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.adaptation_needed}
                  onChange={handleChange}
                  error={!!errors.adaptation_needed}
                  helperText={errors.adaptation_needed}
                />
              </Box>
            )}
          </Box>
        );
      default:
        return "Passo desconhecido";
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {/* Stepper de Navegação */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Conteúdo do Passo Atual */}
      <Box
        sx={{
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mb: { xs: 4, md: 5 },
        }}
      >
        {getStepContent(activeStep)}
      </Box>

      {/* Botões de Navegação do Stepper */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          sx={{
            color: colors.brand_colors.stemine_purple,
            borderColor: colors.brand_colors.stemine_purple,
          }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            backgroundColor: colors.brand_colors.stemine_purple,
            color: colors.white,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: colors.brand_colors.stemine_purple_dark,
            },
          }}
        >
          {activeStep === steps.length - 1
            ? registration_forms.register.to_register
            : "Próximo"}
        </Button>
      </Box>

      {/* Link para Login */}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {registration_forms.register.log_in}{" "}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: colors.brand_colors.stemine_pink,
            fontWeight: "bold",
          }}
        >
          {registration_forms.register.link_log_in}
        </Link>
      </Typography>
    </form>
  );
};

export default RegistrationForm;
