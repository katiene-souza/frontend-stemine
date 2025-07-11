import { useState } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";

import { Link } from "react-router-dom";

import { COLORS_APP } from "../../constants/Colors";
import { REGISTRATION_FORMS_CONTENT } from "../../constants/Messages";
import { OPTIONS_INFORMATION_JSON } from "../../utils/OptionsInformationJson";

import { validate_registration_form } from "../../utils/registrationValidation";
import { useAuth } from "../../contexts/AuthContext";

const RegistrationForm = ({ initialData = {} }) => {
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
  const [apiMessage, setApiMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

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
    const fullValidation = validate_registration_form(formData);
    setErrors(fullValidation.errors);

    let isValidStep = true;

    switch (step) {
      case 0: 
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
      case 1: 
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
      case 2: 
        if (fullValidation.errors.current_challenges) {
          isValidStep = false;
        }
        break;
      case 3: 
        break;
      case 4: 
        if (
          fullValidation.errors.has_disability ||
          (formData.has_disability &&
            (fullValidation.errors.disability_type ||
              fullValidation.errors.adaptation_needed))
        ) {
          isValidStep = false;
        }
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
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const { errors: newErrors, isValid } = validate_registration_form(formData);
    setErrors(newErrors);
    setApiMessage({ text: "", type: "" });

    if (!isValid) {
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
      }
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dateOfBirth: formData.date_of_birth,
        adaptationNeeded: formData.adaptation_needed,
        areaOfInterest: formData.area_of_interest,
        biography: formData.biography,
        hasDisability: formData.has_disability,
        disabilityType: formData.disability_type,
        experienceLevel: formData.experience_level,
        githubUrl: formData.github,
        lattesUrl: formData.lattes,
        linkedinUrl: formData.linkedin,
        portfolioUrl: formData.portfolio,
        purposeOfMentoring: formData.purpose_of_mentoring,
        currentChallenges: formData.current_challenges,
        timeAvailability: formData.time_availability,
        profilePhotoUrl: null,
        curriculumFileUrl: null,
      };

      await register(dataToSend);
      setApiMessage({
        text: "Cadastro realizado com sucesso! Você será redirecionado para o login.",
        type: "success",
      });
    } catch (err) {
      console.error(
        "Erro no cadastro:",
        err.response ? err.response.data : err.message
      );
      const errorMessage =
        err.response?.data?.message ||
        REGISTRATION_FORMS_CONTENT.register.api_error;
      setApiMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0: 
        return (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: COLORS_APP.text.primary,
                borderBottom: `2px solid ${COLORS_APP.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[0]}
            </Typography>
            <TextField
              name="name"
              label={REGISTRATION_FORMS_CONTENT.register.full_name_label}
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.full_name_placeholder
              }
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
              label={REGISTRATION_FORMS_CONTENT.register.email_label}
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.email_placeholder
              }
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
              label={REGISTRATION_FORMS_CONTENT.register.password_label}
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.password_placeholder
              }
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
              label={REGISTRATION_FORMS_CONTENT.register.confirm_password_label}
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.confirm_password_placeholder
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
              label={REGISTRATION_FORMS_CONTENT.register.date_of_birth_label}
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
              name="profile_photo"
              label={REGISTRATION_FORMS_CONTENT.register.profile_photo_label}
              type="file"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              error={!!errors.profile_photo}
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
                color: COLORS_APP.text.primary,
                borderBottom: `2px solid ${COLORS_APP.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[1]}
            </Typography>

           
            <TextField
              select
              name="area_of_interest"
              label={REGISTRATION_FORMS_CONTENT.register.area_of_interest_label}
              variant="outlined"
              fullWidth
              value={formData.area_of_interest}
              onChange={handleChange}
              error={!!errors.area_of_interest}
              helperText={errors.area_of_interest}
              sx={{ mb: 3 }}
            >
              <MenuItem value="">
                {REGISTRATION_FORMS_CONTENT.register.option_area_interest_label}
              </MenuItem>{" "}
              {OPTIONS_INFORMATION_JSON.areaOfInterest.map((group) => [
                <MenuItem
                  key={group.group}
                  value=""
                  disabled
                  sx={{
                    fontWeight: "bold",
                    opacity: 1,
                    color: COLORS_APP.text.primary,
                  }}
                >
                  {group.group}
                </MenuItem>,
                group.OPTIONS_INFORMATION_JSON.map((option) => (
                  <MenuItem key={option.id} value={option.label} sx={{ pl: 4 }}>
                    {option.label}
                  </MenuItem>
                )),
              ])}
            </TextField>

           
            <TextField
              select
              name="experience_level"
              label={REGISTRATION_FORMS_CONTENT.register.experience_level_label}
              variant="outlined"
              fullWidth
              value={formData.experience_level}
              onChange={handleChange}
              error={!!errors.experience_level}
              helperText={errors.experience_level}
              sx={{ mb: 3 }}
            >
              <MenuItem value="">
                {
                  REGISTRATION_FORMS_CONTENT.register
                    .option_experience_level_label
                }
              </MenuItem>
              {OPTIONS_INFORMATION_JSON.experienceLevel.map((option) => (
                <MenuItem key={option.id} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Ojbetivo com a mentoria */}
            <TextField
              name="purpose_of_mentoring"
              label={
                REGISTRATION_FORMS_CONTENT.register.mentoring_objectives_label
              }
              placeholder={
                REGISTRATION_FORMS_CONTENT.register
                  .mentoring_objectives_placeholder
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

            {/* Campo Disponibilidade de Horário */}
            <TextField
              select
              name="time_availability"
              label={
                REGISTRATION_FORMS_CONTENT.register.time_availability_label
              }
              variant="outlined"
              fullWidth
              value={formData.time_availability}
              onChange={handleChange}
              error={!!errors.time_availability}
              helperText={errors.time_availability}
              sx={{ mb: 3 }}
              SelectProps={{
                multiple: true,
                renderValue: (selected) => (
                  <Box sx={{ display: "flex", flexWrap: 0.5 }}>
                    {selected.map((valueId) => {
                      const day =
                        OPTIONS_INFORMATION_JSON.timeAvailability.find((dg) =>
                          dg.periods.some((p) => p.id === valueId)
                        )?.day;
                      const periodLabel =
                        OPTIONS_INFORMATION_JSON.timeAvailability
                          .flatMap((dg) => dg.periods)
                          .find((p) => p.id === valueId)?.label;
                      return (
                        <Typography
                          key={valueId}
                          variant="body2"
                          sx={{
                            backgroundColor:
                              COLORS_APP.brand_colors.stemine_purple_light,
                            color: COLORS_APP.brand_colors.stemine_purple,
                            borderRadius: "4px",
                            padding: "2px 8px",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
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
              {OPTIONS_INFORMATION_JSON.timeAvailability.map((dayGroup) => [
                <MenuItem
                  key={dayGroup.day}
                  value=""
                  disabled
                  sx={{
                    fontWeight: "bold",
                    opacity: 1,
                    color: COLORS_APP.text.primary,
                  }}
                >
                  {dayGroup.day}
                </MenuItem>,
                dayGroup.periods.map((period) => (
                  <MenuItem key={period.id} value={period.id} sx={{ pl: 4 }}>
                    {period.label}
                  </MenuItem>
                )),
              ])}
            </TextField>

            {/* Biografia */}
            <TextField
              name="biography"
              label={REGISTRATION_FORMS_CONTENT.register.biography_label}
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.biography_placeholder
              }
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
                color: COLORS_APP.text.primary,
                borderBottom: `2px solid ${COLORS_APP.brand_colors.stemine_pink}`,
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
                sx={{ color: COLORS_APP.text.primary, mb: 1 }}
              >
                {REGISTRATION_FORMS_CONTENT.register.current_challenges_label}
              </FormLabel>
              <FormGroup>
                {OPTIONS_INFORMATION_JSON.challengeOptions.map((challenge) => (
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
                color: COLORS_APP.text.primary,
                borderBottom: `2px solid ${COLORS_APP.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[3]}
            </Typography>
            <TextField
              name="linkedin"
              label={
                REGISTRATION_FORMS_CONTENT.register.optional_links
                  .linkedin_label
              }
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.optional_links
                  .linkedin_placeholder
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
              label={
                REGISTRATION_FORMS_CONTENT.register.optional_links
                  .portfolio_label
              }
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.optional_links
                  .portfolio_placeholder
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
              label={
                REGISTRATION_FORMS_CONTENT.register.optional_links.github_label
              }
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.optional_links
                  .github_placeholder
              }
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
              label={
                REGISTRATION_FORMS_CONTENT.register.optional_links.lattes_label
              }
              placeholder={
                REGISTRATION_FORMS_CONTENT.register.optional_links
                  .lattes_placeholder
              }
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
              label={REGISTRATION_FORMS_CONTENT.register.resume_upload_label}
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
                color: COLORS_APP.text.primary,
                borderBottom: `2px solid ${COLORS_APP.brand_colors.stemine_pink}`,
                pb: 1,
                mb: 3,
              }}
            >
              {steps[4]}
            </Typography>
            <FormControl component="fieldset" error={!!errors.has_disability}>
              <FormLabel
                component="legend"
                sx={{ color: COLORS_APP.text.primary, mb: 1 }}
              >
                {REGISTRATION_FORMS_CONTENT.register.disability_section.title}
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
                  label={
                    REGISTRATION_FORMS_CONTENT.register.disability_section
                      .yes_button
                  }
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label={
                    REGISTRATION_FORMS_CONTENT.register.disability_section
                      .no_button
                  }
                />
              </RadioGroup>
              <Typography variant="caption" color="error">
                {errors.has_disability}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: COLORS_APP.text.secondary,
                  mt: 1,
                  display: "block",
                }}
              >
                {
                  REGISTRATION_FORMS_CONTENT.register.disability_section
                    .explanation
                }
              </Typography>
            </FormControl>

            {formData.has_disability === true && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  name="disability_type"
                  label={
                    REGISTRATION_FORMS_CONTENT.register.disability_section
                      .type_label
                  }
                  placeholder={
                    REGISTRATION_FORMS_CONTENT.register.disability_section
                      .type_placeholder
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
                  label={
                    REGISTRATION_FORMS_CONTENT.register.disability_section
                      .adaptation_label
                  }
                  placeholder={
                    REGISTRATION_FORMS_CONTENT.register.disability_section
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
        return REGISTRATION_FORMS_CONTENT.register.step_unknown;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      
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
      {/* Mensagem da API */}
      {apiMessage.text && (
        <Alert severity={apiMessage.type} sx={{ mb: 3 }}>
          {apiMessage.text}
        </Alert>
      )}
      {/* Botões de Navegação do Stepper */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          sx={{
            color: COLORS_APP.brand_colors.stemine_purple,
            borderColor: COLORS_APP.brand_colors.stemine_purple,
            borderRadius: "50px",
          }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            backgroundColor: COLORS_APP.brand_colors.stemine_purple,
            color: COLORS_APP.white,
            textTransform: "none",
            borderRadius: "50px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: COLORS_APP.brand_colors.stemine_purple_dark,
            },
          }}
        >
          {loading ? ( // Exibir CircularProgress se estiver carregando
            <CircularProgress size={24} color="inherit" />
          ) : activeStep === steps.length - 1 ? (
            REGISTRATION_FORMS_CONTENT.register.register_button
          ) : (
            REGISTRATION_FORMS_CONTENT.register.next_step_button
          )}
        </Button>
      </Box>
      {/* Link para Login */}
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {REGISTRATION_FORMS_CONTENT.register.has_account_text}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: COLORS_APP.brand_colors.stemine_pink,
            fontWeight: "bold",
          }}
        >
          {REGISTRATION_FORMS_CONTENT.register.has_account_link}
        </Link>
      </Typography>
    </form>
  );
};

export default RegistrationForm;
